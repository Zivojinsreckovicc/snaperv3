import type { Metadata } from "next";
import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import {
  CaretRight,
  ChatCircleDots,
  Clock,
  EnvelopeSimple,
  Lightning,
  MapPin,
  PaperPlaneTilt,
} from "@phosphor-icons/react/ssr";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container, Eyebrow, GradientText, Heading, Lead } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { SocialLinks } from "@/components/layout/social-links";
import { ContactPageForm } from "@/components/sections/contact-page-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildContactJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute` opts out of the "%s | Snaper Digital" layout template so the
  // brand name isn't duplicated; tuned to the ~50-60 char SEO target.
  title: { absolute: "Contact Snaper Digital | Web Design & AI Automation" },
  description:
    "Get in touch with Snaper Digital about a conversion-focused website or AI automation project. Tell us what you need — we reply within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/contact`,
    title: "Contact Snaper Digital | Start Your Project",
    description:
      "Tell us about your website or AI automation project. We reply within one business day with clear next steps.",
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Snaper Digital | Start Your Project",
    description:
      "Tell us about your website or AI automation project. We reply within one business day with clear next steps.",
    images: [siteConfig.ogImage],
  },
};

const details: { Icon: Icon; label: string; value: string; href?: string }[] = [
  {
    Icon: EnvelopeSimple,
    label: "Email us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  { Icon: MapPin, label: "Based in", value: `${siteConfig.location} · Worldwide` },
  { Icon: Clock, label: "Response time", value: "Within 1 business day" },
];

const steps: { Icon: Icon; title: string; body: string }[] = [
  {
    Icon: PaperPlaneTilt,
    title: "You send the brief",
    body: "Share your goals and what you're trying to build. A few lines is enough to start.",
  },
  {
    Icon: ChatCircleDots,
    title: "We reply with a plan",
    body: "Within one business day you'll get clear next steps and honest scope — no sales script.",
  },
  {
    Icon: Lightning,
    title: "We build it together",
    body: "Once the scope is agreed, we move fast and keep you in the loop the whole way.",
  },
];

const faqs = [
  {
    question: "How soon will I hear back?",
    answer:
      "We reply to every project inquiry within one business day, usually with clear next steps and a few questions to scope your project accurately.",
  },
  {
    question: "Do you work with businesses outside Serbia?",
    answer:
      "Yes. We're based in Obrenovac, Serbia but work remotely with clients worldwide, across time zones, the same way we run every project.",
  },
  {
    question: "What does a project cost?",
    answer:
      "It depends on scope. Once we understand your goals we send a fixed, transparent quote — no hidden fees and no open-ended hourly billing.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "Your business goals, any existing website or brand assets, and examples of what you like. We'll guide you through the rest.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildContactJsonLd(faqs)} />
      <Header />
      <main>
        {/* Hero + form */}
        <section className="relative overflow-hidden bg-grid pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-radial-glow"
          />

          <Container className="relative">
            {/* Breadcrumb */}
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
                <CaretRight weight="bold" className="h-3.5 w-3.5 opacity-60" />
                <span className="text-foreground">Contact</span>
              </nav>
            </Reveal>

            <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              {/* Left: pitch + details + steps */}
              <div>
                <Reveal>
                  <Eyebrow>Contact</Eyebrow>
                  <Heading as={1} size="xl" className="mt-4">
                    Let&apos;s build something that{" "}
                    <GradientText>grows your business</GradientText>.
                  </Heading>
                  <Lead className="mt-5">
                    Tell us about your website or automation project. You&apos;ll
                    get a clear, no-pressure reply within one business day.
                  </Lead>
                </Reveal>

                <Reveal delay={0.08}>
                  <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                    {details.map(({ Icon, label, value, href }) => (
                      <li
                        key={label}
                        className="glass flex items-center gap-3.5 rounded-2xl border border-border/70 p-4"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                          <Icon weight="light" className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-medium text-muted-foreground">
                            {label}
                          </span>
                          {href ? (
                            <a
                              href={href}
                              className="block truncate text-sm font-medium text-foreground transition-colors hover:text-accent"
                            >
                              {value}
                            </a>
                          ) : (
                            <span className="block truncate text-sm font-medium text-foreground">
                              {value}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="mt-10">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      What happens next
                    </h2>
                    <ol className="mt-6 space-y-6">
                      {steps.map(({ Icon, title, body }, i) => (
                        <li key={title} className="flex gap-4">
                          <span className="relative flex flex-col items-center">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-accent">
                              <Icon weight="light" className="h-5 w-5" />
                            </span>
                            {i < steps.length - 1 ? (
                              <span
                                aria-hidden="true"
                                className="mt-1 h-full w-px flex-1 bg-gradient-to-b from-border-strong to-transparent"
                              />
                            ) : null}
                          </span>
                          <div className="pb-1">
                            <h3 className="text-base font-semibold text-foreground">
                              {title}
                            </h3>
                            <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                              {body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="mt-10 flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Prefer social?
                    </span>
                    <SocialLinks />
                  </div>
                </Reveal>
              </div>

              {/* Right: form */}
              <Reveal delay={0.1}>
                <div className="lg:sticky lg:top-28">
                  <ContactPageForm />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="relative border-t border-border bg-background-subtle py-20 sm:py-24 lg:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
              <Heading as={2} size="lg" className="mt-4">
                Questions, answered.
              </Heading>
              <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
                A few things people usually ask before reaching out. Still unsure?{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  Email us directly
                </a>
                .
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="divide-y divide-border rounded-card border border-border bg-card">
                {faqs.map(({ question, answer }) => (
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
        </section>
      </main>
      <Footer />
    </>
  );
}
