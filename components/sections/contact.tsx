"use client";

import { Clock, EnvelopeSimple, MapPin, type Icon } from "@phosphor-icons/react";
import { Container, Eyebrow, Heading, Lead, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/site";

const details: { Icon: Icon; label: string; value: string; href?: string }[] = [
  {
    Icon: EnvelopeSimple,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  { Icon: MapPin, label: "Based in", value: siteConfig.location },
  { Icon: Clock, label: "Response time", value: "Within 1 business day" },
];

export function Contact({ subject }: { subject?: string }) {
  return (
    <Section id="contact" surface="default" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-radial-glow opacity-70"
      />
      <Container className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Info */}
        <Reveal>
          <Eyebrow>Get in touch</Eyebrow>
          <Heading as={2} size="lg" className="mt-4">
            Let&apos;s build something that grows your business.
          </Heading>
          <Lead className="mt-4">
            Tell us what you&apos;re working on. We&apos;ll reply with clear next
            steps, not a sales script.
          </Lead>

          <ul className="mt-9 space-y-5">
            {details.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-accent">
                  <Icon weight="light" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-medium text-muted-foreground">
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="text-base font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-base font-medium text-foreground">
                      {value}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <ContactForm subject={subject} />
        </Reveal>
      </Container>
    </Section>
  );
}
