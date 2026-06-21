"use client";

import {
  FlowArrow,
  Funnel,
  PuzzlePiece,
  Robot,
  type Icon,
} from "@phosphor-icons/react";
import { Badge, Container, Heading, Lead, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { GrowthChart } from "@/components/visuals/growth-chart";

const features: { Icon: Icon; title: string; desc: string }[] = [
  {
    Icon: FlowArrow,
    title: "Workflow automation",
    desc: "Connect your tools so routine tasks run themselves.",
  },
  {
    Icon: Funnel,
    title: "Lead handling & CRM",
    desc: "Capture, route and follow up with leads automatically.",
  },
  {
    Icon: Robot,
    title: "AI-assisted processes",
    desc: "Put AI on the repetitive, rules-based work.",
  },
  {
    Icon: PuzzlePiece,
    title: "Integrations",
    desc: "Make the tools you already use talk to each other.",
  },
];

export function ServiceAiAutomation() {
  return (
    <Section id="ai-automation" surface="default">
      <Container>
        <Reveal className="max-w-2xl">
          <Badge variant="muted">AI Automation</Badge>
          <Heading as={2} size="lg" className="mt-5">
            Automate the work that slows you down.
          </Heading>
          <Lead className="mt-4">
            We map the repetitive parts of your business and hand them to
            systems that never forget a follow-up.
          </Lead>
        </Reveal>

        {/* Result, drawn live */}
        <Reveal delay={0.1} className="mt-12">
          <figure className="relative mx-auto max-w-3xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-3/4 -translate-y-1/2 bg-radial-glow opacity-50 blur-2xl"
            />
            <GrowthChart />
            <figcaption className="mt-5 text-center text-sm text-muted-foreground">
              The kind of growth clients see after we automate their lead
              capture and follow-up.
            </figcaption>
          </figure>
        </Reveal>

        {/* Capabilities, plain layout */}
        <div className="mt-14 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
          {features.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.07} className="lg:px-7 lg:first:pl-0">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                <Icon weight="light" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
