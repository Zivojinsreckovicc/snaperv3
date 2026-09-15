import { PortableText, type PortableTextBlock } from "next-sanity";
import { CaretDown } from "@phosphor-icons/react/ssr";
import { simpleTextComponents } from "./simple-text";
import { toPlainText } from "@/sanity/lib/format";

type FaqItem = {
  _key: string;
  question: string;
  answer?: PortableTextBlock[];
};

type FaqValue = {
  heading?: string;
  items?: FaqItem[];
};

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
                  components={simpleTextComponents}
                />
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
