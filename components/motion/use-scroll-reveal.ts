"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  useInView,
  type Target,
  type Transition,
  type Variants,
} from "motion/react";

const noopSubscribe = () => () => {};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll-reveal state for a Motion element that never hides server-rendered
 * content.
 *
 * Motion's `initial` + `whileInView` writes `opacity:0` into the server HTML,
 * so the content stays invisible until React hydrates. On a slow phone that
 * can take several seconds. This hook instead:
 *
 * - renders server HTML fully visible;
 * - after hydration, hides only the elements that are still entirely below
 *   the viewport (the visitor can't see the switch), then reveals them as
 *   they scroll in;
 * - leaves anything already on screen alone;
 * - for elements first mounted on the client (soft navigation), where JS is
 *   already running, behaves like a plain `initial` + `whileInView`.
 *
 * Spread the result onto a motion element along with `revealVariants(...)`.
 */
export function useScrollReveal<T extends Element = HTMLDivElement>(
  amount = 0.25
) {
  const ref = useRef<T>(null);
  // Server snapshot (false) is used while hydrating, client snapshot after.
  const isClientRender = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  // Both decided once, on the first render.
  const [fromServer] = useState(() => !isClientRender);
  const [startHidden] = useState(
    () => !fromServer && !prefersReducedMotion()
  );
  const [hidden, setHidden] = useState(startHidden);
  const inView = useInView(ref, { once: true, amount });

  useEffect(() => {
    if (!fromServer || prefersReducedMotion()) return;
    const el = ref.current;
    if (el && el.getBoundingClientRect().top >= window.innerHeight) {
      // Off-screen, so hiding it now is invisible to the visitor.
      setHidden(true);
    }
  }, [fromServer]);

  return {
    ref,
    initial: startHidden ? ("hidden" as const) : false,
    animate: hidden && !inView ? ("hidden" as const) : ("visible" as const),
  };
}

/** Variants for `useScrollReveal`: hiding is instant, revealing animates. */
export function revealVariants(
  hidden: Target,
  visible: Target,
  transition: Transition
): Variants {
  return {
    hidden: { ...hidden, transition: { duration: 0 } },
    visible: { ...visible, transition },
  };
}
