"use client";

import {
  Code,
  MagnifyingGlass,
  PenNib,
  RocketLaunch,
  ShieldCheck,
  Strategy,
  type Icon,
} from "@phosphor-icons/react";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";

type Step = { num: string; title: string; desc: string; Icon: Icon };

const steps: Step[] = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We clarify your goals, constraints, risks and the real business reason behind the project.",
    Icon: MagnifyingGlass,
  },
  {
    num: "02",
    title: "Strategy & Scope",
    desc: "We define the roadmap, feature priorities, timeline and exactly how we will deliver.",
    Icon: Strategy,
  },
  {
    num: "03",
    title: "Design Direction",
    desc: "We create the visual system, UX flows and conversion path before any development starts.",
    Icon: PenNib,
  },
  {
    num: "04",
    title: "Development",
    desc: "We build with clean architecture, responsive UI and production-ready foundations.",
    Icon: Code,
  },
  {
    num: "05",
    title: "Testing & Security Check",
    desc: "We review performance, accessibility, edge cases and the security basics that matter.",
    Icon: ShieldCheck,
  },
  {
    num: "06",
    title: "Launch & Support",
    desc: "We deploy, monitor and keep improving the product long after it goes live.",
    Icon: RocketLaunch,
  },
];

export function Process() {
  return (
    <Section id="process" surface="subtle" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-radial-glow opacity-40"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow dot className="justify-center">
            Process
          </Eyebrow>
          <Heading as={2} size="xl" className="mt-4">
            From idea to launch{" "}
            <span className="text-gradient">without chaos</span>.
          </Heading>
        </Reveal>

        <div className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={(i % 3) * 0.08}>
              <article className="group relative h-full rounded-card border border-border bg-card p-7 shadow-soft transition-all duration-300 ease-[var(--ease-quart)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-accent/70">
                  {s.num}
                </span>
                <span className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                  <s.Icon weight="light" className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>

                {/* Connector node bridging into the grid gap (desktop, not last
                    in a row). Sits at the card's vertical midline. */}
                {i % 3 !== 2 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-full top-1/2 z-10 hidden h-px w-5 -translate-y-1/2 items-center bg-gradient-to-r from-accent/50 to-accent/15 lg:flex"
                  >
                    <span className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-glow-sm" />
                  </span>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.1}
          className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow-sm"
          />
          Six focused steps. One shared goal: ship the right product without
          chaos.
        </Reveal>
      </Container>
    </Section>
  );
}
