"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * Hydration-safe replacement for Motion's useReducedMotion. Motion's hook
 * returns the real preference on the client's first render, so markup that
 * branches on it differs from the server HTML and React throws a hydration
 * error for every reduced-motion visitor. This returns `false` while
 * hydrating (matching the server) and then re-renders with the real value,
 * and also follows the setting if it changes mid-visit.
 *
 * Mount-only props (`initial`) can't react to that re-render, so the root
 * MotionProvider sets reducedMotion="user" to make transform and layout
 * animations instant for these visitors.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
