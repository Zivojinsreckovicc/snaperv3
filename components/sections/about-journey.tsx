"use client";

import { motion, useReducedMotion } from "motion/react";
import { Badge, Container, Heading, Lead, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const milestones: { year: string; title: string; body: string }[] = [
  {
    year: "2021",
    title: "The beginning",
    body: "Two friends with laptops, big dreams, and zero budget. Started building websites for local businesses from a small apartment in Novi Sad.",
  },
  {
    year: "2022",
    title: "First international client",
    body: "Landed our first project outside Serbia. Realized that good work speaks all languages. Started thinking bigger.",
  },
  {
    year: "2023",
    title: "Process refinement",
    body: "After 50+ projects, we figured out what actually moves the needle. Developed our signature approach: purpose-driven design with automated workflows.",
  },
  {
    year: "2024",
    title: "AI integration",
    body: "Started incorporating AI automation into every project. Not because it's trendy, but because it actually saves our clients time and money.",
  },
  {
    year: "2025",
    title: "Today",
    body: "Working with businesses across Europe and beyond. Same small team, same values, bigger impact. Ready to help you write your success story.",
  },
];

export function AboutJourney() {
  const reduce = useReducedMotion();

  return (
    <Section id="journey" surface="subtle">
      <Container>
        <Reveal className="max-w-2xl">
          <Badge variant="muted">Our journey</Badge>
          <Heading as={2} size="lg" className="mt-5">
            From idea to impact.
          </Heading>
          <Lead className="mt-4">
            Every milestone that shaped who we are today.
          </Lead>
        </Reveal>

        <ol className="mt-14 max-w-3xl">
          {milestones.map((m, i) => {
            const last = i === milestones.length - 1;
            return (
              <motion.li
                key={m.year}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex gap-6"
              >
                {/* Marker + connector */}
                <div className="flex flex-col items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-display text-sm font-semibold text-accent">
                    {m.year}
                  </span>
                  {!last ? (
                    <span
                      aria-hidden="true"
                      className="my-1 w-px flex-1 bg-gradient-to-b from-accent/50 via-border-strong to-transparent"
                    />
                  ) : null}
                </div>

                <div className={last ? "pb-1" : "pb-12"}>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
                    {m.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
