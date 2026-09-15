import type { PortableTextBlock } from "next-sanity";

/** Human date, e.g. "June 20, 2026". */
export function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Plain text of a single Portable Text block (empty for non-text blocks). */
export function blockText(block: PortableTextBlock): string {
  if (block._type !== "block" || !Array.isArray(block.children)) return "";
  return (block.children as { text?: string }[])
    .map((child) => child.text ?? "")
    .join("");
}

/** Flattens Portable Text to plain paragraphs (for JSON-LD, previews). */
export function toPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks.map(blockText).filter(Boolean).join("\n\n").trim();
}

/** URL-safe anchor id from heading text, e.g. "Why it matters" -> "why-it-matters". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Rough reading time in minutes from a Portable Text body (~200 wpm). */
export function readingTime(blocks?: PortableTextBlock[]) {
  if (!blocks?.length) return 1;
  const words = blocks.reduce(
    (total, block) => total + blockText(block).split(/\s+/).filter(Boolean).length,
    0
  );
  return Math.max(1, Math.round(words / 200));
}
