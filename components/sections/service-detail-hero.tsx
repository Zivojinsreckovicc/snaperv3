"use client";

import Link from "next/link";
import { Enter } from "@/components/motion/enter";
import { ArrowRight, CaretRight } from "@phosphor-icons/react";
import { Container, Eyebrow, GradientText, Heading, Lead } from "@/components/ui";
import { CtaLink } from "@/components/ui/cta-link";
import { contactCta } from "@/lib/site";
import type { ServiceContent } from "@/lib/services-data";

export function ServiceDetailHero({
  service,
  visual,
}: {
  service: ServiceContent;
  visual: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-grid pb-12 pt-32 sm:pb-16 sm:pt-40 lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[65vh] bg-radial-glow"
      />

      <Container className="relative">
        {/* Breadcrumb */}
        <Enter
          as="nav"
          aria-label="Breadcrumb"
          y={12}
          duration={0.6}
          className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
          <Link
            href="/services"
            className="transition-colors hover:text-foreground"
          >
            Services
          </Link>
          <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
          <span className="text-foreground">{service.kicker}</span>
        </Enter>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <Enter
              y={12}
              duration={0.6}
              delay={0.05}
            >
              <Eyebrow>{service.title}</Eyebrow>
            </Enter>

            <Enter
              y={18}
              blur={8}
              duration={0.8}
              delay={0.12}
            >
              <Heading as={1} size="xl" className="mt-5">
                <GradientText>{service.seoHeading}</GradientText>
              </Heading>
            </Enter>

            <Enter
              y={16}
              duration={0.8}
              delay={0.22}
            >
              <Lead className="mt-5">{service.intro}</Lead>
            </Enter>

            <Enter
              y={16}
              duration={0.8}
              delay={0.32}
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
            >
              <CtaLink href={contactCta.href} size="lg">
                {contactCta.label}
              </CtaLink>
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                See pricing
                <ArrowRight
                  weight="bold"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </Enter>

            {/* Tools */}
            <Enter
              as="ul"
              y={16}
              duration={0.8}
              delay={0.4}
              className="mt-8 flex flex-wrap gap-2"
            >
              {service.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-pill border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                >
                  {t}
                </li>
              ))}
            </Enter>
          </div>

          {/* Visual */}
          <Enter
            y={20}
            scale={0.96}
            duration={0.9}
            delay={0.2}
          >
            {visual}
          </Enter>
        </div>
      </Container>
    </section>
  );
}
