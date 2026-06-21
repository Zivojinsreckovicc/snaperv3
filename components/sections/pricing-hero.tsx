"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  CaretRight,
  Gauge,
  StackSimple,
  Target,
  Lightning,
  type Icon,
} from "@phosphor-icons/react";
import { Container, GradientText, Heading, Lead } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const pillars: { Icon: Icon; title: string; body: string }[] = [
  {
    Icon: Target,
    title: "Conversion clarity",
    body: "Every page priced around the action it should drive.",
  },
  {
    Icon: Gauge,
    title: "Performance baseline",
    body: "Fast, clean builds are the floor, never an upsell.",
  },
  {
    Icon: Lightning,
    title: "Automation potential",
    body: "Scope that leaves room to automate the busywork.",
  },
  {
    Icon: StackSimple,
    title: "Scale-ready architecture",
    body: "Built to grow without a costly rebuild later.",
  },
];

export function PricingHero() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <section className="relative overflow-hidden bg-grid pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-radial-glow"
      />

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
          <span className="text-foreground">Pricing</span>
        </motion.nav>

        <div className="max-w-3xl">
          <motion.p
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-accent"
          >
            Transparent pricing
          </motion.p>

          <motion.div
            initial={animate ? { opacity: 0, y: 18, filter: "blur(8px)" } : false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
          >
            <Heading as={1} size="display" className="mt-4">
              Pricing built around outcomes,{" "}
              <GradientText>not inflated scope.</GradientText>
            </Heading>
          </motion.div>

          <motion.div
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          >
            <Lead className="mt-6">
              Real-world ranges from shipped projects. Final investment depends
              on complexity, integrations, and delivery velocity.
            </Lead>
          </motion.div>
        </div>

        {/* Value pillars */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={animate ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 + i * 0.07, ease: EASE }}
              className="group rounded-card border border-border bg-card p-5 shadow-soft transition-colors hover:border-border-strong"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                <Icon weight="light" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-base font-semibold text-foreground">
                {title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
