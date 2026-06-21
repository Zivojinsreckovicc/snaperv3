import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretRight, Clock } from "@phosphor-icons/react/ssr";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/motion/reveal";
import { SanityImage } from "@/components/blog/sanity-image";
import { PostBody } from "@/components/blog/portable-text";
import { JsonLd } from "@/components/seo/json-ld";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate, readingTime } from "@/sanity/lib/format";
import type { PostFull } from "@/sanity/lib/types";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const slugs = await client
      .withConfig({ useCdn: false })
      .fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    // Dataset not reachable at build — render slugs on demand instead.
    return [];
  }
}

async function getPost(slug: string): Promise<PostFull | null> {
  try {
    return await sanityFetch<PostFull | null>({
      query: POST_QUERY,
      params: { slug },
      tags: [`post:${slug}`, "post"],
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const ogImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).fit("crop").url()
    : siteConfig.ogImage;

  return {
    title: { absolute: `${post.seo?.title ?? post.title} | Snaper Digital` },
    description: post.seo?.description,
    alternates: { canonical: post.seo?.canonicalUrl ?? `/blog/${post.slug}` },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url,
      title: post.seo?.title ?? post.title,
      description: post.seo?.description,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.title ?? post.title,
      description: post.seo?.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: RouteProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const minutes = readingTime(post.body);
  const category = post.categories?.[0]?.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    headline: post.title,
    description: post.seo?.description,
    image: post.seo?.ogImage
      ? urlFor(post.seo.ogImage).width(1200).height(630).url()
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.logo}` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main>
        <article>
          {/* Header */}
          <section className="relative overflow-hidden bg-grid pb-10 pt-32 sm:pt-40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-radial-glow"
            />
            <div className="relative mx-auto w-full max-w-2xl px-6 sm:px-8 lg:px-10">
              <Reveal>
                <nav
                  aria-label="Breadcrumb"
                  className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Home
                  </Link>
                  <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
                  <Link
                    href="/blog"
                    className="transition-colors hover:text-foreground"
                  >
                    Blog
                  </Link>
                  <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
                  <span className="line-clamp-1 text-foreground">{post.title}</span>
                </nav>

                <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  {category ? <span>{category}</span> : null}
                  {category ? <span className="text-border-strong">·</span> : null}
                  <span className="text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="text-border-strong">·</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock weight="bold" className="h-3.5 w-3.5" />
                    {minutes} min read
                  </span>
                </div>

                <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.07] tracking-[-0.025em] text-balance text-foreground">
                  {post.title}
                </h1>

                {post.excerpt ? (
                  <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                ) : null}

                {post.author?.name ? (
                  <div className="mt-7 flex items-center gap-3">
                    {post.author.image ? (
                      <span className="relative h-11 w-11 overflow-hidden rounded-full border border-border">
                        <SanityImage
                          value={post.author.image}
                          fill
                          width={88}
                          sizes="44px"
                        />
                      </span>
                    ) : null}
                    <span className="text-sm">
                      <span className="block font-medium text-foreground">
                        {post.author.name}
                      </span>
                      {post.author.role ? (
                        <span className="block text-muted-foreground">
                          {post.author.role}
                        </span>
                      ) : null}
                    </span>
                  </div>
                ) : null}
              </Reveal>
            </div>
          </section>

          {/* Cover image — slightly wider than the body for rhythm */}
          {post.mainImage ? (
            <div className="mx-auto w-full max-w-4xl px-6 sm:px-8 lg:px-10">
              <Reveal>
                <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-border shadow-glow">
                  <SanityImage
                    value={post.mainImage}
                    fill
                    priority
                    sizes="(min-width: 1024px) 896px, 100vw"
                  />
                </div>
              </Reveal>
            </div>
          ) : null}

          {/* Body — constrained reading column */}
          <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:px-8 sm:py-16">
            <PostBody value={post.body ?? []} />

            {/* Author bio */}
            {post.author?.bio ? (
              <div className="mt-14 flex flex-col gap-4 rounded-card border border-border bg-card p-7 shadow-soft sm:flex-row sm:items-start">
                {post.author.image ? (
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
                    <SanityImage
                      value={post.author.image}
                      fill
                      width={112}
                      sizes="56px"
                    />
                  </span>
                ) : null}
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {post.author.name}
                    {post.author.role ? (
                      <span className="font-normal text-muted-foreground">
                        {" "}
                        · {post.author.role}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="mt-12">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                <CaretRight
                  weight="bold"
                  className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Back to all posts
              </Link>
            </div>
          </div>
        </article>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
