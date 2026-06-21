"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only on wider, pointer-capable screens once mounted on the
 * client. Used to gate heavy WebGL / canvas visuals so mobile devices never
 * pay for them. SSR-safe: starts `false`, so the lightweight fallback renders
 * first and the heavy scene is opted into only after a real measurement.
 */
export function useIsDesktop(minWidth = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      `(min-width: ${minWidth}px) and (pointer: fine)`
    );
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [minWidth]);

  return isDesktop;
}
