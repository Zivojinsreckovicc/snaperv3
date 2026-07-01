import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretRight, MapPin } from "@phosphor-icons/react/ssr";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow, GradientText, Heading } from "@/components/ui";
import { CtaLink } from "@/components/ui/cta-link";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { POSTS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import type { PostCard as PostCardData } from "@/sanity/lib/types";
import { authorSlugs, getAuthor, type AuthorProfile } from "@/lib/authors";
import { buildAuthorJsonLd } from "@/lib/structured-data";
import { contactCta, siteConfig } from "@/lib/site";

export const revalidate = 60;

type RouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return authorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};

  const url = `${siteConfig.url}/authors/${author.slug}`;
  const ogImage = author.image
    ? `${siteConfig.url}${author.image}`
    : siteConfig.ogImage;

  return {
    title: { absolute: `${author.name} — ${author.role} | Snaper Digital` },
    description: author.metaDescription,
    alternates: { canonical: `/authors/${author.slug}` },
    openGraph: {
      type: "profile",
      url,
      title: `${author.name} — ${author.role}`,
      description: author.metaDescription,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${author.name} — ${author.role}`,
      description: author.metaDescription,
      images: [ogImage],
    },
  };
}

async function getAuthorPosts(slug: string): Promise<PostCardData[]> {
  try {
    return await sanityFetch<PostCardData[]>({
      query: POSTS_BY_AUTHOR_QUERY,
      params: { slug },
      tags: ["post", `author:${slug}`],
    });
  } catch {
    return [];
  }
}

/** Portrait with a brand-gradient ring; monogram fallback when there's no photo. */
function AuthorAvatar({
  author,
  className,
}: {
  author: AuthorProfile;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.9rem] bg-[linear-gradient(150deg,var(--color-brand-400),var(--color-brand-700))] p-[2px] shadow-glow ${className ?? ""}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-[1.8rem] bg-card">
        {author.image ? (
          <Image
            src={author.image}
            alt={`${author.name}, ${author.role} at ${siteConfig.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 260px, 40vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(150deg,var(--color-brand-500),var(--color-brand-700))]">
            <span className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {author.initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function AuthorPage({ params }: RouteProps) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const posts = await getAuthorPosts(slug);
  const [firstName, ...restName] = author.name.split(" ");
  const lastName = restName.join(" ");

  return (
    <>
      <JsonLd data={buildAuthorJsonLd(author)} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-grid pb-14 pt-32 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-radial-glow"
          />
          <Container className="relative max-w-5xl">
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="mb-10 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
                <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
                <Link href="/blog" className="transition-colors hover:text-foreground">
                  Blog
                </Link>
                <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
                <span className="line-clamp-1 text-foreground">{author.name}</span>
              </nav>
            </Reveal>

            <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
              <Reveal className="mx-auto w-40 sm:w-52 lg:mx-0 lg:w-full">
                <AuthorAvatar author={author} />
              </Reveal>

              <Reveal delay={0.08}>
                <Eyebrow>{author.role}</Eyebrow>
                <Heading as={1} size="xl" className="mt-4">
                  {lastName ? (
                    <>
                      {firstName} <GradientText>{lastName}</GradientText>
                    </>
                  ) : (
                    author.name
                  )}
                </Heading>
                <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {author.tagline}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin weight="fill" className="h-4 w-4 text-accent" />
                  <span>{author.location}</span>
                  <span className="text-border-strong">·</span>
                  <span>Available for projects worldwide</span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <CtaLink href={contactCta.href} size="md">
                    {contactCta.label}
                  </CtaLink>
                  <Link
                    href="/blog"
                    className="inline-flex h-12 items-center rounded-full border border-border-strong px-6 text-sm font-medium text-foreground transition-colors hover:border-accent"
                  >
                    Read the blog
                  </Link>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* About + at-a-glance sidebar */}
        <section className="relative w-full bg-background pb-20 sm:pb-24">
          <Container className="max-w-5xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
              <Reveal>
                <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  About
                </h2>
                <div className="mt-5 space-y-5">
                  {author.bio.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? "text-pretty text-xl leading-relaxed text-foreground"
                          : "text-pretty text-lg leading-relaxed text-muted-foreground"
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="rounded-card border border-border bg-card p-7 shadow-soft lg:sticky lg:top-28">
                  <h3 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    At a glance
                  </h3>
                  <dl className="mt-4 space-y-3">
                    {author.highlights.map((h) => (
                      <div
                        key={h.label}
                        className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                      >
                        <dt className="text-sm text-muted-foreground">{h.label}</dt>
                        <dd className="font-display text-sm font-semibold text-foreground">
                          {h.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <h3 className="mt-7 font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Focus areas
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {author.expertise.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <CtaLink
                      href={contactCta.href}
                      size="md"
                      className="w-full justify-between"
                    >
                      Work with {firstName}
                    </CtaLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Articles by this author */}
        {posts.length > 0 ? (
          <section className="relative w-full border-t border-border/60 bg-background py-20 sm:py-24">
            <Container className="max-w-5xl">
              <Reveal>
                <Heading as={2} size="lg">
                  Latest from <GradientText>{firstName}</GradientText>
                </Heading>
                <p className="mt-3 text-muted-foreground">
                  {posts.length} article{posts.length === 1 ? "" : "s"} on the Snaper
                  Digital blog.
                </p>
              </Reveal>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <PostCard key={post._id} post={post} delay={(i % 3) * 0.06} />
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        <Contact />
      </main>
      <Footer />
    </>
  );
}
