import { CaretRight } from "@phosphor-icons/react/ssr";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";

export type FaqItem = { question: string; answer: string };

type FaqProps = {
  items: FaqItem[];
  eyebrow?: string;
  heading?: string;
  intro?: string;
  /** Section surface; defaults to plain background. */
  surface?: "default" | "subtle";
};

/**
 * Reusable FAQ accordion section. Native <details> for zero-JS, crawlable
 * answers. Feed the same items into FAQPage JSON-LD at the page level.
 */
export function Faq({
  items,
  eyebrow = "FAQ",
  heading = "Questions, answered.",
  intro,
  surface = "default",
}: FaqProps) {
  return (
    <Section id="faq" surface={surface} className="border-t border-border">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as={2} size="lg" className="mt-4">
            {heading}
          </Heading>
          {intro ? (
            <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
              {intro}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-border rounded-card border border-border bg-card">
            {items.map(({ question, answer }) => (
              <details key={question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
                  {question}
                  <CaretRight
                    weight="bold"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-open:rotate-90"
                  />
                </summary>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
