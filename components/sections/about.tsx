import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Plus } from "@phosphor-icons/react/ssr";
import { Container, Section } from "@/components/ui";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";

const principles = [
  {
    title: "Direct access. Clear decisions.",
    description:
      "Work directly with the people designing and building your project. From the first conversation to launch, you know who to call and where things stand.",
  },
  {
    title: "Every detail earns its place.",
    description:
      "Design, copy and code work toward the same goal: making it easier for the right customers to understand your business and take the next step.",
  },
  {
    title: "Less busywork. More possibility.",
    description:
      "We connect your tools and automate repetitive tasks, giving your team more time for the work that needs a human touch.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      aria-labelledby="about-heading"
      surface="default"
      className="scroll-mt-20 overflow-hidden"
    >
      <Container>
        <div className="flex items-center justify-between gap-6 border-t border-border-strong pt-5">
          <p className="flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
            About Snaper Digital
          </p>
          <span className="hidden text-xs text-muted-foreground sm:block">
            Independent agency. Shared ambition.
          </span>
          <ArrowDownRight
            aria-hidden="true"
            weight="light"
            className="h-6 w-6 shrink-0 text-accent sm:hidden"
          />
        </div>

        <div className="relative py-10 sm:py-14 lg:py-16">
          <HomeSectionHeading
            id="about-heading"
            firstLine="Small agency."
            outline="Serious"
            accent="impact."
            prominent
          />
          <ArrowDownRight
            aria-hidden="true"
            weight="thin"
            className="absolute right-0 top-14 hidden h-20 w-20 text-accent lg:block"
          />
        </div>

        <div className="grid gap-10 border-t border-border-strong pt-8 sm:gap-12 sm:pt-10 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div className="flex flex-col items-start">
            <p className="max-w-sm text-pretty text-2xl font-medium leading-snug tracking-[-0.035em] sm:text-3xl lg:text-4xl">
              <span className="block">Your ambition.</span>
              <span className="block">Our full attention.</span>
            </p>
            <Link
              href="/about"
              className="group mt-7 inline-flex min-h-11 items-center gap-4 text-sm font-medium lg:mt-10"
            >
              <span className="decoration-accent underline-offset-4 group-hover:underline group-focus-visible:underline">
                The story behind Snaper
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-accent-foreground">
                <ArrowUpRight
                  aria-hidden="true"
                  weight="bold"
                  className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </div>

          <div>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              We build websites that win customers and automation that gives you
              time back. A focused team, close to your business, from the first
              idea to what comes after launch.
            </p>

            {/* Native disclosures keep the interaction keyboard-accessible and
                usable without adding client state or an animation runtime. */}
            <div className="mt-8 border-t border-border-strong sm:mt-10">
              {principles.map((principle, index) => (
                <details
                  key={principle.title}
                  name="about-principles"
                  open={index === 0}
                  className="group/principle border-b border-border-strong"
                >
                  <summary className="grid min-h-16 cursor-pointer list-none grid-cols-[1.75rem_1fr_1rem] items-center gap-2 py-5 transition-colors duration-200 hover:text-accent focus-visible:text-accent sm:grid-cols-[2rem_1fr_1rem] sm:gap-3 [&::-webkit-details-marker]:hidden">
                    <span className="text-[0.65rem] tabular-nums text-muted-foreground transition-colors duration-200 group-open/principle:text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium tracking-[-0.015em] sm:text-base">
                      {principle.title}
                    </span>
                    <Plus
                      aria-hidden="true"
                      className="h-4 w-4 group-open/principle:rotate-45 group-open/principle:text-accent motion-safe:transition-transform motion-safe:duration-200"
                    />
                  </summary>
                  <p className="pb-6 pl-9 pr-6 text-sm leading-relaxed text-muted-foreground sm:pl-11">
                    {principle.description}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
