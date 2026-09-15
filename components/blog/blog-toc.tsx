import { ListBullets } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

export type TocHeading = { id: string; text: string; level: 2 | 3 };

export type TableOfContentsValue = {
  title?: string;
  includeH3?: boolean;
};

/** Auto-generated table of contents from the article's H2/H3 headings. */
export function BlogToc({
  value,
  headings,
}: {
  value: TableOfContentsValue;
  headings: TocHeading[];
}) {
  const items = headings.filter(
    (h) => h.level === 2 || value?.includeH3 !== false
  );
  if (!items.length) return null;

  return (
    <nav
      aria-label={value.title || "Table of contents"}
      className="my-8 rounded-card border border-border bg-card p-5 shadow-soft sm:p-6"
    >
      <p className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
        <ListBullets weight="bold" aria-hidden="true" className="h-4 w-4 text-accent" />
        {value.title || "In this article"}
      </p>
      <ol className="space-y-1.5 text-[0.9375rem]">
        {items.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && "pl-4")}>
            <a
              href={`#${h.id}`}
              className={cn(
                "inline-block leading-snug underline-offset-4 transition-colors hover:text-accent hover:underline",
                h.level === 2 ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
