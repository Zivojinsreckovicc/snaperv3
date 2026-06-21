"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  Browsers,
  Gauge,
  PencilSimple,
  Target,
  type Icon,
} from "@phosphor-icons/react";
import { Badge, Container, Heading } from "@/components/ui";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/motion/reveal";
import { useIsDesktop } from "@/components/hooks/use-is-desktop";
import { contactCta } from "@/lib/site";
import { projects, type Project } from "@/lib/projects";

const capabilities: { Icon: Icon; label: string }[] = [
  { Icon: Browsers, label: "Custom design, never a template" },
  { Icon: Gauge, label: "Built for speed and clean SEO" },
  { Icon: Target, label: "Structured around conversions" },
  { Icon: PencilSimple, label: "Easy to update, CMS-ready" },
];

/** A single project screenshot card, shared by both layouts. */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="group flex w-[82vw] shrink-0 snap-center flex-col gap-5 sm:w-[58vw] lg:w-[clamp(28rem,42vw,46rem)]">
      <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-radial-glow opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
        />
        <BrowserFrame
          src={project.src}
          alt={`${project.title} — a website built by Snaper Digital`}
          url={project.url}
          aspect="aspect-[16/10]"
          sizes="(min-width: 1024px) 44vw, 82vw"
        />
      </div>
      <div className="flex items-start justify-between gap-4 px-1">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {String(index + 1).padStart(2, "0")} · {project.category}
          </span>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {project.blurb}
          </p>
        </div>
      </div>
    </article>
  );
}

/** Eyebrow + title that sits directly above the project track. */
function GalleryHeader({ pinned }: { pinned: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <div>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Selected Work
        </span>
        <Heading as={3} size="md" className="mt-2">
          Recent projects we&rsquo;ve shipped.
        </Heading>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <span>{pinned ? "Scroll to explore" : "Swipe to explore"}</span>
        <ArrowRight weight="bold" className="h-4 w-4 text-accent" />
      </div>
    </div>
  );
}

/**
 * Desktop-only experience: the section pins while the user scrolls, and that
 * vertical scroll is translated into horizontal movement through the projects.
 * Heavy scroll-linked motion is gated to wide, pointer-fine screens; mobile
 * gets a native swipe carousel instead (see ServiceWebDevelopment).
 */
function PinnedGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ range: 0, height: 0 });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const range = Math.max(0, track.scrollWidth - window.innerWidth);
      setDims({ range, height: range + window.innerHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    // Re-measure once the screenshots have loaded and laid the track out.
    const t = window.setTimeout(measure, 300);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -dims.range]);
  const x = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.4 });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={targetRef} style={{ height: dims.height || undefined }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-[12vh]">
        <Container>
          <GalleryHeader pinned />
        </Container>

        <div className="flex flex-1 flex-col justify-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-center gap-10 px-[6vw] will-change-transform"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.url} project={project} index={i} />
            ))}
          </motion.div>

          {/* Scroll progress rail */}
          <div className="mx-auto mt-10 h-px w-[min(28rem,70vw)] overflow-hidden rounded-full bg-border-strong/60">
            <motion.div
              style={{ width: progress }}
              className="h-full rounded-full bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile / reduced-motion fallback: a lightweight native swipe carousel. */
function SwipeGallery() {
  return (
    <div>
      <Container>
        <GalleryHeader pinned={false} />
      </Container>
      <div className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project, i) => (
          <ProjectCard key={project.url} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

export function ServiceWebDevelopment() {
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();
  const pinned = isDesktop && !reduce;

  return (
    <section
      id="web-development"
      className="relative w-full bg-background-subtle text-foreground"
    >
      {/* Intro */}
      <Container className="pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Badge variant="muted">Web Development</Badge>
            <Heading as={2} size="lg" className="mt-5">
              Websites engineered to convert.
            </Heading>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              We design and build fast, modern sites with a clear job: turn
              visitors into customers. {pinned ? "Scroll" : "Swipe"} through
              recent work below.
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

      {/* Interactive project gallery */}
      {pinned ? (
        <PinnedGallery />
      ) : (
        <div className="pb-20 sm:pb-24">
          <SwipeGallery />
        </div>
      )}

      {/* Closing CTA */}
      <Container className="flex flex-col items-center justify-center gap-4 pb-24 text-center sm:flex-row sm:pb-28 lg:pb-32">
        <CtaLink href="/work" variant="outline" size="md">
          View all work
        </CtaLink>
        <CtaLink href={contactCta.href} size="md">
          {contactCta.label}
        </CtaLink>
      </Container>
    </section>
  );
}
