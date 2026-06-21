"use client";

import { Container, Section } from "@/components/ui";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";

// Placeholder headline metrics — replace with real, verified numbers before launch.
const stats = [
  { to: 40, suffix: "+", label: "Projects delivered" },
  { to: 3, suffix: "x", label: "Average lead growth" },
  { to: 12, suffix: "", label: "Industries served" },
  { to: 95, suffix: "%", label: "Client retention" },
];

export function Stats() {
  return (
    <Section spacing="md" surface="subtle" className="border-y border-border">
      <Container>
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="px-2 text-center lg:px-8"
            >
              <div className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
