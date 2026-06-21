"use client";

import { CheckCircle } from "@phosphor-icons/react";
import { Container, Heading, Lead, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "./contact-form";

const assurances = [
  "A clear, fixed proposal — no open-ended hourly billing",
  "Honest scope mapped to the result you want",
  "A reply within one business day",
];

export function PricingCta() {
  return (
    <Section id="get-a-quote" surface="default" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-radial-glow opacity-70"
      />
      <Container className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Heading as={2} size="lg">
            Ready to get an exact price for your project?
          </Heading>
          <Lead className="mt-4">
            Share a bit about what you want to build and we&apos;ll send a clear,
            no-fluff proposal.
          </Lead>

          <ul className="mt-9 space-y-4">
            {assurances.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle
                  weight="fill"
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                />
                <span className="text-base text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </Container>
    </Section>
  );
}
