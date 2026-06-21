"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CaretRight } from "@phosphor-icons/react";
import { Badge, Container, GradientText, Heading, Lead } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const offerings = [
  "Web Development",
  "AI Automation",
  "Brand & Creative",
  "Landing Pages",
  "Headless Ecommerce",
];

export function ServicesHero() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <section className="relative overflow-hidden bg-grid pb-12 pt-32 sm:pb-16 sm:pt-40 lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-radial-glow"
      />

      <Container className="relative">
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
          <span className="text-foreground">Services</span>
        </motion.nav>

        <div className="max-w-3xl">
          <motion.div
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            <Badge variant="muted">Services</Badge>
          </motion.div>

          <motion.div
            initial={animate ? { opacity: 0, y: 18, filter: "blur(8px)" } : false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
          >
            <Heading as={1} size="display" className="mt-5">
              Everything you need to{" "}
              <GradientText>grow online</GradientText>, under one roof.
            </Heading>
          </motion.div>

          <motion.div
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          >
            <Lead className="mt-6">
              From the first pixel to the systems running quietly in the
              background, we design, build and automate the digital foundation
              your business runs on. One focused partner, the whole stack.
            </Lead>
          </motion.div>

          <motion.ul
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
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
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
