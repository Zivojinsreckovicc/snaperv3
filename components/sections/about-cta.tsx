import { Phone } from "@phosphor-icons/react/ssr";
import { Container, Heading, Section } from "@/components/ui";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/motion/reveal";
import { contactCta, siteConfig } from "@/lib/site";

export function AboutCta() {
  return (
    <Section id="lets-talk" surface="subtle" className="overflow-hidden">
      <Container>
        <Reveal>
          <div className="ring-gradient relative overflow-hidden rounded-card p-8 text-center shadow-glow sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-radial-glow opacity-80"
            />
            <div className="relative mx-auto max-w-2xl">
              <Heading as={2} size="lg">
                Ready to build something great?
              </Heading>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
                We&apos;re not for everyone. But if you want a website that
                actually drives results, built by people who care about your
                success as much as you do, let&apos;s talk.
              </p>
              <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
                No pressure, no sales pitch. Just an honest conversation about
                what you&apos;re trying to achieve and how we can help you get
                there.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
                <CtaLink href={contactCta.href} size="lg">
                  {contactCta.label}
                </CtaLink>
                <span className="text-sm text-muted-foreground">or</span>
                <a
                  href={siteConfig.phoneHref}
                  className="group inline-flex items-center gap-2.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-accent transition-transform duration-300 group-hover:scale-110">
                    <Phone weight="fill" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">
                      Prefer to talk?
                    </span>
                    Call us: {siteConfig.phone}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
