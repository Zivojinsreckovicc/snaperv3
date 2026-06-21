"use client";

import dynamic from "next/dynamic";
import { useIsDesktop } from "@/components/hooks/use-is-desktop";

/* Heavy WebGL scene is code-split and only ever requested on desktop. */
const GlobeScene = dynamic(() => import("./globe-scene"), { ssr: false });

/**
 * Desktop-only interactive 3D Earth. Fills its parent, so the parent controls
 * size and how far it bleeds off-screen. Returns nothing on mobile/touch, so
 * three.js is never downloaded there.
 */
export function HeroGlobeScene() {
  const isDesktop = useIsDesktop();
  if (!isDesktop) return null;
  return <GlobeScene />;
}

/**
 * Lightweight, dependency-free fallback for phones / reduced hardware:
 * a CSS-only orbit graphic (no canvas, no WebGL). Carries the same
 * "global reach" idea as the 3D globe but costs almost nothing.
 */
export function HeroGlobeFallback() {
  const orbits = [
    { size: 78, dur: "26s", reverse: false },
    { size: 56, dur: "20s", reverse: true },
    { size: 34, dur: "14s", reverse: false },
  ];
  return (
    <div className="relative grid aspect-square w-full place-items-center">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-radial-glow opacity-60 blur-2xl" />
      {/* core */}
      <div className="absolute h-[26%] w-[26%] rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--color-brand-400),var(--color-brand-700))] shadow-glow" />
      {/* meridian rings */}
      <div className="absolute h-[52%] w-[52%] rounded-full border border-accent/25" />
      <div className="absolute h-[52%] w-[26%] rounded-[100%] border border-accent/15" />
      <div className="absolute h-[26%] w-[52%] rounded-[100%] border border-accent/15" />
      {/* orbiting client pulses */}
      {orbits.map((o, i) => (
        <div
          key={i}
          className="absolute motion-safe:animate-spin"
          style={{
            height: `${o.size}%`,
            width: `${o.size}%`,
            animationDuration: o.dur,
            animationDirection: o.reverse ? "reverse" : "normal",
          }}
        >
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-cyan shadow-[0_0_14px_var(--color-brand-cyan)]" />
        </div>
      ))}
    </div>
  );
}
