import { cn } from "@/lib/utils";

const spacing = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-32",
} as const;

const surfaces = {
  default: "bg-background text-foreground",
  subtle: "bg-background-subtle text-foreground",
  card: "bg-card text-card-foreground",
} as const;

type SectionProps = {
  spacing?: keyof typeof spacing;
  surface?: keyof typeof surfaces;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"section">, "className" | "children">;

/**
 * Vertical page-section wrapper. Owns the section's background surface and
 * the standardized vertical rhythm so sections stack consistently.
 */
export function Section({
  spacing: spacingKey = "lg",
  surface = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative w-full",
        spacing[spacingKey],
        surfaces[surface],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
