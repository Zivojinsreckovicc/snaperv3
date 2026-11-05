import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, CaretRight, MapPin } from "@phosphor-icons/react/ssr";
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

const workingSteps = [
  {
    title: "Understand",
    body: "Start with the real goal, the audience and the constraints.",
  },
  {
    title: "Make",
    body: "Turn the strategy into focused work with clear decisions.",
  },
  {
    title: "Improve",
    body: "Learn from what is working and sharpen the system over time.",
  },
];

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

/** Editorial portrait; the large crop makes the existing image the visual anchor. */
function AuthorPortrait({
  author,
  className,
}: {
  author: AuthorProfile;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[2.75rem] border border-accent/15 sm:-inset-7"
      />
      <div
        aria-hidden="true"
        className="absolute -right-5 -top-5 h-24 w-24 rounded-full border border-accent/25 sm:-right-9 sm:-top-9 sm:h-36 sm:w-36"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-card shadow-[0_30px_100px_-40px_rgba(117,77,236,0.55)] sm:rounded-[2.5rem]">
        {author.image ? (
          <Image
            src={author.image}
            alt={`${author.name}, ${author.role} at ${siteConfig.name}`}
            fill
            priority
            sizes="(min-width: 1280px) 470px, (min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(150deg,var(--color-brand-500),var(--color-brand-700))]">
            <span className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {author.initials}
            </span>
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
          <div>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/55">
              {author.role.includes("Founder") ? "Founder of" : "Part of"}
            </span>
            <span className="mt-1 block font-display text-lg font-semibold">
              {siteConfig.name}
            </span>
          </div>
          <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
            {author.location}
          </span>
        </div>
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
        <section className="relative overflow-hidden bg-grid pb-24 pt-32 sm:pt-40 lg:min-h-[940px] lg:pb-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[75vh] bg-radial-glow"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-8rem] top-36 h-80 w-80 rounded-full border border-accent/10 sm:h-[34rem] sm:w-[34rem]"
          />
          <Container className="relative max-w-7xl">
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="mb-12 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground lg:mb-16"
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

            <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8 xl:gap-14">
              <Reveal className="mx-auto w-[min(100%,32rem)] lg:col-span-5 lg:mx-0 lg:w-full">
                <AuthorPortrait author={author} />
              </Reveal>

              <Reveal delay={0.08} className="lg:col-span-7 lg:pl-6">
                <Eyebrow>{author.role} · {siteConfig.name}</Eyebrow>
                <h1 className="mt-5 text-balance font-display text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-foreground">
                  {lastName ? (
                    <>
                      <span className="block">{firstName}</span>
                      <GradientText className="block pb-[0.08em]">{lastName}</GradientText>
                    </>
                  ) : (
                    author.name
                  )}
                </h1>
                <p className="mt-7 max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground sm:text-2xl sm:leading-relaxed">
                  {author.tagline}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
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

                <dl className="mt-12 grid grid-cols-3 border-y border-border/80 py-5 sm:mt-14 sm:py-6">
                  {author.highlights.map((item, index) => (
                    <div
                      key={item.label}
                      className={`min-w-0 ${index > 0 ? "border-l border-border/80 pl-4 sm:pl-6" : "pr-4 sm:pr-6"}`}
                    >
                      <dt className="truncate text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
                        {item.label}
                      </dt>
                      <dd className="mt-2 font-display text-sm font-semibold text-foreground sm:text-base">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="#about-author"
                  className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowDown className="h-4 w-4 text-accent" />
                  Discover the story
                </a>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Editorial story */}
        <section id="about-author" className="relative scroll-mt-24 bg-background py-24 sm:py-32">
          <Container className="max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <span className="font-display text-[clamp(4rem,10vw,8rem)] font-semibold leading-none tracking-[-0.06em] text-accent/15">
                    01
                  </span>
                  <Eyebrow className="mt-5">Behind the work</Eyebrow>
                  <Heading as={2} size="lg" className="mt-5 max-w-sm">
                    Digital work with a business reason behind it.
                  </Heading>
                </div>
              </Reveal>

              <div className="lg:col-span-7 lg:col-start-6">
                <Reveal delay={0.06}>
                  <p className="text-pretty font-display text-[clamp(1.7rem,3.4vw,3rem)] font-medium leading-[1.25] tracking-[-0.025em] text-foreground">
                    {author.bio[0]}
                  </p>
                </Reveal>
                <div className="mt-10 grid gap-6 border-l border-accent/40 pl-6 sm:mt-12 sm:gap-8 sm:pl-9">
                  {author.bio.slice(1).map((para, index) => (
                    <Reveal key={para} delay={0.06 * index}>
                      <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                        {para}
                      </p>
                    </Reveal>
                  ))}
                </div>
                <Reveal className="mt-11" delay={0.12}>
                  <CtaLink href={contactCta.href} size="md">
                    Work with {firstName}
                  </CtaLink>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* Capability field */}
        <section className="relative overflow-hidden border-y border-border/70 bg-background-subtle py-24 sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-0 font-display text-[18rem] font-semibold leading-none tracking-[-0.09em] text-accent/[0.035] sm:text-[30rem]"
          >
            AI
          </div>
          <Container className="relative max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
              <Reveal className="lg:col-span-5">
                <span className="font-display text-[clamp(4rem,10vw,8rem)] font-semibold leading-none tracking-[-0.06em] text-accent/15">
                  02
                </span>
                <Eyebrow className="mt-5">Where I add value</Eyebrow>
                <Heading as={2} size="lg" className="mt-5 max-w-md">
                  A focused mix of strategy, craft and execution.
                </Heading>
                <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
                  Fewer handoffs, clearer decisions and a finished system where every
                  part supports the same goal.
                </p>
              </Reveal>

              <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
                <ol className="grid border-t border-border-strong sm:grid-cols-2">
                  {author.expertise.map((skill, index) => (
                    <li
                      key={skill}
                      className={`group flex min-h-24 items-center gap-5 border-b border-border-strong py-5 transition-colors duration-300 hover:bg-accent/[0.045] sm:px-5 ${
                        index % 2 === 1 ? "sm:border-l" : ""
                      }`}
                    >
                      <span className="font-display text-xs font-semibold tracking-[0.12em] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base font-semibold tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-1 sm:text-lg">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Working model */}
        <section className="bg-background py-24 sm:py-32">
          <Container className="max-w-7xl">
            <Reveal className="max-w-3xl">
              <Eyebrow>How the work connects</Eyebrow>
              <Heading as={2} size="lg" className="mt-5">
                From first idea to a system that is ready to grow.
              </Heading>
            </Reveal>

            <div className="mt-14 grid border-y border-border lg:grid-cols-3">
              {workingSteps.map((step, index) => (
                <Reveal
                  key={step.title}
                  delay={index * 0.06}
                  className={`group relative py-8 lg:min-h-64 lg:px-8 lg:py-10 ${
                    index > 0 ? "border-t border-border lg:border-l lg:border-t-0" : ""
                  }`}
                >
                  <span className="font-display text-xs font-semibold tracking-[0.12em] text-accent">
                    / 0{index + 1}
                  </span>
                  <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-pretty leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 lg:group-hover:w-full" />
                </Reveal>
              ))}
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
