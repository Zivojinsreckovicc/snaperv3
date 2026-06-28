import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container, Eyebrow, GradientText, Heading, Lead } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import type { PostCard as PostCardData } from "@/sanity/lib/types";
import { buildBlogIndexJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Blog | Web Design, Development & AI Automation Insights" },
  description:
    "Practical articles on web design, development, conversion and AI automation from the Snaper Digital team. Clear, no-fluff advice for growing businesses.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/blog`,
    title: "Snaper Digital Blog",
    description:
      "Practical articles on web design, development, conversion and AI automation for growing businesses.",
    images: [{ url: siteConfig.ogImage }],
  },
};

async function getPosts(): Promise<PostCardData[]> {
  try {
    return await sanityFetch<PostCardData[]>({
      query: POSTS_QUERY,
      tags: ["post"],
    });
  } catch {
    // Dataset not reachable / not yet public — render the empty state.
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id);

  return (
    <>
      <JsonLd data={buildBlogIndexJsonLd(posts)} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-grid pb-12 pt-32 sm:pb-16 sm:pt-40 lg:pb-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-radial-glow"
          />
          <Container className="relative">
            <Reveal>
              <Eyebrow>Blog</Eyebrow>
              <Heading as={1} size="display" className="mt-4 max-w-3xl">
                Ideas worth <GradientText>shipping</GradientText>.
              </Heading>
              <Lead className="mt-6">
                Practical writing on web design, development, conversion and AI
                automation. No fluff, just what actually moves the needle.
              </Lead>
            </Reveal>
          </Container>
        </section>

        {/* Posts */}
        <section className="relative w-full bg-background pb-24 sm:pb-28 lg:pb-32">
          <Container>
            {posts.length === 0 ? (
              <div className="rounded-card border border-border bg-card p-12 text-center shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  No posts published yet
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                  New articles will appear here. Add your first post in the{" "}
                  <Link
                    href="/studio"
                    className="font-medium text-accent underline-offset-4 hover:underline"
                  >
                    content studio
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <>
                {featured ? (
                  <PostCard post={featured} featured />
                ) : null}

                {rest.length > 0 ? (
                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post, i) => (
                      <PostCard key={post._id} post={post} delay={(i % 3) * 0.06} />
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
