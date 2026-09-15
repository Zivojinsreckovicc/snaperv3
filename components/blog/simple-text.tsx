import type { PortableTextComponents } from "next-sanity";

/**
 * Compact Portable Text components for the "simple rich text" fields
 * (FAQ answers, callout bodies): paragraphs, lists, bold/italic and links.
 */
export const simpleTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[0.9375rem] leading-relaxed text-muted-foreground [&:not(:first-child)]:mt-3">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-muted-foreground marker:text-accent">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-muted-foreground marker:text-accent">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = value?.openInNewTab || /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={value?.openInNewTab ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-brand-400"
        >
          {children}
        </a>
      );
    },
  },
};
