import { cn } from "@/lib/utils";

type HomeSectionHeadingProps = {
  firstLine: string;
  outline: string;
  accent: string;
  prominent?: boolean;
  id?: string;
  className?: string;
};

/** The homepage's editorial heading treatment; other pages keep Heading. */
export function HomeSectionHeading({
  firstLine,
  outline,
  accent,
  prominent = false,
  id,
  className,
}: HomeSectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "font-display font-semibold uppercase leading-[1.04] tracking-[-0.065em] text-foreground",
        prominent
          ? "text-[clamp(2rem,10.5vw,9rem)]"
          : "text-[clamp(1.75rem,7.5vw,6.5rem)]",
        className,
      )}
    >
      <span className="block">{firstLine}</span>{" "}
      <span className="mt-1 block sm:mt-2">
        <span className="text-transparent [-webkit-text-stroke:1px_var(--foreground)] [@media(forced-colors:active)]:text-foreground">
          {outline}
        </span>{" "}
        <span className="text-accent">{accent}</span>
      </span>
    </h2>
  );
}

export function HomeSectionHeader({
  eyebrow,
  ...headingProps
}: HomeSectionHeadingProps & { eyebrow: string }) {
  return (
    <div className="border-t border-border-strong pt-5">
      <p className="mb-8 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:mb-10 sm:text-xs">
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
        {eyebrow}
      </p>
      <HomeSectionHeading {...headingProps} />
    </div>
  );
}
