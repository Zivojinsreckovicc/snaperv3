"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

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
 * Counts from 0 to `to` once the element scrolls into view. The animated
 * value is written straight to the DOM node (textContent) via Motion's
 * `animate`, so it never re-renders React on every frame. Reduced-motion
 * users see the final number immediately.
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
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduce) {
      node.textContent = format(to, decimals);
      return;
    }
    if (!inView) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(v, decimals);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, decimals, duration]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>{format(reduce ? to : 0, decimals)}</span>
      {suffix}
    </span>
  );
}
