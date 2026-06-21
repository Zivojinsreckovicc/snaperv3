import { cn } from "@/lib/utils";

type CardProps = {
  /** Lift + brand glow on hover. Good for clickable / feature cards. */
  interactive?: boolean;
  /** Gradient hairline border for a premium edge. */
  gradientBorder?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

export function Card({
  interactive = false,
  gradientBorder = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-card bg-card text-card-foreground shadow-soft",
        gradientBorder ? "ring-gradient" : "border border-border",
        interactive &&
          "transition-all duration-300 ease-[var(--ease-quart)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-2 p-6 sm:p-7", className)} {...props} />
  );
}

export function CardTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("p-6 pt-0 sm:p-7 sm:pt-0", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex items-center gap-3 p-6 pt-0 sm:p-7 sm:pt-0", className)}
      {...props}
    />
  );
}
