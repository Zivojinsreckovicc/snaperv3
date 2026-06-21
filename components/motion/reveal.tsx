"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type RevealProps = {
  /** Seconds of delay, e.g. for staggering a list by index * 0.06. */
  delay?: number;
  /** Travel distance in px for the fade-up. */
  y?: number;
} & HTMLMotionProps<"div">;

/**
 * Scroll-reveal leaf. Fades + lifts content as it enters the viewport, once.
 * Uses Motion's whileInView (IntersectionObserver under the hood) — never a
 * scroll listener — and collapses to static under prefers-reduced-motion.
 */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
