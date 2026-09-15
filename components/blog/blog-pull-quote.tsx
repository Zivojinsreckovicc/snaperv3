import { Quotes } from "@phosphor-icons/react/ssr";

export type PullQuoteValue = {
  quote?: string;
  attribution?: string;
  role?: string;
};

/** Large attributed quote that breaks the reading column. */
export function BlogPullQuote({ value }: { value: PullQuoteValue }) {
  if (!value?.quote) return null;
  return (
    <figure className="relative my-10 rounded-card border border-border bg-card px-6 py-8 shadow-soft sm:px-10 sm:py-10">
      <Quotes
        weight="fill"
        aria-hidden="true"
        className="absolute left-5 top-5 h-8 w-8 text-accent/25 sm:left-7 sm:top-6"
      />
      <blockquote className="relative">
        <p className="font-display text-xl font-medium leading-snug tracking-tight text-balance text-foreground sm:text-2xl">
          {value.quote}
        </p>
      </blockquote>
      {value.attribution || value.role ? (
        <figcaption className="mt-5 flex items-center gap-3 text-sm">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          <span>
            {value.attribution ? (
              <span className="font-medium text-foreground">{value.attribution}</span>
            ) : null}
            {value.attribution && value.role ? (
              <span className="text-muted-foreground"> · </span>
            ) : null}
            {value.role ? (
              <span className="text-muted-foreground">{value.role}</span>
            ) : null}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
