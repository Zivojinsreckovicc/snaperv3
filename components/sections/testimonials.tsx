"use client";

import { Container, Heading, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

// Placeholder testimonials — replace with real, approved client quotes before launch.
const testimonials: Testimonial[] = [
  {
    quote:
      "They rebuilt our website and our qualified leads nearly doubled in two months. The site finally works the way our sales team needs it to.",
    name: "Marko Jovanovic",
    role: "Founder, Helvetic",
    initials: "MJ",
  },
  {
    quote:
      "The automation Snaper set up saves our team hours every week. Follow-ups that used to slip now just happen on their own.",
    name: "Ana Petrovic",
    role: "Operations Lead, MTX Finance",
    initials: "AP",
  },
  {
    quote:
      "Clear communication, fast delivery, and a site that finally looks premium. Exactly the partner we were looking for.",
    name: "Daniel Roth",
    role: "Director, Akademia Pro",
    initials: "DR",
  },
  {
    quote:
      "Our conversion rate jumped the week we launched. The new pages are sharp, fast, and built around what actually drives sales.",
    name: "Sofia Marković",
    role: "CMO, Dominion Europe",
    initials: "SM",
  },
  {
    quote:
      "They understood the business goal first, then designed around it. The result feels custom in every detail, not templated.",
    name: "Luka Ilić",
    role: "Founder, Breinrock",
    initials: "LI",
  },
  {
    quote:
      "From first call to launch it was effortless. They handled the hard parts and kept everything moving without the usual back and forth.",
    name: "Elena Novak",
    role: "Head of Growth, ISM Global",
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
        <span>
          <span className="block text-sm font-medium text-foreground">
            {data.name}
          </span>
          <span className="block text-sm text-muted-foreground">
            {data.role}
          </span>
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
    <div className="group flex">
      <div
        className="flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((t, i) => (
          <div key={`${t.name}-${i}`} className="shrink-0 px-2.5">
            <Quote data={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  // Row B uses a reversed order so the two rows never mirror each other.
  const rowB = [...testimonials].reverse();

  return (
    <Section id="testimonials" surface="subtle" className="overflow-hidden">
      <Container>
        <Reveal className="max-w-2xl">
          <Heading as={2} size="lg">
            What clients say.
          </Heading>
        </Reveal>
      </Container>

      {/* Full-width two-row carousel with frosted edge blur */}
      <div className="relative mt-12 flex flex-col gap-5">
        <Row items={testimonials} duration="28s" />
        <Row items={rowB} duration="34s" reverse />

        {/* Edge blur + color fade (left / right) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background-subtle via-background-subtle/70 to-transparent backdrop-blur-[3px] [mask-image:linear-gradient(to_right,black_30%,transparent)] sm:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background-subtle via-background-subtle/70 to-transparent backdrop-blur-[3px] [mask-image:linear-gradient(to_left,black_30%,transparent)] sm:w-40"
        />
      </div>
    </Section>
  );
}
