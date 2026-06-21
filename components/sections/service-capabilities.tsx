import { Badge, Container, Heading, Lead, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import type { ServiceContent } from "@/lib/services-data";

export function ServiceCapabilities({ service }: { service: ServiceContent }) {
  return (
    <Section surface="default">
      <Container>
        <Reveal className="max-w-2xl">
          <Badge variant="muted">Capabilities</Badge>
          <Heading as={2} size="lg" className="mt-5">
            Built to do the heavy lifting.
          </Heading>
          <Lead className="mt-4">
            The detail behind {service.kicker.toLowerCase()}, and how each piece
            earns its place.
          </Lead>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.07}>
              <article className="group h-full rounded-card border border-border bg-card p-6 shadow-soft transition-all duration-300 ease-[var(--ease-quart)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-accent/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
