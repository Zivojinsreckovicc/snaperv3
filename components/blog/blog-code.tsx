"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

export type CodeValue = {
  code?: string;
  language?: string;
  filename?: string;
  highlightedLines?: number[];
};

const languageLabels: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  tsx: "TSX",
  jsx: "JSX",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  sh: "Shell",
  bash: "Shell",
  python: "Python",
  sql: "SQL",
  markdown: "Markdown",
  text: "Text",
};

/**
 * Code block from @sanity/code-input: filename / language header, a copy
 * button, and optional highlighted lines. Monospace and scrollable; no
 * highlighting library so the page stays light.
 */
export function BlogCode({ value }: { value: CodeValue }) {
  const [copied, setCopied] = useState(false);
  if (!value?.code) return null;

  const lines = value.code.split("\n");
  const highlighted = new Set(value.highlightedLines ?? []);
  const label =
    value.filename ||
    (value.language ? languageLabels[value.language] ?? value.language : "Code");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value.code ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (insecure context); silently ignore.
    }
  }

  return (
    <div className="my-8 overflow-hidden rounded-card border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-2">
        <span className="truncate font-mono text-xs text-muted-foreground">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="inline-flex h-7 items-center gap-1.5 rounded-pill border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {copied ? (
            <Check weight="bold" className="h-3.5 w-3.5 text-accent" />
          ) : (
            <Copy weight="bold" className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-relaxed">
        <code className="block font-mono text-foreground" data-language={value.language}>
          {lines.map((line, i) => (
            <span
              key={i}
              className={
                highlighted.has(i + 1)
                  ? "-mx-4 block border-l-2 border-accent bg-accent/10 px-4"
                  : "block"
              }
            >
              {line || " "}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
