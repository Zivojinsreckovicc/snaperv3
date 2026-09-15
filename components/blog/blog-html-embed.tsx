"use client";

import { useEffect, useRef } from "react";

export type HtmlEmbedValue = { label?: string; html?: string };

/**
 * Raw HTML embed (X posts, CodePen, Typeform, maps). Injected on the client
 * via a contextual fragment so any <script> inside the snippet executes,
 * which plain innerHTML / dangerouslySetInnerHTML would not do.
 */
export function BlogHtmlEmbed({ value }: { value: HtmlEmbedValue }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !value?.html) return;
    el.replaceChildren(
      document.createRange().createContextualFragment(value.html)
    );
    return () => el.replaceChildren();
  }, [value?.html]);

  if (!value?.html) return null;

  return (
    <div
      ref={ref}
      className="my-8 [&_iframe]:max-w-full [&_iframe]:rounded-card"
      aria-label={value.label || undefined}
    />
  );
}
