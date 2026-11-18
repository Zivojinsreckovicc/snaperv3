"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { revealVariants, useScrollReveal } from "./use-scroll-reveal";

type RevealProps = {
  /** Seconds of delay, e.g. for staggering a list by index * 0.06. */
  delay?: number;
  /** Travel distance in px for the fade-up. */
  y?: number;
} & HTMLMotionProps<"div">;

/**
 * Scroll-reveal leaf. Fades + lifts content as it enters the viewport, once.
 * Server HTML is always visible: only content still below the fold after
 * hydration is hidden and revealed on scroll (see useScrollReveal), so slow
 * devices never sit on invisible sections while JavaScript loads.
 */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  const { ref, initial, animate } = useScrollReveal<HTMLDivElement>(0.25);

  return (
    <motion.div
      ref={ref}
      variants={revealVariants(
        { opacity: 0, y, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)" },
        { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
      )}
      initial={initial}
      animate={animate}
      {...props}
    >
      {children}
    </motion.div>
  );
}
