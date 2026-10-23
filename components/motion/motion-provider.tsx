"use client";

import { MotionConfig } from "motion/react";

/**
 * Site-wide Motion defaults. reducedMotion="user" makes every transform and
 * layout animation instant when the visitor prefers reduced motion. Motion
 * reads the preference when an element mounts, not during render, so this
 * stays hydration-safe and covers elements rendered on the server.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
