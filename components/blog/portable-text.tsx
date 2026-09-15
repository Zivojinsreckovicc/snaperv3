import {
  PortableText,
  type PortableTextBlock,
  type PortableTextBlockComponent,
  type PortableTextComponents,
  type PortableTextTypeComponent,
} from "next-sanity";
import { Check } from "@phosphor-icons/react/ssr";
import { SanityImage } from "./sanity-image";
import { BlogTable } from "./blog-table";
import { BlogFaq } from "./blog-faq";
import { BlogVideo } from "./blog-video";
import { BlogCtaBanner } from "./blog-cta-banner";
import { BlogLinkButton } from "./blog-link-button";
import { BlogCallout } from "./blog-callout";
import { BlogPullQuote } from "./blog-pull-quote";
import { BlogCode } from "./blog-code";
import { BlogImageGallery } from "./blog-image-gallery";
import { BlogDivider } from "./blog-divider";
import { BlogHtmlEmbed } from "./blog-html-embed";
import { BlogToc, type TocHeading } from "./blog-toc";
import { blockText, slugify } from "@/sanity/lib/format";

const isExternal = (href: string) => /^(https?:)?\/\//.test(href);

function LinkMark({
  children,
  href,
  openInNewTab,
}: {
  children: React.ReactNode;
  href: string;
  openInNewTab?: boolean;
}) {
  const external = openInNewTab || isExternal(href);
  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-brand-400"
    >
      {children}
    </a>
  );
}

const listClass =
  "my-5 space-y-2 pl-6 text-[1.0625rem] leading-relaxed text-muted-foreground marker:text-accent";

/**
 * Block styles shared by every post. H2/H3 need per-post anchor ids, so they
 * are layered on in `createComponents`.
 */
const blockStyles: Record<string, PortableTextBlockComponent> = {
  normal: ({ children }) => (
    <p className="my-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
      {children}
    </p>
  ),
  h4: ({ children }) => (
    <h4 className="mt-7 mb-2 font-display text-lg font-semibold text-foreground">
      {children}
    </h4>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-7 border-l-2 border-accent pl-5 text-lg italic text-foreground">
      {children}
    </blockquote>
  ),
};

/** Custom (non-text) blocks. The table of contents is added per post. */
const typeComponents: Record<string, PortableTextTypeComponent> = {
  image: ({ value }) => {
    if (!value?.asset) return null;
    const picture = (
      <div className="overflow-hidden rounded-card border border-border">
        <SanityImage value={value} sizes="(min-width: 1024px) 768px, 100vw" />
      </div>
    );
    return (
      <figure className="my-8">
        {value.link ? (
          <a
            href={value.link}
            target={isExternal(value.link) ? "_blank" : undefined}
            rel={isExternal(value.link) ? "noopener noreferrer" : undefined}
            className="block transition-opacity hover:opacity-90"
          >
            {picture}
          </a>
        ) : (
          picture
        )}
        {value.caption ? (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  },
  imageGallery: ({ value }) => <BlogImageGallery value={value} />,
  video: ({ value }) => <BlogVideo value={value} />,
  ctaBanner: ({ value }) => <BlogCtaBanner value={value} />,
  linkButton: ({ value }) => <BlogLinkButton value={value} />,
  callout: ({ value }) => <BlogCallout value={value} />,
  pullQuote: ({ value }) => <BlogPullQuote value={value} />,
  code: ({ value }) => <BlogCode value={value} />,
  table: ({ value }) => <BlogTable value={value} />,
  faqSection: ({ value }) => <BlogFaq value={value} />,
  divider: ({ value }) => <BlogDivider value={value} />,
  htmlEmbed: ({ value }) => <BlogHtmlEmbed value={value} />,
};

/** Lists, list items and inline marks (identical for every post). */
const baseComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul className={`${listClass} list-disc`}>{children}</ul>,
    number: ({ children }) => <ol className={`${listClass} list-decimal`}>{children}</ol>,
    check: ({ children }) => <ul className={`${listClass} list-none pl-0`}>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
    check: ({ children }) => (
      <li className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
        >
          <Check weight="bold" className="h-3 w-3" />
        </span>
        <span className="min-w-0 flex-1">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    "strike-through": ({ children }) => (
      <s className="text-muted-foreground/70">{children}</s>
    ),
    highlight: ({ children }) => (
      <mark className="rounded-sm bg-accent/20 px-1 py-0.5 text-foreground">{children}</mark>
    ),
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <LinkMark href={value?.href ?? "#"} openInNewTab={value?.openInNewTab}>
        {children}
      </LinkMark>
    ),
    // `href` is resolved in the GROQ query from the referenced post's slug.
    internalLink: ({ children, value }) =>
      value?.href ? <LinkMark href={value.href}>{children}</LinkMark> : <>{children}</>,
  },
};

/**
 * Collects H2/H3 headings with unique anchor ids (keyed by block `_key`) so
 * the headings and the table of contents always agree.
 */
function collectHeadings(blocks: PortableTextBlock[]) {
  const ids = new Map<string, string>();
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();

  for (const block of blocks) {
    if (
      block._type !== "block" ||
      !block._key ||
      (block.style !== "h2" && block.style !== "h3")
    ) {
      continue;
    }
    const text = blockText(block).trim();
    if (!text) continue;
    const base = slugify(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    ids.set(block._key, id);
    headings.push({ id, text, level: block.style === "h2" ? 2 : 3 });
  }

  return { ids, headings };
}

function createComponents(blocks: PortableTextBlock[]): PortableTextComponents {
  const { ids, headings } = collectHeadings(blocks);

  return {
    ...baseComponents,
    block: {
      ...blockStyles,
      h2: ({ children, value }) => (
        <h2
          id={ids.get(value._key ?? "")}
          className="mt-12 mb-4 scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3
          id={ids.get(value._key ?? "")}
          className="mt-9 mb-3 scroll-mt-28 font-display text-xl font-semibold tracking-tight text-foreground"
        >
          {children}
        </h3>
      ),
    },
    types: {
      ...typeComponents,
      tableOfContents: ({ value }) => <BlogToc value={value} headings={headings} />,
    },
  };
}

export function PostBody({ value }: { value: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={createComponents(value)} />;
}
