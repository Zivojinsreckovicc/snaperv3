"use client";

import Link from "next/link";
import { Enter } from "@/components/motion/enter";
import { CaretRight } from "@phosphor-icons/react";
import { Container, Eyebrow, GradientText, Heading, Lead } from "@/components/ui";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-grid pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-radial-glow"
      />

      <Container className="relative">
        {/* Breadcrumb */}
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
          <span className="text-foreground">About</span>
        </Enter>

        <div className="max-w-3xl">
          <Enter
            y={12}
            duration={0.6}
            delay={0.05}
          >
            <Eyebrow>We make it like it&apos;s ours, because we care.</Eyebrow>
          </Enter>

          <Enter
            y={18}
            blur={8}
            duration={0.8}
            delay={0.12}
          >
            <Heading as={1} size="display" className="mt-4">
              A Web Development &amp;{" "}
              <GradientText>AI Automation Agency</GradientText>
            </Heading>
          </Enter>

          <Enter
            y={16}
            duration={0.8}
            delay={0.22}
          >
            <Lead className="mt-6">
              We&apos;re a small team, but we move fast and stay sharp. Every
              project feels personal, like we&apos;re building it for ourselves.
              No templates. No shortcuts. We take time to understand your story,
              choose solutions that make sense, and build something that
              doesn&apos;t just look good, but actually works. Our goal? To
              represent you the way you truly deserve.
            </Lead>
          </Enter>
        </div>
      </Container>
    </section>
  );
}
