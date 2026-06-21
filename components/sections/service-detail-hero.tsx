"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CaretRight } from "@phosphor-icons/react";
import { Badge, Container, GradientText, Heading, Lead } from "@/components/ui";
import { CtaLink } from "@/components/ui/cta-link";
import { contactCta } from "@/lib/site";
import type { ServiceContent } from "@/lib/services-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceDetailHero({
  service,
  visual,
}: {
  service: ServiceContent;
  visual: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <section className="relative overflow-hidden bg-grid pb-12 pt-32 sm:pb-16 sm:pt-40 lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[65vh] bg-radial-glow"
      />

      <Container className="relative">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={animate ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
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
        </motion.nav>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <motion.div
              initial={animate ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            >
              <Badge variant="muted">
                {service.num} · {service.kicker}
              </Badge>
            </motion.div>

            <motion.div
              initial={
                animate ? { opacity: 0, y: 18, filter: "blur(8px)" } : false
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            >
              <Heading as={1} size="xl" className="mt-5">
                <GradientText>{service.title}</GradientText>
              </Heading>
            </motion.div>

            <motion.div
              initial={animate ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            >
              <Lead className="mt-5">{service.intro}</Lead>
            </motion.div>

            <motion.div
              initial={animate ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
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
            </motion.div>

            {/* Tools */}
            <motion.ul
              initial={animate ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
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
            </motion.ul>
          </div>

          {/* Visual */}
          <motion.div
            initial={animate ? { opacity: 0, scale: 0.96, y: 20 } : false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            {visual}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
