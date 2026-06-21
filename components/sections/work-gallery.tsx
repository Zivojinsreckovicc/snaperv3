"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowUpRight, TrendUp } from "@phosphor-icons/react";
import { Container, Heading } from "@/components/ui";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { Reveal } from "@/components/motion/reveal";
import { useIsDesktop } from "@/components/hooks/use-is-desktop";
import { projects, projectCategories, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const filters = ["All", ...projectCategories] as const;
type Filter = (typeof filters)[number];

/**
 * Adds a pointer-driven 3D tilt to its child card. Desktop + pointer-fine
 * only; collapses to a plain wrapper on touch / reduced-motion so phones never
 * run the per-frame math.
 */
function TiltCard({ children }: { children: React.ReactNode }) {
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18 });

  if (!isDesktop || reduce) {
    return <div className="h-full">{children}</div>;
  }

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * 7);
    rotateX.set(py * -7);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      className="h-full [will-change:transform]"
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <TiltCard>
      <a
        href={`https://${project.url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit the live ${project.title} website (opens in a new tab)`}
        className="group relative flex h-full flex-col rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        {/* Hover glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-radial-glow opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
        />

        {/* Screenshot + hover overlay */}
        <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <BrowserFrame
            src={project.src}
            alt={`${project.title}, a website built by Snaper Digital`}
            url={project.url}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 46vw, 92vw"
          />

          {/* Result badge — slides up on hover */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between gap-3 opacity-0 transition-all duration-400 ease-[var(--ease-spring)] group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <TrendUp weight="bold" className="h-3.5 w-3.5 text-brand-cyan" />
              {project.result}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-white px-3 py-1.5 text-xs font-semibold text-black">
              Visit site
              <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {String(index + 1).padStart(2, "0")} · {project.category}
            </span>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>

          <h3 className="mt-2.5 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {project.blurb}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-pill border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </TiltCard>
  );
}

export function WorkGallery() {
  const [active, setActive] = useState<Filter>("All");
  const reduce = useReducedMotion();

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="relative w-full bg-background py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Heading as={2} size="lg">
            Projects, by the outcome they drove.
          </Heading>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Filter by industry. Hover any project to see the result it delivered,
            then open the live site.
          </p>
        </Reveal>

        {/* Filter bar */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="mt-9 flex flex-wrap gap-2"
          >
            {filters.map((f) => {
              const isActive = f === active;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f)}
                  className={cn(
                    "relative cursor-pointer rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "border-transparent text-white"
                      : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="work-filter-pill"
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute inset-0 -z-10 rounded-pill [background-image:linear-gradient(180deg,var(--color-brand-500),var(--color-brand-700))] shadow-glow-sm"
                    />
                  ) : null}
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div
          layout={!reduce}
          className="mt-10 grid gap-6 sm:gap-8 lg:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.url}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">
            No projects in this category yet.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
