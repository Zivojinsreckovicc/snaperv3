import Link from "next/link";
import {
  ArrowRight,
  ChartLineUp,
  Check,
  Code,
  CursorClick,
  Gauge,
  MagnifyingGlass,
  PaintBrush,
  RocketLaunch,
  ShieldCheck,
  Target,
  X,
} from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import {
  Badge,
  Container,
  Eyebrow,
  GradientText,
  Heading,
  Lead,
  Section,
} from "@/components/ui";
import { CtaLink } from "@/components/ui/cta-link";
import { siteConfig } from "@/lib/site";

const trustPoints = [
  "Marketing websites—not SaaS product development",
  "Custom design and clean development",
  "Built for campaigns, demos and qualified pipeline",
];

const conversionLeaks = [
  {
    Icon: Target,
    title: "The positioning takes too long to understand",
    description:
      "Buyers should know who your product is for, why it matters and what to do next before they lose interest.",
  },
  {
    Icon: CursorClick,
    title: "Campaign traffic lands on a generic homepage",
    description:
      "Paid and outbound campaigns need focused paths that continue the message and move visitors toward a demo or trial.",
  },
  {
    Icon: Gauge,
    title: "Slow pages quietly waste media spend",
    description:
      "A fast, responsive build removes friction between the click and the conversion—especially on mobile.",
  },
];

const capabilities = [
  {
    Icon: MagnifyingGlass,
    title: "Positioning and page strategy",
    description:
      "We turn product complexity into a clear narrative for buyers, not a feature dump for insiders.",
  },
  {
    Icon: PaintBrush,
    title: "Conversion-led SaaS web design",
    description:
      "Custom visual direction, page hierarchy and calls to action designed around how your prospects decide.",
  },
  {
    Icon: Code,
    title: "Modern front-end development",
    description:
      "A responsive, accessible and maintainable marketing site your team can confidently build campaigns on.",
  },
  {
    Icon: ChartLineUp,
    title: "Campaign landing pages",
    description:
      "Focused pages for paid search, paid social, product launches, lead magnets and outbound campaigns.",
  },
  {
    Icon: CursorClick,
    title: "Conversion and CRM setup",
    description:
      "Forms, demo requests, analytics and CRM handoffs configured so every serious lead has a clear next step.",
  },
  {
    Icon: ShieldCheck,
    title: "SEO and trust foundations",
    description:
      "Technical SEO, structured content, proof placement and a polished experience that makes your company feel established.",
  },
];

const rightFit = [
  "You have a proven SaaS product and a clear commercial goal.",
  "You are investing in paid, organic or outbound campaigns.",
  "Your current site undersells the product or converts inconsistently.",
  "You want a strategic partner who can own design and development.",
];

const notYet = [
  "You are still validating the product and do not yet have a marketing budget.",
  "You need engineers to build the SaaS application itself.",
  "You only need the lowest-cost template or a quick visual reskin.",
  "There is no internal owner available for feedback, content or approvals.",
];

const process = [
  {
    number: "01",
    title: "Find the conversion gap",
    description:
      "We review your positioning, traffic sources, buyer journey and current site to find where intent is being lost.",
  },
  {
    number: "02",
    title: "Shape the message and path",
    description:
      "We map page hierarchy, proof, offers and calls to action around the campaign outcomes that matter.",
  },
  {
    number: "03",
    title: "Design and build",
    description:
      "We create a distinct visual system, then develop a fast, responsive marketing site ready for launch.",
  },
  {
    number: "04",
    title: "Launch, measure, improve",
    description:
      "We connect analytics and lead capture, check the full funnel and support the next iteration with real data.",
  },
];

export function SaasMarketingHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background pb-16 pt-32 sm:pb-20 sm:pt-40 lg:min-h-[46rem] lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-brand-950)_22%,var(--color-background))_0%,var(--color-background)_48%,color-mix(in_oklab,var(--color-brand-blue)_8%,var(--color-background))_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[18rem] top-12 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-violet/22 blur-[120px] sm:-left-40 sm:h-[42rem] sm:w-[42rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18rem] top-8 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand-cyan/10 blur-[130px] sm:-right-36 sm:h-[38rem] sm:w-[38rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-[linear-gradient(to_top,var(--color-background),transparent)]"
      />
      <Container className="relative">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">SaaS web development</span>
        </nav>

        <Reveal>
          <div className="max-w-4xl">
            <Eyebrow dot>SaaS marketing website partner</Eyebrow>
            <Heading
              as={1}
              size="display"
              className="mt-6 max-w-4xl text-[clamp(2.75rem,6.2vw,5.5rem)]"
            >
              Marketing websites for SaaS companies that{" "}
              <GradientText>convert attention.</GradientText>
            </Heading>
            <Lead className="mt-7 max-w-2xl">
              Strategy, design and development for SaaS teams running serious
              campaigns—built to turn the right traffic into qualified pipeline.
            </Lead>
            <div className="mt-9">
              <CtaLink href="#free-design" size="lg">
                Get a free design direction
              </CtaLink>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              One custom homepage direction. No template. No obligation.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-16 grid max-w-5xl gap-x-8 gap-y-3 border-t border-border/70 pt-6 sm:grid-cols-3 lg:mt-20">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
              >
                <Check
                  weight="bold"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

export function SaasConversionLeaks() {
  return (
    <Section surface="subtle" className="overflow-hidden">
      <Container>
        <Reveal className="max-w-3xl">
          <Badge variant="muted">The real problem</Badge>
          <Heading as={2} size="xl" className="mt-5">
            Your campaigns can only work as hard as the page they land on.
          </Heading>
          <Lead className="mt-5">
            A polished SaaS product can still lose qualified buyers when its
            marketing website is vague, slow or disconnected from the campaign.
          </Lead>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {conversionLeaks.map(({ Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 0.07}>
              <article className="h-full rounded-card border border-border bg-card p-7 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                  <Icon weight="light" className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function SaasCapabilities() {
  return (
    <Section>
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>What we build</Eyebrow>
          <Heading as={2} size="xl" className="mt-5">
            SaaS website design and development built around the buyer journey.
          </Heading>
          <Lead className="mt-5">
            Strategy, design and development stay with one team, so the message,
            experience and implementation all pull in the same direction.
          </Lead>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ Icon, title, description }, index) => (
            <Reveal key={title} delay={(index % 3) * 0.06}>
              <article className="group h-full rounded-card border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
                <div className="flex items-center justify-between">
                  <Icon weight="light" className="h-6 w-6 text-accent" />
                  <span className="text-xs font-semibold tracking-[0.18em] text-accent/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-lg font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function SaasFit() {
  return (
    <Section surface="subtle">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow dot className="justify-center">
            A good fit matters
          </Eyebrow>
          <Heading as={2} size="xl" className="mt-5">
            Built for SaaS teams serious about marketing performance.
          </Heading>
          <Lead className="mx-auto mt-5">
            The best results happen when the product is proven, campaigns have a
            real owner and the website is treated as a growth asset.
          </Lead>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-card border border-accent/25 bg-card p-7 shadow-glow sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                This is for you if
              </p>
              <ul className="mt-6 space-y-4">
                {rightFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                      <Check weight="bold" className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-border pt-6">
                <CtaLink href="#free-design" size="md">
                  Get a free design direction
                </CtaLink>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="h-full rounded-card border border-border bg-card p-7 shadow-soft sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Probably not the right time if
              </p>
              <ul className="mt-6 space-y-4">
                {notYet.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <X weight="bold" className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
                Still early? A focused template is often the smarter first step.
                Come back when your offer is proven and you are ready to turn
                campaign traffic into pipeline.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-6 flex flex-col gap-4 rounded-card border border-border bg-card px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-foreground">Clear investment expectations</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Campaign landing pages typically start at $1,500. Full SaaS
                marketing websites typically start at $3,500.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-brand-400"
            >
              See pricing
              <ArrowRight weight="bold" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export function SaasProcess() {
  return (
    <Section surface="subtle">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <Heading as={2} size="xl" className="mt-5">
            From campaign strategy to a website ready to convert.
          </Heading>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06}>
              <article className="h-full rounded-card border border-border bg-card p-6 shadow-soft">
                <span className="font-display text-sm font-semibold tracking-[0.18em] text-accent">
                  {step.number}
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function FreeSaasDesignOffer() {
  return (
    <Section id="free-design" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-radial-glow opacity-80"
      />
      <Container className="relative">
        <div className="grid gap-12 rounded-[1.75rem] border border-accent/25 bg-card p-7 shadow-glow sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-12">
          <Reveal>
            <Badge variant="accent">Free design offer</Badge>
            <Heading as={2} size="lg" className="mt-5">
              See a stronger homepage direction before you commit.
            </Heading>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
              Tell us about your product, audience and campaign. If the project
              is a fit, we will create one custom above-the-fold homepage concept
              showing how we would sharpen your message and conversion path.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "A focused hero concept built around your SaaS",
                "Clearer messaging and primary call to action",
                "A short walkthrough of the conversion decisions",
                "Yours to review with no obligation to hire us",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <RocketLaunch weight="light" className="h-5 w-5 shrink-0 text-accent" />
              Best for established SaaS teams preparing a campaign, launch or
              website rebuild.
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="mb-4 text-sm font-medium text-foreground">
                Request your free design direction
              </p>
              <ContactForm
                subject="Free SaaS Homepage Design Request from snaperdigital.com"
                submitLabel="Request my free design"
                messageLabel="Tell us about your SaaS and campaign"
                messagePlaceholder="Share your website, campaign goal, timeline and approximate budget."
              />
              <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                We reply within one business day. Your details are only used to
                review and respond to your request. You can also email{" "}
                <a
                  href={"mailto:" + siteConfig.email}
                  className="text-foreground underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
