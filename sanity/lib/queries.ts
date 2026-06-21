import { defineQuery } from "next-sanity";

// Shared image projection: keeps the raw asset ref (so urlFor works) and adds
// the LQIP blur placeholder + natural dimensions for aspect ratio.
const imageFields = /* groq */ `
  ...,
  "lqip": asset->metadata.lqip,
  "dimensions": asset->metadata.dimensions
`;

/** All published posts, newest first, for the blog index + cards. */
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featured,
    publishedAt,
    mainImage { ${imageFields} },
    "author": author->{ name, role, "slug": slug.current },
    "categories": categories[]->{ _id, title, "slug": slug.current }
  }
`);

/** A single post by slug, fully expanded, with SEO fallbacks resolved. */
export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    _updatedAt,
    mainImage { ${imageFields} },
    body[] {
      ...,
      _type == "image" => { ${imageFields} }
    },
    "author": author->{
      name,
      role,
      bio,
      link,
      "slug": slug.current,
      image { ${imageFields} }
    },
    "categories": categories[]->{ _id, title, "slug": slug.current },
    "seo": {
      "title": coalesce(seo.metaTitle, title),
      "description": coalesce(seo.metaDescription, excerpt),
      "ogImage": coalesce(seo.ogImage, mainImage),
      "canonicalUrl": seo.canonicalUrl,
      "noIndex": seo.noIndex == true
    }
  }
`);

/** Slugs for generateStaticParams. */
export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);

/** Indexable posts for the sitemap. */
export const POSTS_SITEMAP_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && seo.noIndex != true]{
    "slug": slug.current,
    _updatedAt
  }
`);
