import type { PortableTextBlock } from "next-sanity";

export type SanityImageRef = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
  lqip?: string;
  dimensions?: { width: number; height: number };
};

export type CategoryRef = { _id: string; title: string; slug?: string };

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured?: boolean;
  publishedAt?: string;
  mainImage?: SanityImageRef;
  author?: { name: string; role?: string; slug?: string };
  categories?: CategoryRef[];
};

export type PostFull = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  _updatedAt?: string;
  mainImage?: SanityImageRef;
  body?: PortableTextBlock[];
  author?: {
    name: string;
    role?: string;
    bio?: string;
    link?: string;
    slug?: string;
    image?: SanityImageRef;
  };
  categories?: CategoryRef[];
  seo: {
    title?: string;
    description?: string;
    ogImage?: SanityImageRef;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
};
