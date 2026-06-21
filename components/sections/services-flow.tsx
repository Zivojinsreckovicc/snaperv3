"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Browsers,
  Check,
  PaintBrush,
  Robot,
  RocketLaunch,
  Storefront,
  type Icon,
} from "@phosphor-icons/react";
import {
  Container,
  Eyebrow,
  Heading,
  Lead,
  Section,
} from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { contactCta } from "@/lib/site";
import { servicesContent, type ServiceContent } from "@/lib/services-data";

type Service = ServiceContent;

/** Icons live here (client only), keyed to the plain content by id. */
const iconById: Record<string, Icon> = {
  "web-development": Browsers,
  "ai-automation": Robot,
  branding: PaintBrush,
  "landing-pages": RocketLaunch,
  ecommerce: Storefront,
};

const services = servicesContent;

/** Even, normalized Y centers (0-100) for the spine nodes and content rows. */
const nodeY = services.map((_, i) => ((i + 0.5) / services.length) * 100);

/**
 * Serpentine path drawn in a 0-100 x 0-100 normalized box (the SVG stretches to
 * fill via preserveAspectRatio="none"; non-scaling strokes keep it crisp). The
 * curve passes through x=50 at every node and bulges sideways between them, so
 * the centered glow nodes always sit exactly on the line.
 */
function buildSpine() {
  let d = `M 50 0 L 50 ${nodeY[0].toFixed(2)}`;
  for (let i = 0; i < nodeY.length - 1; i++) {
    const y0 = nodeY[i];
    const y1 = nodeY[i + 1];
    const bulge = i % 2 === 0 ? 34 : -34;
    const c1y = (y0 + (y1 - y0) * 0.35).toFixed(2);
    const c2y = (y0 + (y1 - y0) * 0.65).toFixed(2);
    d += ` C ${50 + bulge} ${c1y}, ${50 + bulge} ${c2y}, 50 ${y1.toFixed(2)}`;
  }
  d += ` L 50 100`;
  return d;
}

const SPINE_D = buildSpine();

/**
 * Reusable scroll-drawn curvy spine. Wraps a set of rows: draws the gradient
 * line as it scrolls into view, rides a glowing comet along the exact tip, and
 * pins glow nodes at each row center. Desktop gets the full curve; mobile / no
 * pointer falls back to a light left rail with dots. Shared by the full
 * services page and the compact home preview.
 */
function AnimatedSpine({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.7", "end 0.4"],
  });
  const draw = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.0005,
  });

  // Leading comet — follows the exact drawn tip via getPointAtLength.
  const cometX = useMotionValue(50);
  const cometY = useMotionValue(nodeY[0]);
  useMotionValueEvent(draw, "change", (p) => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const clamped = Math.max(0, Math.min(1, p));
    const pt = path.getPointAtLength(clamped * len);
    cometX.set(pt.x);
    cometY.set(pt.y);
  });
  const cometLeft = useMotionTemplate`${cometX}%`;
  const cometTop = useMotionTemplate`${cometY}%`;

  return (
    <div ref={wrapRef} className="relative">
      {/* Mobile: simple static gradient rail on the left. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent lg:hidden"
      />

      {/* Desktop: animated curvy spine */}
      {!reduce ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="spine-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand-cyan)" />
                <stop offset="50%" stopColor="var(--color-brand-violet)" />
                <stop offset="100%" stopColor="var(--color-brand-blue)" />
              </linearGradient>
            </defs>
            {/* Faint full track */}
            <path
              d={SPINE_D}
              stroke="var(--color-border-strong)"
              strokeWidth={2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={0.5}
            />
            {/* Scroll-drawn gradient line */}
            <motion.path
              ref={pathRef}
              d={SPINE_D}
              stroke="url(#spine-grad)"
              strokeWidth={2.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: draw }}
              className="[filter:drop-shadow(0_0_5px_color-mix(in_oklab,var(--color-accent)_70%,transparent))]"
            />
          </svg>

          {/* Leading comet */}
          <motion.span
            style={{ left: cometLeft, top: cometTop }}
            className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_4px_color-mix(in_oklab,var(--color-accent)_80%,transparent)]"
          />
        </div>
      ) : null}

      {/* Centered glow nodes on the spine (desktop) */}
      <div aria-hidden="true" className="absolute inset-0 z-10 hidden lg:block">
        {nodeY.map((y, i) => (
          <span
            key={i}
            className="absolute left-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/40 bg-background"
            style={{ top: `${y}%` }}
          >
            <span className="h-2 w-2 rounded-full bg-accent shadow-glow-sm" />
          </span>
        ))}
      </div>

      {/* Mobile node dots */}
      <div aria-hidden="true" className="absolute inset-0 z-10 lg:hidden">
        {nodeY.map((y, i) => (
          <span
            key={i}
            className="absolute left-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-glow-sm"
            style={{ top: `${y}%` }}
          />
        ))}
      </div>

      {/* Content rows */}
      <div className="relative z-10 pl-8 lg:pl-0">{children}</div>
    </div>
  );
}

/** Full, in-depth row used on the /services page. */
function ServiceRow({ service, index }: { service: Service; index: number }) {
  const reduce = useReducedMotion();
  const Icon = iconById[service.id] ?? Browsers;
  const contentLeft = index % 2 === 0;

  const content = (
    <div className="lg:px-12">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
          <Icon weight="light" className="h-6 w-6" />
        </span>
        <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">
          {service.num} · {service.kicker}
        </span>
      </div>

      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {service.title}
      </h3>
      <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
        {service.desc}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {service.tools.map((t) => (
          <span
            key={t}
            className="rounded-pill border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <Link
        href={`/services/${service.id}`}
        className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
      >
        Explore {service.kicker.toLowerCase()}
        <ArrowRight
          weight="bold"
          className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5"
        />
      </Link>
    </div>
  );

  const visual = (
    <div className="lg:px-12">
      <div className="ring-gradient relative overflow-hidden rounded-card p-6 shadow-soft sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl"
        />
        <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          What&apos;s included
        </p>
        <ul className="relative mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
          {service.deliverables.map((d) => (
            <li
              key={d}
              className="flex items-start gap-2.5 text-sm text-foreground"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                <Check weight="bold" className="h-2.5 w-2.5" />
              </span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div
      id={service.id}
      className="relative grid scroll-mt-28 items-center gap-8 py-10 lg:min-h-[24rem] lg:grid-cols-2 lg:gap-0 lg:py-0"
    >
      {/* Desktop: alternate content/visual across the central spine. */}
      <Reveal
        y={reduce ? 0 : 28}
        className={contentLeft ? "lg:order-1" : "lg:order-2"}
      >
        {content}
      </Reveal>
      <Reveal
        delay={0.1}
        y={reduce ? 0 : 28}
        className={contentLeft ? "lg:order-2" : "lg:order-1"}
      >
        {visual}
      </Reveal>
    </div>
  );
}

/** Compact, teaser row used on the home page preview. */
function ServicePreviewRow({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const reduce = useReducedMotion();
  const Icon = iconById[service.id] ?? Browsers;
  const contentLeft = index % 2 === 0;

  return (
    <div className="relative grid items-center gap-0 py-6 lg:min-h-[13rem] lg:grid-cols-2 lg:py-0">
      <Reveal
        y={reduce ? 0 : 24}
        className={contentLeft ? "lg:order-1 lg:pr-12" : "lg:order-2 lg:pl-12"}
      >
        <Link
          href={`/services/${service.id}`}
          className="group flex items-center gap-4 rounded-card border border-border bg-card p-5 shadow-soft transition-all duration-300 ease-[var(--ease-quart)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
            <Icon weight="light" className="h-6 w-6" />
          </span>
          <span className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent/80">
              {service.num} · {service.kicker}
            </span>
            <span className="mt-1 block font-display text-base font-semibold tracking-tight text-foreground">
              {service.title}
            </span>
          </span>
          <ArrowUpRight
            weight="bold"
            aria-hidden="true"
            className="ml-auto h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </Link>
      </Reveal>

      {/* Empty counter-cell so the spine has room to breathe (desktop). */}
      <div
        aria-hidden="true"
        className={contentLeft ? "hidden lg:order-2 lg:block" : "hidden lg:order-1 lg:block"}
      />
    </div>
  );
}

/** Full services experience — used on the /services page. */
export function ServicesFlow() {
  return (
    <section className="relative w-full bg-background py-12 sm:py-16 lg:py-20">
      <Container>
        <AnimatedSpine>
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </AnimatedSpine>

        {/* Single closing CTA (locked contact intent) */}
        <Reveal className="mt-12 flex justify-center">
          <CtaLink href={contactCta.href} size="lg">
            {contactCta.label}
          </CtaLink>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Compact preview — used on the home page in place of the old services grid.
 * Deliberately light on copy so visitors click through to the full /services
 * page for the depth.
 */
export function ServicesPreview() {
  return (
    <Section id="services" surface="default" className="overflow-hidden">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <Heading as={2} size="lg" className="mt-4">
            Everything you need to grow online.
          </Heading>
          <Lead className="mt-4">
            Five services, one partner, one connected system. Follow the line.
          </Lead>
        </Reveal>

        <div className="mt-12">
          <AnimatedSpine>
            {services.map((service, i) => (
              <ServicePreviewRow key={service.id} service={service} index={i} />
            ))}
          </AnimatedSpine>
        </div>

        <Reveal className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CtaLink href="/services" size="lg">
            Explore all services
          </CtaLink>
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See transparent pricing
            <ArrowRight
              weight="bold"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
