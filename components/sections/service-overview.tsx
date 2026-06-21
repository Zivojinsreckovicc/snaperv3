import { Check } from "@phosphor-icons/react/ssr";
import { Badge, Container, Heading, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import type { ServiceContent } from "@/lib/services-data";

export function ServiceOverview({ service }: { service: ServiceContent }) {
  return (
    <Section surface="subtle" className="overflow-hidden">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Narrative */}
          <Reveal>
            <Badge variant="muted">Overview</Badge>
            <Heading as={2} size="lg" className="mt-5">
              What you get, and why it works.
            </Heading>
            <div className="mt-5 space-y-4 text-pretty text-base leading-relaxed text-muted-foreground">
              {service.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* Deliverables */}
          <Reveal delay={0.1}>
            <div className="ring-gradient relative overflow-hidden rounded-card p-7 shadow-soft sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/15 blur-3xl"
              />
              <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                What&apos;s included
              </p>
              <ul className="relative mt-5 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
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
          </Reveal>
        </div>

        {/* Outcome stats */}
        <Reveal delay={0.15}>
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3">
            {service.outcomes.map((o) => (
              <div key={o.label} className="bg-card p-6 text-center sm:text-left">
                <dt className="sr-only">{o.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {o.value}
                </dd>
                <p className="mt-1.5 text-sm text-muted-foreground">{o.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
