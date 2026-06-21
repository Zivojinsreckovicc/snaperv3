"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CaretRight } from "@phosphor-icons/react";
import { Container, Eyebrow, GradientText, Heading, Lead } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AboutHero() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <section className="relative overflow-hidden bg-grid pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-radial-glow"
      />

      <Container className="relative">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={animate ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
          <span className="text-foreground">About</span>
        </motion.nav>

        <div className="max-w-3xl">
          <motion.div
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            <Eyebrow>The story</Eyebrow>
          </motion.div>

          <motion.div
            initial={animate ? { opacity: 0, y: 18, filter: "blur(8px)" } : false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
          >
            <Heading as={1} size="display" className="mt-4">
              We make it like it&apos;s ours,{" "}
              <GradientText>because we care.</GradientText>
            </Heading>
          </motion.div>

          <motion.div
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          >
            <Lead className="mt-6">
              We&apos;re a small team, but we move fast and stay sharp. Every
              project feels personal, like we&apos;re building it for ourselves.
              No templates. No shortcuts. We take time to understand your story,
              choose solutions that make sense, and build something that
              doesn&apos;t just look good, but actually works. Our goal? To
              represent you the way you truly deserve.
            </Lead>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
