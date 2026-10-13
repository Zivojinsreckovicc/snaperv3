"use client";

import { useEffect, useRef } from "react";
import { Container, Heading, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { HomeSectionHeader } from "@/components/ui/home-section-heading";

type Testimonial = {
  quote: string;
  name: string;
  initials: string;
};

// Placeholder testimonials — replace with real, approved client quotes before launch.
const testimonials: Testimonial[] = [
  {
    quote:
      "They rebuilt our website and our qualified leads nearly doubled in two months. The site finally works the way our sales team needs it to.",
    name: "Marko Jovanovic",
    initials: "MJ",
  },
  {
    quote:
      "The automation Snaper set up saves our team hours every week. Follow-ups that used to slip now just happen on their own.",
    name: "Ana Petrovic",
    initials: "AP",
  },
  {
    quote:
      "Clear communication, fast delivery, and a site that finally looks premium. Exactly the partner we were looking for.",
    name: "Daniel Roth",
    initials: "DR",
  },
  {
    quote:
      "Our conversion rate jumped the week we launched. The new pages are sharp, fast, and built around what actually drives sales.",
    name: "Sofia Marković",
    initials: "SM",
  },
  {
    quote:
      "They understood the business goal first, then designed around it. The result feels custom in every detail, not templated.",
    name: "Luka Ilić",
    initials: "LI",
  },
  {
    quote:
      "From first call to launch it was effortless. They handled the hard parts and kept everything moving without the usual back and forth.",
    name: "Elena Novak",
    initials: "EN",
  },
];

function Monogram({ initials }: { initials: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 font-display text-sm font-semibold text-accent">
      {initials}
    </span>
  );
}

function Quote({ data }: { data: Testimonial }) {
  return (
    <figure className="flex h-full w-[20rem] flex-col justify-between rounded-card border border-border bg-card p-6 shadow-soft sm:w-[24rem] sm:p-7">
      <blockquote className="text-pretty text-[0.95rem] leading-relaxed text-foreground">
        &ldquo;{data.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Monogram initials={data.initials} />
        <span className="text-sm font-medium text-foreground">
          {data.name}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * One auto-scrolling row. Spacing lives on each card wrapper (not flex `gap`)
 * so the duplicated half is an exact 50% repeat unit and the -50% marquee
 * keyframe loops seamlessly. `reverse` flips the scroll direction.
 */
function Row({
  items,
  duration,
  reverse = false,
}: {
  items: Testimonial[];
  duration: string;
  reverse?: boolean;
}) {
  // Two identical halves so the -50% keyframe loops seamlessly.
  const track = [...items, ...items];

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label="Scrolling client testimonials. Focus to pause."
      className="relative isolate flex overflow-hidden py-2.5 [contain:layout_paint] hover:[--testimonials-play-state:paused] focus-within:[--testimonials-play-state:paused] motion-reduce:overflow-x-auto"
    >
      <div
        className="flex w-max animate-testimonial-marquee [will-change:var(--testimonials-will-change,auto)] motion-reduce:animate-none motion-reduce:will-change-auto"
        style={{
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: "var(--testimonials-play-state, paused)",
        }}
      >
        {track.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            aria-hidden={i >= items.length ? true : undefined}
            className="shrink-0 px-2.5"
          >
            <Quote data={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials({ homeHeading = false }: { homeHeading?: boolean }) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let inView = false;
    const updatePlayback = () => {
      const playing = inView && !document.hidden;
      // Only update on visibility changes. CSS handles every animation frame,
      // and pausing preserves the current position for a seamless resume.
      marquee.style.setProperty(
        "--testimonials-play-state",
        playing ? "running" : "paused",
      );
      marquee.style.setProperty(
        "--testimonials-will-change",
        playing ? "transform" : "auto",
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        updatePlayback();
      },
      { rootMargin: "100px 0px" },
    );
    observer.observe(marquee);
    document.addEventListener("visibilitychange", updatePlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      marquee.style.removeProperty("--testimonials-play-state");
      marquee.style.removeProperty("--testimonials-will-change");
    };
  }, []);

  // Row B uses a reversed order so the two rows never mirror each other.
  const rowB = [...testimonials].reverse();

  return (
    <Section id="testimonials" surface="subtle" className="overflow-hidden">
      <Container>
        <Reveal className={homeHeading ? undefined : "max-w-2xl"}>
          {homeHeading ? (
            <HomeSectionHeader
              eyebrow="Testimonials"
              firstLine="What our"
              outline="clients"
              accent="say."
            />
          ) : (
            <Heading as={2} size="lg">
              What clients say.
            </Heading>
          )}
        </Reveal>
      </Container>

      {/* Clip paint to the visible rows. Static fades preserve the soft edges
          without re-blurring the moving cards on every frame. */}
      <div ref={marqueeRef} className="relative mt-10 flex flex-col">
        <Row items={testimonials} duration="28s" />
        <Row items={rowB} duration="34s" reverse />

        {/* These gradients are static; keep backdrop filters and masks off the
            animated rows so the browser can composite their transforms. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background-subtle via-background-subtle/70 to-transparent sm:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background-subtle via-background-subtle/70 to-transparent sm:w-40"
        />
      </div>
    </Section>
  );
}
