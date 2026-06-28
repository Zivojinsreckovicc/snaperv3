import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container, Eyebrow, GradientText, Heading, Lead, Prose } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { buildLegalPageJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

const PAGE_DESCRIPTION =
  "How Snaper Digital collects, uses and protects your data, and how we use cookies, analytics and our contact form on this website.";

export const metadata: Metadata = {
  title: { absolute: "Privacy & Cookie Policy | Snaper Digital" },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/privacy`,
    title: "Privacy & Cookie Policy | Snaper Digital",
    description: PAGE_DESCRIPTION,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy & Cookie Policy | Snaper Digital",
    description: PAGE_DESCRIPTION,
    images: [siteConfig.ogImage],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={buildLegalPageJsonLd({
          name: "Privacy & Cookie Policy",
          path: "/privacy",
          description: PAGE_DESCRIPTION,
        })}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-grid pb-12 pt-32 sm:pb-16 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-radial-glow"
          />
          <Container className="relative">
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
                <span className="opacity-60">/</span>
                <span className="text-foreground">Privacy &amp; Cookie Policy</span>
              </nav>
              <Eyebrow>Legal</Eyebrow>
              <Heading as={1} size="display" className="mt-4 max-w-3xl">
                Privacy &amp; <GradientText>Cookie Policy</GradientText>
              </Heading>
              <Lead className="mt-6">
                Plain-language explanation of what we collect, why, and the
                control you have over it.
              </Lead>
              <p className="mt-4 text-sm text-muted-foreground">
                Last updated: June 22, 2026
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Body */}
        <section className="relative w-full bg-background pb-24 sm:pb-28 lg:pb-32">
          <Container size="md">
            <Prose>
              <h2>Who we are</h2>
              <p>
                This website is operated by {siteConfig.name} (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;, &ldquo;our&rdquo;), a digital studio based at{" "}
                {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
                {siteConfig.address.city}, {siteConfig.address.country}, working
                with clients worldwide. For any privacy question, contact us at{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>

              <h2>What we collect</h2>
              <p>We only collect what we need to run the site and respond to you:</p>
              <ul>
                <li>
                  <strong>Information you give us.</strong> When you submit our
                  contact form, we collect the details you enter — such as your
                  name, email address, and the message or project details you
                  send.
                </li>
                <li>
                  <strong>Usage &amp; device data.</strong> Standard analytics
                  data such as pages viewed, approximate location (country/city
                  level), referrer, device and browser type, collected through
                  cookies as described below.
                </li>
                <li>
                  <strong>Preferences.</strong> Your light/dark theme choice is
                  stored locally in your browser so the site remembers it.
                </li>
              </ul>

              <h2>How we use your data</h2>
              <ul>
                <li>To reply to your enquiries and discuss potential projects.</li>
                <li>To operate, maintain and improve the website.</li>
                <li>
                  To understand how visitors use the site so we can make it
                  better.
                </li>
                <li>To meet legal and security obligations.</li>
              </ul>
              <p>
                We do <strong>not</strong> sell your personal data, and we do not
                use it for unrelated marketing without your consent.
              </p>

              <h2>Cookies &amp; similar technologies</h2>
              <p>
                Cookies are small files stored on your device. We use a small
                number of them:
              </p>
              <ul>
                <li>
                  <strong>Analytics cookies (Google Analytics 4).</strong> We use
                  Google Analytics to understand site traffic and usage. It sets
                  cookies and collects anonymized/aggregated usage data. See{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google&rsquo;s Privacy Policy
                  </a>
                  . You can opt out site-wide with the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </li>
                <li>
                  <strong>Local storage.</strong> Your theme preference is kept in
                  your browser&rsquo;s local storage. It never leaves your device
                  and is not used for tracking.
                </li>
              </ul>
              <p>
                You can block or delete cookies in your browser settings. Doing so
                won&rsquo;t break the site, though some preferences may not be
                remembered.
              </p>

              <h2>Third-party services</h2>
              <p>
                Some data is processed by trusted providers who act on our behalf:
              </p>
              <ul>
                <li>
                  <strong>Web3Forms</strong> — delivers your contact form
                  submissions to our inbox.
                </li>
                <li>
                  <strong>Make (Integromat)</strong> — routes contact submissions
                  into our follow-up workflow.
                </li>
                <li>
                  <strong>Google Analytics</strong> — website analytics, as
                  described above.
                </li>
              </ul>
              <p>
                These providers process data under their own terms and only for
                the purposes we instruct.
              </p>

              <h2>How long we keep it</h2>
              <p>
                We keep contact enquiries only as long as needed to respond and,
                where relevant, to manage a project or our legitimate business
                records. Analytics data is retained according to our Google
                Analytics configuration. You can ask us to delete your data at any
                time.
              </p>

              <h2>Your rights</h2>
              <p>
                Depending on where you live (for example under the GDPR), you may
                have the right to access, correct, delete, or restrict the use of
                your personal data, to object to processing, and to data
                portability. To exercise any of these, email us at{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> and
                we&rsquo;ll respond promptly.
              </p>

              <h2>Children</h2>
              <p>
                This site is intended for businesses and adults. We do not
                knowingly collect data from children.
              </p>

              <h2>Changes to this policy</h2>
              <p>
                We may update this policy as the site or the law evolves. We&rsquo;ll
                revise the &ldquo;Last updated&rdquo; date above when we do.
              </p>

              <h2>Contact</h2>
              <p>
                Questions about this policy or your data? Reach us at{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or
                through our{" "}
                <Link href="/contact">contact page</Link>.
              </p>
            </Prose>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
