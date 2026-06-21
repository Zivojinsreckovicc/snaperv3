"use client";

import { Handshake, Lightning, Target, type Icon } from "@phosphor-icons/react";
import { Badge, Container, Heading, Lead, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";

const values: { Icon: Icon; title: string; body: string }[] = [
  {
    Icon: Target,
    title: "Purpose over profit",
    body: "We build things that matter. Every project should solve a real problem, not just fill a folder. If it doesn't add value to your business, we won't suggest it.",
  },
  {
    Icon: Lightning,
    title: "Speed & precision",
    body: "Fast doesn't mean sloppy. We move quickly because we know what works. No endless revisions, no scope creep, just efficient execution that gets you results.",
  },
  {
    Icon: Handshake,
    title: "Partnership mindset",
    body: "We're not just service providers, we're invested in your success. Your wins are our wins. That's why we stick around long after launch to help you grow.",
  },
];

export function AboutValues() {
  return (
    <Section id="values" surface="default">
      <Container>
        <Reveal className="max-w-2xl">
          <Badge variant="muted">Our values</Badge>
          <Heading as={2} size="lg" className="mt-5">
            What drives us every day.
          </Heading>
          <Lead className="mt-4">
            These aren&apos;t just words on a wall, they&apos;re how we work.
          </Lead>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <article className="group h-full rounded-card border border-border bg-card p-7 shadow-soft transition-all duration-300 ease-[var(--ease-quart)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon weight="light" className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
