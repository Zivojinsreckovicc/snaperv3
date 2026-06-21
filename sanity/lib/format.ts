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

/** Rough reading time in minutes from a Portable Text body (~200 wpm). */
export function readingTime(blocks?: PortableTextBlock[]) {
  if (!blocks?.length) return 1;
  const words = blocks.reduce((total, block) => {
    if (block._type !== "block") return total;
    const text = ((block.children as { text?: string }[]) ?? [])
      .map((child) => child.text ?? "")
      .join(" ");
    return total + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}
