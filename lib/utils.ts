/**
 * Dependency-free class name joiner (clsx-style).
 * Accepts strings, arrays and conditional objects; ignores falsy values.
 *
 *   cn("px-4", isActive && "bg-accent", ["text-sm", { hidden: !open }])
 *
 * Note: this does not de-duplicate conflicting Tailwind utilities. When a
 * primitive accepts `className`, append it last so consumer overrides win
 * in source order.
 */
export type ClassValue =
  | string
  | number
  | null
  | boolean
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const push = (value: ClassValue): void => {
    if (!value) return;

    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) push(item);
      return;
    }

    if (typeof value === "object") {
      for (const key in value) {
        if (value[key]) out.push(key);
      }
    }
  };

  for (const input of inputs) push(input);

  return out.join(" ");
}
