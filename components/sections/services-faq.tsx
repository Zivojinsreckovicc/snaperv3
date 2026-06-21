import { CaretRight } from "@phosphor-icons/react/ssr";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

// Exported so the page can feed the same Q&A into FAQPage JSON-LD.
export const servicesFaqs = [
  {
    question: "Which service is right for my business?",
    answer:
      "It depends on your goal. A launch or campaign usually starts with a landing page, a growing business with a full website system, and teams drowning in manual work with automation. Not sure? We'll point you to the right fit on a short call, even if it's smaller than you expected.",
  },
  {
    question: "Can you combine multiple services into one project?",
    answer:
      "Yes, and most clients do. Design, development, branding, automation and ecommerce are built to work as one system. Combining them keeps everything consistent and removes the handoffs that usually slow projects down.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A landing page is usually 5 to 7 days, a full website system 2 to 3 weeks, and a larger growth or ecommerce build 3 to 6 weeks. We confirm an exact timeline once we understand the scope.",
  },
  {
    question: "Do you work with existing websites or only new builds?",
    answer:
      "Both. We build from scratch when it's the right call, but we also redesign, rebuild and extend existing sites, and add automation on top of tools you already use.",
  },
  {
    question: "What do you mean by custom headless ecommerce?",
    answer:
      "Headless means the storefront your customers see is decoupled from the commerce backend. That gives you a faster, fully custom shopping experience with total design control, while still using a proven platform for products, inventory and payments.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: `Yes. We offer monthly retainers for hosting, updates, optimization and new automations, and we're reachable for questions long after launch. Email ${siteConfig.email} to discuss support.`,
  },
];

export function ServicesFaq() {
  return (
    <Section id="faq" surface="default" className="border-t border-border">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <Heading as={2} size="lg" className="mt-4">
            Services, answered.
          </Heading>
          <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
            The questions we hear most when businesses are deciding what they
            actually need.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-border rounded-card border border-border bg-card">
            {servicesFaqs.map(({ question, answer }) => (
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
