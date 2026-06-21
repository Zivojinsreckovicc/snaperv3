"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Browsers,
  PaintBrush,
  Robot,
  RocketLaunch,
  Storefront,
  type Icon,
} from "@phosphor-icons/react";
import { Container, Heading, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { servicesContent } from "@/lib/services-data";

const iconById: Record<string, Icon> = {
  "web-development": Browsers,
  "ai-automation": Robot,
  branding: PaintBrush,
  "landing-pages": RocketLaunch,
  ecommerce: Storefront,
};

export function OtherServices({ currentSlug }: { currentSlug: string }) {
  const others = servicesContent.filter((s) => s.id !== currentSlug);

  return (
    <Section surface="subtle">
      <Container>
        <Reveal className="max-w-2xl">
          <Heading as={2} size="lg">
            Explore the rest of the stack.
          </Heading>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Most projects combine a few of these. They are built to work as one
            connected system.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {others.map((s, i) => {
            const Icon = iconById[s.id] ?? Browsers;
            return (
              <Reveal key={s.id} delay={(i % 2) * 0.07}>
                <Link
                  href={`/services/${s.id}`}
                  className="group flex items-center gap-4 rounded-card border border-border bg-card p-5 shadow-soft transition-all duration-300 ease-[var(--ease-quart)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                    <Icon weight="light" className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-base font-semibold tracking-tight text-foreground">
                      {s.kicker}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                      {s.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    weight="bold"
                    aria-hidden="true"
                    className="ml-auto h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
