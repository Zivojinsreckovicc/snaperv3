"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

function format(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Counts from 0 to `to` once the element scrolls into view. The server HTML
 * holds the final number, so the figure is readable before JavaScript loads.
 * After hydration, a counter that is still below the fold is reset to 0 and
 * counts up when scrolled to; one already on screen keeps its final value.
 * The animated value is written straight to the DOM node (textContent) via
 * Motion's `animate`, so it never re-renders React on every frame.
 * Reduced-motion users always see the final number.
 */
export function CountUp({
  to,
  prefix,
  suffix,
  decimals = 0,
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const armed = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top >= window.innerHeight) {
      node.textContent = format(0, decimals);
      armed.current = true;
    }
  }, [decimals]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || !armed.current) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(v, decimals);
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, duration]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>{format(to, decimals)}</span>
      {suffix}
    </span>
  );
}
