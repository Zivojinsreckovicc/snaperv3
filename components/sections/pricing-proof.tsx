import { Quotes } from "@phosphor-icons/react/ssr";
import { Container, Heading } from "@/components/ui";
import { Rating } from "@/components/ui/rating";
import { Reveal } from "@/components/motion/reveal";

// Short pricing-conversation testimonials. Placeholder quotes — swap for real,
// approved client quotes before launch.
const proof = [
  {
    quote:
      "They broke down investment decisions in plain language, then overdelivered on execution.",
    role: "Founder",
    org: "Luxury Concierge Brand",
  },
  {
    quote:
      "No vague numbers. We got ranges, rationale, and a plan that mapped directly to ROI.",
    role: "Director",
    org: "B2B Consulting Firm",
  },
  {
    quote:
      "The pricing conversation felt strategic, not salesy. That built trust immediately.",
    role: "Owner",
    org: "Real Estate Platform",
  },
];

export function PricingProof() {
  return (
    <section className="relative w-full bg-background py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Client proof
          </p>
          <Heading as={2} size="lg" className="mt-4">
            Seen as premium. Chosen for clarity.
          </Heading>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {proof.map((t, i) => (
            <Reveal key={t.org} delay={0.05 * i}>
              <figure className="flex h-full flex-col rounded-card border border-border bg-card p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <Quotes
                  weight="fill"
                  aria-hidden="true"
                  className="h-7 w-7 text-accent/30"
                />
                <Rating value={5} size={15} className="mt-4" />
                <blockquote className="mt-4 flex-1 text-pretty text-[0.95rem] leading-relaxed text-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <span className="block text-sm font-medium text-foreground">
                    {t.role}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {t.org}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
