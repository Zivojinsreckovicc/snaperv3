"use client";

import Link from "next/link";
import { Enter } from "@/components/motion/enter";
import { CaretRight } from "@phosphor-icons/react";
import { Container, Eyebrow, GradientText, Heading, Lead } from "@/components/ui";

const offerings = [
  "Web Development",
  "AI Automation",
  "Brand & Creative",
  "Landing Pages",
  "Headless Ecommerce",
];

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-grid pb-12 pt-32 sm:pb-16 sm:pt-40 lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-radial-glow"
      />

      <Container className="relative">
        <Enter
          as="nav"
          aria-label="Breadcrumb"
          y={12}
          duration={0.6}
          className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
          <span className="text-foreground">Services</span>
        </Enter>

        <div className="max-w-3xl">
          <Enter
            y={12}
            duration={0.6}
            delay={0.05}
          >
            <Eyebrow>Everything you need to grow online, under one roof.</Eyebrow>
          </Enter>

          <Enter
            y={18}
            blur={8}
            duration={0.8}
            delay={0.12}
          >
            <Heading as={1} size="display" className="mt-5">
              Web Development, AI Automation &amp;{" "}
              <GradientText>Digital Services</GradientText>
            </Heading>
          </Enter>

          <Enter
            y={16}
            duration={0.8}
            delay={0.22}
          >
            <Lead className="mt-6">
              From the first pixel to the systems running quietly in the
              background, we design, build and automate the digital foundation
              your business runs on. One focused partner, the whole stack.
            </Lead>
          </Enter>

          <Enter
            as="ul"
            y={16}
            duration={0.8}
            delay={0.32}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {offerings.map((o) => (
              <li
                key={o}
                className="rounded-pill border border-border bg-card/60 px-3.5 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
              >
                {o}
              </li>
            ))}
          </Enter>
        </div>
      </Container>
    </section>
  );
}
