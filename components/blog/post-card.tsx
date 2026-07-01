import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SanityImage } from "./sanity-image";
import { formatDate } from "@/sanity/lib/format";
import type { PostCard as PostCardData } from "@/sanity/lib/types";

export function PostCard({
  post,
  delay = 0,
  featured = false,
}: {
  post: PostCardData;
  delay?: number;
  featured?: boolean;
}) {
  const category = post.categories?.[0]?.title;

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className={`group flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-soft transition-all duration-300 ease-[var(--ease-quart)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow ${
          featured ? "lg:grid lg:grid-cols-2 lg:items-stretch" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden bg-muted ${
            featured ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[16/10]"
          }`}
        >
          {post.mainImage ? (
            <SanityImage
              value={post.mainImage}
              fill
              priority={featured}
              sizes={
                featured
                  ? "(min-width: 1024px) 50vw, 100vw"
                  : "(min-width: 1024px) 33vw, 100vw"
              }
              className="transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
        </div>

        <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-accent">
            {category ? <span>{category}</span> : null}
            {category ? <span className="text-border-strong">·</span> : null}
            <span className="text-muted-foreground">
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <h3
            className={`mt-3 font-display font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent ${
              featured ? "text-2xl sm:text-3xl" : "text-lg"
            }`}
          >
            {post.title}
          </h3>

          {post.excerpt ? (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}

          {post.author?.name ? (
            <p className="mt-auto pt-5 text-sm text-muted-foreground">
              By <span className="text-foreground">{post.author.name}</span>
            </p>
          ) : null}
          {/* Note: the card is a single <Link> to the post, so the author name
              can't be its own link here — the author page is linked from the
              full article byline instead. */}
        </div>
      </Link>
    </Reveal>
  );
}
