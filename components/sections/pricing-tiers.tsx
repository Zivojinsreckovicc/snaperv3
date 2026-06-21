"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Clock } from "@phosphor-icons/react";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { contactCta } from "@/lib/site";
import { pricingTiers, type PricingTier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function TierCard({ tier, index }: { tier: PricingTier; index: number }) {
  const reduce = useReducedMotion();
  const featured = tier.featured;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className={cn(
        "group relative flex h-full flex-col rounded-card p-6 shadow-soft transition-transform duration-300 sm:p-7",
        featured
          ? "ring-gradient shadow-glow lg:-translate-y-3 hover:lg:-translate-y-4"
          : "border border-border bg-card hover:-translate-y-1"
      )}
    >
      {featured ? (
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white [background-image:linear-gradient(180deg,var(--color-brand-500),var(--color-brand-700))] shadow-glow-sm">
          Most popular
        </span>
      ) : null}

      <h3 className="font-display text-lg font-semibold text-foreground">
        {tier.name}
      </h3>
      <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-muted-foreground">
        {tier.summary}
      </p>

      {/* Price */}
      <div className="mt-5 flex items-end gap-1.5">
        <span className="font-display text-4xl font-semibold tracking-tight text-foreground">
          {tier.priceFrom}
        </span>
        <span className="pb-1.5 text-sm text-muted-foreground">
          – {tier.priceTo}
          {tier.priceSuffix}
        </span>
      </div>

      {/* Delivery */}
      <div className="mt-3 inline-flex items-center gap-1.5 self-start rounded-pill border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
        <Clock weight="bold" className="h-3.5 w-3.5 text-accent" />
        {tier.delivery}
      </div>

      {/* Features */}
      <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
              <Check weight="bold" className="h-2.5 w-2.5" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={contactCta.href}
        className={cn(
          "group/cta mt-7 inline-flex items-center justify-between gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ease-[var(--ease-spring)] active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          featured
            ? "text-white shadow-glow-sm hover:shadow-glow [background-image:linear-gradient(180deg,var(--color-brand-500),var(--color-brand-700))]"
            : "border border-border-strong text-foreground hover:border-accent hover:text-accent"
        )}
      >
        {tier.cta}
        <ArrowUpRight
          weight="bold"
          className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spring)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
        />
      </Link>
    </motion.div>
  );
}

export function PricingTiers() {
  return (
    <section id="pricing-plans" className="relative w-full bg-background-subtle py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            These are typical ranges, not final quotes. We confirm exact pricing
            after a short call about your project.
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier, i) => (
            <TierCard key={tier.slug} tier={tier} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
