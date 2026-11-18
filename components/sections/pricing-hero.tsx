"use client";

import Link from "next/link";
import { Enter } from "@/components/motion/enter";
import {
  CaretRight,
  Gauge,
  StackSimple,
  Target,
  Lightning,
  type Icon,
} from "@phosphor-icons/react";
import { Container, GradientText, Heading, Lead } from "@/components/ui";

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
  return (
    <section className="relative overflow-hidden bg-grid pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-radial-glow"
      />

      <Container className="relative">
        {/* Breadcrumb */}
        <Enter
          as="nav"
          aria-label="Breadcrumb"
          y={12}
          duration={0.6}
          className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
          <span className="text-foreground">Pricing</span>
        </Enter>

        <div className="max-w-3xl">
          <Enter
            as="p"
            y={12}
            duration={0.6}
            delay={0.05}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-accent"
          >
            Pricing built around outcomes, not inflated scope.
          </Enter>

          <Enter
            y={18}
            blur={8}
            duration={0.8}
            delay={0.12}
          >
            <Heading as={1} size="display" className="mt-4">
              Website Design &amp; AI Automation{" "}
              <GradientText>Pricing</GradientText>
            </Heading>
          </Enter>

          <Enter
            y={16}
            duration={0.8}
            delay={0.22}
          >
            <Lead className="mt-6">
              Real-world ranges from shipped projects. Final investment depends
              on complexity, integrations, and delivery velocity.
            </Lead>
          </Enter>
        </div>

        {/* Value pillars */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ Icon, title, body }, i) => (
            <Enter
              key={title}
              y={20}
              duration={0.7}
              delay={0.32 + i * 0.07}
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
            </Enter>
          ))}
        </div>
      </Container>
    </section>
  );
}
