import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from "react";
import { cn } from "@/lib/utils";

type EnterOwnProps<T extends ElementType> = {
  /** Element to render. Defaults to a div. */
  as?: T;
  /** Seconds before the entrance starts. */
  delay?: number;
  /** Seconds the entrance takes. */
  duration?: number;
  /** Starting vertical offset in px. */
  y?: number;
  /** Starting blur in px. */
  blur?: number;
  /** Starting scale. */
  scale?: number;
};

export type EnterProps<T extends ElementType> = EnterOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof EnterOwnProps<T>>;

/**
 * Above-the-fold entrance (fade + lift, optional blur/scale) done in CSS.
 *
 * Use this instead of a Motion `initial`/`animate` pair for anything visible
 * on first paint. Motion writes `opacity:0` into the server HTML and only
 * reveals the element once React hydrates, which on a slow phone can be many
 * seconds after the page has painted. A CSS animation starts on first paint,
 * needs no JavaScript, and works in Server Components. Reduced-motion
 * visitors get no animation (see globals.css).
 */
export function Enter<T extends ElementType = "div">({
  as,
  delay = 0,
  duration = 0.7,
  y = 16,
  blur = 0,
  scale = 1,
  className,
  style,
  ...rest
}: EnterProps<T>) {
  const Tag: ElementType = as ?? "div";
  const vars: Record<string, string> = {};
  if (delay) vars["--enter-delay"] = `${delay}s`;
  if (duration !== 0.7) vars["--enter-duration"] = `${duration}s`;
  if (y !== 16) vars["--enter-y"] = `${y}px`;
  if (blur) vars["--enter-blur"] = `${blur}px`;
  if (scale !== 1) vars["--enter-scale"] = String(scale);

  return (
    <Tag
      className={cn("animate-enter", className as string | undefined)}
      style={{ ...vars, ...(style as CSSProperties | undefined) }}
      {...rest}
    />
  );
}
