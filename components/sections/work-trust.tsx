"use client";

import { motion, useReducedMotion } from "motion/react";
import { Quotes, SealCheck } from "@phosphor-icons/react";
import { Container, Heading } from "@/components/ui";
import { Rating } from "@/components/ui/rating";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";

const EASE = [0.16, 1, 0.3, 1] as const;

// Rating distribution — placeholder figures; replace with real review data
// before launch.
const distribution = [
  { stars: 5, pct: 92 },
  { stars: 4, pct: 7 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

const platforms = [
  { name: "Google", value: 5.0 },
  { name: "Clutch", value: 4.9 },
  { name: "Upwork", value: 5.0 },
];

// Featured, longer-form testimonials with explicit star ratings. Placeholder
// quotes — swap for real, approved client quotes before launch.
const featured = [
  {
    quote:
      "They rebuilt our website and qualified leads nearly doubled in two months. The site finally works the way our sales team needs it to.",
    name: "Marko Jovanovic",
    role: "Founder, Helvetic",
    initials: "MJ",
    rating: 5,
  },
  {
    quote:
      "Clear communication, fast delivery, and a site that finally looks premium. Exactly the kind of partner we were looking for.",
    name: "Daniel Roth",
    role: "Director, Akademia Pro",
    initials: "DR",
    rating: 5,
  },
  {
    quote:
      "Our conversion rate jumped the week we launched. The new pages are sharp, fast, and built around what actually drives sales.",
    name: "Sofia Markovic",
    role: "CMO, Dominion Europe",
    initials: "SM",
    rating: 5,
  },
];

function DistributionBar({
  stars,
  pct,
  delay,
}: {
  stars: number;
  pct: number;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-3">
      <span className="w-3 text-right text-xs font-medium text-muted-foreground">
        {stars}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay, ease: EASE }}
          className="h-full rounded-full [background-image:linear-gradient(90deg,var(--color-brand-violet),var(--color-brand-blue))]"
        />
      </div>
      <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">
        {pct}%
      </span>
    </div>
  );
}

export function WorkTrust() {
  return (
    <section className="relative w-full overflow-hidden bg-background-subtle py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-radial-glow opacity-60"
      />
      <Container className="relative">
        <Reveal className="max-w-2xl">
          <Heading as={2} size="lg">
            Rated for results, not just looks.
          </Heading>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Founders rate the work on one thing: whether it moved their business.
            Here&apos;s how that adds up.
          </p>
        </Reveal>

        {/* Score + distribution + platforms */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Aggregate score card */}
          <Reveal>
            <div className="ring-gradient flex h-full flex-col justify-center rounded-card p-8 text-center shadow-soft">
              <div className="font-display text-6xl font-semibold tracking-tight text-foreground">
                <CountUp to={4.9} decimals={1} />
              </div>
              <div className="mt-3 flex justify-center">
                <Rating value={4.9} size={22} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Average rating across{" "}
                <span className="font-medium text-foreground">30+ projects</span>
              </p>
            </div>
          </Reveal>

          {/* Distribution + platform badges */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-7 rounded-card border border-border bg-card p-8 shadow-soft">
              <div className="space-y-2.5">
                {distribution.map((d, i) => (
                  <DistributionBar
                    key={d.stars}
                    stars={d.stars}
                    pct={d.pct}
                    delay={i * 0.08}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-border pt-6">
                {platforms.map((p) => (
                  <div key={p.name} className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-sm font-semibold text-foreground">
                        {p.value.toFixed(1)}
                      </span>
                      <Rating value={p.value} size={12} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Featured testimonials with ratings */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.name} delay={0.05 * i}>
              <figure className="relative flex h-full flex-col rounded-card border border-border bg-card p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <Quotes
                  weight="fill"
                  aria-hidden="true"
                  className="h-7 w-7 text-accent/30"
                />
                <Rating value={t.rating} size={15} className="mt-4" />
                <blockquote className="mt-4 flex-1 text-pretty text-[0.95rem] leading-relaxed text-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 font-display text-sm font-semibold text-accent">
                    {t.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      {t.name}
                      <SealCheck
                        weight="fill"
                        aria-label="Verified client"
                        className="h-3.5 w-3.5 text-accent"
                      />
                    </span>
                    <span className="block truncate text-sm text-muted-foreground">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
