import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "gradient"
  | "secondary"
  | "outline"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-medium " +
  "transition-all duration-200 ease-[var(--ease-quart)] cursor-pointer select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 " +
  "active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  // Solid brand accent — primary CTA
  primary:
    "bg-accent text-accent-foreground shadow-glow-sm hover:bg-brand-600 hover:shadow-glow",
  // Eye-catching brand gradient for hero CTAs. Kept within the darker violet
  // range so white label text always clears WCAG AA (the cyan->blue sweep is
  // reserved for text/borders, where contrast-on-fill isn't a concern).
  gradient:
    "text-white shadow-glow-sm hover:shadow-glow [background-image:linear-gradient(180deg,var(--color-brand-500),var(--color-brand-700))] hover:brightness-110",
  // Neutral surface button
  secondary:
    "bg-muted text-foreground hover:bg-border-strong/60 border border-border",
  // Bordered, transparent
  outline:
    "border border-border-strong bg-transparent text-foreground hover:border-accent hover:text-accent",
  // Minimal text button
  ghost: "bg-transparent text-foreground hover:bg-muted",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
  icon: "h-11 w-11",
};

/**
 * Returns the class string for a button-styled element. Use this to style
 * links as buttons, e.g. <Link className={buttonVariants({ variant: "primary" })}>.
 */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & React.ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
