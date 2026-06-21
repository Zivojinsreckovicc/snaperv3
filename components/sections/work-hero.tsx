"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CaretRight, Sparkle } from "@phosphor-icons/react";
import { Container, GradientText, Heading, Lead } from "@/components/ui";
import { Rating } from "@/components/ui/rating";
import { CountUp } from "@/components/motion/count-up";
import { useIsDesktop } from "@/components/hooks/use-is-desktop";

type Stat = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

const stats: Stat[] = [
  { to: 40, suffix: "+", label: "Projects shipped" },
  { to: 4.9, decimals: 1, label: "Average client rating" },
  { to: 98, suffix: "%", label: "Would work with us again" },
  { to: 12, suffix: "+", label: "Industries served" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function WorkHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();

  // Pointer-following spotlight — desktop only, pure CSS-var writes (no React
  // re-render per frame), so it stays cheap and never ships to touch devices.
  function handlePointer(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDesktop) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  const animate = !reduce;

  return (
    <section
      ref={ref}
      onPointerMove={handlePointer}
      className="relative overflow-hidden bg-grid pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24"
    >
      {/* Base ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[65vh] bg-radial-glow"
      />
      {/* Cursor spotlight (desktop) */}
      {isDesktop ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 transition-opacity"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 65%)",
          }}
        />
      ) : null}

      <Container className="relative">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={animate ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
          <span className="text-foreground">Work</span>
        </motion.nav>

        <div className="max-w-3xl">
          {/* Trust chip */}
          <motion.div
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-pill border border-border/70 bg-card/60 py-1.5 pl-3 pr-4 text-sm backdrop-blur-sm"
          >
            <Sparkle weight="fill" className="h-4 w-4 text-accent" />
            <Rating value={4.9} size={14} />
            <span className="text-muted-foreground">
              Rated 4.9/5 by 30+ clients
            </span>
          </motion.div>

          <motion.div
            initial={animate ? { opacity: 0, y: 18, filter: "blur(8px)" } : false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
          >
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Selected Work
            </p>
            <Heading as={1} size="display" className="mt-4">
              Work that doesn&apos;t just look good.{" "}
              <GradientText>It performs.</GradientText>
            </Heading>
          </motion.div>

          <motion.div
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          >
            <Lead className="mt-6">
              A selection of websites and systems we&apos;ve designed, built and
              shipped. Each one is engineered around a single goal: real,
              measurable results for the business behind it.
            </Lead>
          </motion.div>
        </div>

        {/* Animated stat strip */}
        <motion.dl
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-5 sm:p-6">
              <dd className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                <CountUp
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </dd>
              <dt className="mt-1.5 text-sm text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
