import { CaretRight } from "@phosphor-icons/react/ssr";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

// Exported so the page can feed the same Q&A into FAQPage JSON-LD.
export const aboutFaqs = [
  {
    question: "What is Snaper Digital and what does the team specialize in?",
    answer:
      "Snaper Digital is a small, hands-on studio that designs and builds conversion-focused websites and practical AI automation systems. We specialize in custom web design and development, automation, branding and consulting for businesses that want measurable results.",
  },
  {
    question:
      "Where is Snaper Digital based and do you work with clients outside Serbia?",
    answer:
      "We're based in Serbia and work remotely with clients across Europe and beyond. Good work speaks every language, so location is never a barrier to a great project.",
  },
  {
    question: "How is Snaper Digital different from a typical web design agency?",
    answer:
      "You talk directly to the people building your project, with no layers of project managers. We focus on results over features, move fast without cutting corners, and stay involved long after launch.",
  },
  {
    question: "What types of businesses do you work with?",
    answer:
      "We work with founders and small to mid-sized businesses across industries, from local services to international B2B and SaaS. If you have a real goal and care about the outcome, you're a fit.",
  },
  {
    question: "When was Snaper Digital founded?",
    answer:
      "Snaper Digital was founded in 2021. Since then we have focused on iterative delivery, transparent communication, and partnerships that extend beyond a single launch.",
  },
  {
    question: "How can I contact Snaper Digital to discuss a project?",
    answer: `Send us a message through the contact form or email ${siteConfig.email}. You can also call us at ${siteConfig.phone}. We reply within one business day with clear next steps.`,
  },
];

export function AboutFaq() {
  return (
    <Section id="faq" surface="default" className="border-t border-border">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <Heading as={2} size="lg" className="mt-4">
            About Snaper Digital.
          </Heading>
          <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
            Quick answers about who we are, how we work, and whether we&apos;re a
            fit for your project.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-border rounded-card border border-border bg-card">
            {aboutFaqs.map(({ question, answer }) => (
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
