import type { PortableTextBlock } from "next-sanity";
import { toPlainText } from "./format";
import type { FaqItem, PostFull } from "./types";

/**
 * The questions a post's FAQPage schema should list, per its FAQ Schema tab:
 * "custom" uses the hand-written list, "auto" collects every FAQ section in
 * the body, "off" returns nothing. Duplicate questions are dropped so a page
 * never repeats one in its structured data.
 */
export function faqSchemaItems(post: PostFull): FaqItem[] {
  const { mode, items } = post.faqSchema ?? { mode: "auto" };
  if (mode === "off") return [];

  const source =
    mode === "custom"
      ? (items ?? [])
      : (post.body ?? [])
          .filter((block) => block._type === "faqSection")
          .flatMap((block) => (block as PortableTextBlock & { items?: FaqItem[] }).items ?? []);

  const seen = new Set<string>();
  return source.filter((item) => {
    const key = item?.question?.trim().toLowerCase();
    if (!key || !toPlainText(item.answer) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** A single FAQPage node for the post's JSON-LD @graph, or null if it has no FAQs. */
export function faqPageNode(post: PostFull, url: string) {
  const items = faqSchemaItems(post);
  if (!items.length) return null;

  return {
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    url,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainText(item.answer),
      },
    })),
  };
}
