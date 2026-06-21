import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border border-input bg-card px-4 text-sm text-foreground " +
  "placeholder:text-muted-foreground/70 transition-colors duration-200 " +
  "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 " +
  "focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50";

export function Input({
  className,
  type = "text",
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      type={type}
      className={cn(fieldBase, "h-11", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  rows = 4,
  ...props
}: React.ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      rows={rows}
      className={cn(fieldBase, "min-h-24 resize-y py-3 leading-relaxed", className)}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"label">) {
  return (
    <label
      className={cn(
        "mb-2 block text-sm font-medium text-foreground",
        className
      )}
      {...props}
    />
  );
}
