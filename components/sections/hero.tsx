"use client";

import { motion, useReducedMotion } from "motion/react";
import { Globe, TrendUp } from "@phosphor-icons/react";
import { Container, GradientText } from "@/components/ui";
import { CtaLink } from "@/components/ui/cta-link";
import { HeroGlobeScene, HeroGlobeFallback } from "@/components/visuals/hero-globe";
import { contactCta } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

/* Small floating glass stat, drifting gently over the visible globe (desktop only). */
function FloatChip({
  className,
  icon,
  title,
  value,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`pointer-events-auto absolute z-10 ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={
        reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }
      }
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <div className="glass flex items-center gap-3 rounded-2xl border border-border/70 px-4 py-3 shadow-glow">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
          {icon}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-foreground">
            {value}
          </span>
          <span className="block text-xs text-muted-foreground">{title}</span>
        </span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-grid">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-radial-glow"
      />

      {/* Visual: oversized interactive 3D Earth, anchored to the right edge and
          deliberately bleeding off-screen (clipped by the section). Desktop only.

          The globe lives inside a centered max-width frame rather than the raw
          viewport. Up to 1536px the frame equals the viewport, so laptop/tablet
          are unchanged; beyond that the frame caps and centers, so the globe
          keeps tracking the content frame instead of drifting to the far edge
          on ultra-wide (2K+) screens. Sizing is frame-relative (58%) so it
          matches the laptop composition exactly. */}
      <div className="absolute inset-y-0 left-1/2 z-0 hidden w-full max-w-[1536px] -translate-x-1/2 lg:block">
        <div className="absolute inset-y-0 right-0 w-[58%] max-w-[60rem] translate-x-[12%]">
          {/* No CSS glow box here on purpose — the 3D scene renders its own
              circular atmosphere halo. A rectangular blurred glow div reads as
              a square "container" around the globe. */}
          <HeroGlobeScene />
          <FloatChip
            className="left-[2%] top-[26%]"
            icon={<Globe weight="light" className="h-5 w-5" />}
            value="Worldwide"
            title="Remote delivery"
            delay={0.7}
          />
          <FloatChip
            className="left-[7%] bottom-[24%]"
            icon={<TrendUp weight="bold" className="h-5 w-5" />}
            value="+312% leads"
            title="Avg. client growth"
            delay={1.1}
          />
        </div>
      </div>

      <Container className="pointer-events-none relative z-10 flex min-h-[100dvh] flex-col justify-center pb-20 pt-28 lg:pt-24">
        {/* Copy */}
        <div className="pointer-events-auto max-w-xl">
          <motion.span
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent"
          >
            Web design &amp; AI automation
          </motion.span>

          <motion.h1
            {...rise(0.08)}
            className="mt-6 font-display text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-balance text-foreground"
          >
            Websites and automation built to{" "}
            <GradientText>grow your business</GradientText>.
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            We design conversion-focused sites and automation systems that bring
            in more leads and cut the busywork that slows you down.
          </motion.p>

          <motion.div
            {...rise(0.24)}
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <CtaLink href={contactCta.href} size="lg">
              {contactCta.label}
            </CtaLink>
            <CtaLink href="/#services" variant="outline" size="lg">
              Explore services
            </CtaLink>
          </motion.div>

          <motion.div
            {...rise(0.32)}
            className="mt-9 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <Globe weight="light" className="h-5 w-5 text-accent" />
            <span>
              Trusted by businesses in{" "}
              <span className="font-medium text-foreground">12+ countries</span>
            </span>
          </motion.div>
        </div>

        {/* Mobile / touch: lightweight CSS orbit fallback in normal flow */}
        <motion.div
          {...rise(0.2)}
          className="pointer-events-auto mx-auto mt-14 w-full max-w-xs lg:hidden"
        >
          <HeroGlobeFallback />
        </motion.div>
      </Container>
    </section>
  );
}
