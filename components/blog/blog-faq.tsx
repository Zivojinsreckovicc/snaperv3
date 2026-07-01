import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { CaretDown } from "@phosphor-icons/react/ssr";

type FaqItem = {
  _key: string;
  question: string;
  answer?: PortableTextBlock[];
};

type FaqValue = {
  heading?: string;
  items?: FaqItem[];
};

// Compact components for the (deliberately simple) FAQ answer body.
const answerComponents: PortableTextComponents = {
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
      const external = value?.openInNewTab || !href.startsWith("/");
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

/** Flattens a Portable Text answer to plain text for FAQPage structured data. */
function toPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks
    .map((block) =>
      block._type === "block" && Array.isArray(block.children)
        ? block.children.map((child) => child.text ?? "").join("")
        : ""
    )
    .join("\n\n")
    .trim();
}

export function BlogFaq({ value }: { value: FaqValue }) {
  const items = value?.items?.filter((i) => i?.question) ?? [];
  if (!items.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainText(item.answer),
      },
    })),
  };

  return (
    <section className="my-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {value.heading ? (
        <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {value.heading}
        </h2>
      ) : null}
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item._key}
            className="group overflow-hidden rounded-card border border-border bg-card transition-colors open:border-accent/40 hover:border-border-strong"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-base font-medium text-foreground">
                {item.question}
              </span>
              <CaretDown
                weight="bold"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <div className="px-5 pb-5 pt-0">
              {item.answer ? (
                <PortableText
                  value={item.answer}
                  components={answerComponents}
                />
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
