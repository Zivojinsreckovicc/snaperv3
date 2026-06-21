import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingSize = "display" | "xl" | "lg" | "md" | "sm";

const headingSizes: Record<HeadingSize, string> = {
  // Hero display — fluid scale for big "wow" headlines
  display:
    "text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]",
  xl: "text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.07] tracking-[-0.025em]",
  lg: "text-3xl sm:text-4xl font-semibold leading-tight tracking-[-0.02em]",
  md: "text-2xl sm:text-3xl font-semibold leading-snug tracking-[-0.015em]",
  sm: "text-xl font-semibold leading-snug tracking-tight",
};

type HeadingProps = {
  as?: HeadingLevel;
  size?: HeadingSize;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"h2">, "className" | "children">;

/** Heading with decoupled semantic level (`as`) and visual size. */
export function Heading({
  as = 2,
  size = "lg",
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${as}` as const;
  return (
    <Tag
      className={cn(
        "font-display text-balance text-foreground",
        headingSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Intro paragraph that sits under a heading. */
export function Lead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl",
        className
      )}
      {...props}
    />
  );
}

/** Inline brand-gradient text span for highlighting key words. */
export function GradientText({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return <span className={cn("text-gradient", className)} {...props} />;
}

/**
 * Prose wrapper for long-form / CMS (blog) content. Styles raw HTML tags
 * since Tailwind Typography is not installed; tuned to brand tokens.
 */
export function Prose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "max-w-prose text-base leading-relaxed text-muted-foreground",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_li]:my-1 [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-400",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm",
        className
      )}
      {...props}
    />
  );
}
