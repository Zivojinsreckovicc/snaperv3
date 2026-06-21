"use client";

import {
  Eye,
  Handshake,
  RocketLaunch,
  Robot,
  Target,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import { Badge, Container, Heading, Lead, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";

const reasons: { Icon: Icon; title: string; body: string }[] = [
  {
    Icon: UsersThree,
    title: "No project managers, no confusion",
    body: "You talk directly to the people building your project. Faster decisions, clearer communication, better results.",
  },
  {
    Icon: Target,
    title: "Results-focused, not feature-focused",
    body: "We don't add bells and whistles just because we can. Every element serves a purpose: to drive action and grow your business.",
  },
  {
    Icon: RocketLaunch,
    title: "Built for speed and scale",
    body: "Fast loading times, mobile-optimized, SEO-ready. Your site won't slow down as you grow, it'll grow with you.",
  },
  {
    Icon: Robot,
    title: "Automation that actually works",
    body: "We don't just integrate AI because it's trendy. We build smart systems that handle the repetitive stuff so you can focus on growth.",
  },
  {
    Icon: Handshake,
    title: "Long-term partnership",
    body: "We don't disappear after launch. Need updates? Have questions? Want to expand? We're here for the long haul.",
  },
  {
    Icon: Eye,
    title: "Transparent process",
    body: "No hidden fees, no surprise costs, no confusing jargon. We explain everything in plain English and stick to our agreements.",
  },
];

export function AboutWhy() {
  return (
    <Section id="why-snaper" surface="default">
      <Container>
        <Reveal className="max-w-2xl">
          <Badge variant="muted">Why choose Snaper</Badge>
          <Heading as={2} size="lg" className="mt-5">
            What makes us different.
          </Heading>
          <Lead className="mt-4">
            You have options. Here&apos;s why businesses choose us over everyone
            else.
          </Lead>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.07}>
              <article className="group flex h-full gap-4 rounded-card border border-border bg-card p-6 shadow-soft transition-all duration-300 ease-[var(--ease-quart)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon weight="light" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
