import { cn } from "@/lib/utils";

export type BadgeVariant = "accent" | "outline" | "muted" | "solid";

const variants: Record<BadgeVariant, string> = {
  accent:
    "border border-accent/30 bg-accent/10 text-accent",
  outline: "border border-border-strong text-muted-foreground",
  muted: "border border-transparent bg-muted text-muted-foreground",
  solid: "border border-transparent bg-accent text-accent-foreground",
};

type BadgeProps = {
  variant?: BadgeVariant;
} & React.ComponentPropsWithoutRef<"span">;

export function Badge({ variant = "accent", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

/**
 * Eyebrow — the small uppercase accent label that sits above a section
 * heading. Ration to at most 1 per ~3 sections. The leading signal dot is
 * opt-in (`dot`) and off by default to avoid decorative-dot clutter.
 */
export function Eyebrow({
  className,
  children,
  dot = false,
  ...props
}: { dot?: boolean } & React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent",
        className
      )}
      {...props}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow-sm"
        />
      ) : null}
      {children}
    </p>
  );
}
