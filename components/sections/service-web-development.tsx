"use client";

import {
  Browsers,
  Gauge,
  PencilSimple,
  Target,
  type Icon,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui";
import { HomeSectionHeader } from "@/components/ui/home-section-heading";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/motion/reveal";
import { contactCta } from "@/lib/site";

const capabilities: { Icon: Icon; label: string }[] = [
  { Icon: Browsers, label: "Custom design, never a template" },
  { Icon: Gauge, label: "Built for speed and clean SEO" },
  { Icon: Target, label: "Structured around conversions" },
  { Icon: PencilSimple, label: "Easy to update, CMS-ready" },
];

export function ServiceWebDevelopment() {
  return (
    <section
      id="web-development"
      className="relative w-full bg-background-subtle text-foreground"
    >
      {/* Intro */}
      <Container className="pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16">
        <Reveal>
          <HomeSectionHeader
            eyebrow="Web Development"
            firstLine="Websites"
            outline="Engineered to"
            accent="convert."
          />
        </Reveal>
        <div className="mt-8 grid items-end gap-10 lg:mt-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              We design and build fast, modern sites with a clear job: turn
              visitors into customers.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {capabilities.map(({ Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
                    <Icon weight="light" className="h-5 w-5" />
                  </span>
                  <span className="text-sm leading-snug text-foreground">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>

      {/* Closing CTA */}
      <Container className="flex flex-col items-center justify-center gap-4 pb-24 text-center sm:flex-row sm:pb-28 lg:pb-32">
        <CtaLink href={contactCta.href} size="md">
          {contactCta.label}
        </CtaLink>
      </Container>
    </section>
  );
}
