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
  "The terms that govern your use of the Snaper Digital website, including acceptable use, intellectual property, project enquiries and liability.";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | Snaper Digital" },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/terms`,
    title: "Terms of Service | Snaper Digital",
    description: PAGE_DESCRIPTION,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Snaper Digital",
    description: PAGE_DESCRIPTION,
    images: [siteConfig.ogImage],
  },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={buildLegalPageJsonLd({
          name: "Terms of Service",
          path: "/terms",
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
                <span className="text-foreground">Terms of Service</span>
              </nav>
              <Eyebrow>Legal</Eyebrow>
              <Heading as={1} size="display" className="mt-4 max-w-3xl">
                Terms of <GradientText>Service</GradientText>
              </Heading>
              <Lead className="mt-6">
                The straightforward terms for using this website and getting in
                touch about a project.
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
              <h2>1. About these terms</h2>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the{" "}
                {siteConfig.name} website at{" "}
                <a href={siteConfig.url}>{siteConfig.url}</a> (the
                &ldquo;Site&rdquo;). By accessing or using the Site, you agree to
                these Terms. If you do not agree, please don&rsquo;t use the Site.
                {" "}
                {siteConfig.name} is operated from {siteConfig.address.street},{" "}
                {siteConfig.address.postalCode} {siteConfig.address.city},{" "}
                {siteConfig.address.country}.
              </p>

              <h2>2. Use of the site</h2>
              <p>
                You may browse and use the Site for lawful, personal or business
                purposes. You agree not to:
              </p>
              <ul>
                <li>Use the Site in any way that breaks the law or these Terms.</li>
                <li>
                  Attempt to gain unauthorized access to the Site, its servers, or
                  any connected systems or data.
                </li>
                <li>
                  Interfere with or disrupt the Site, including by introducing
                  malware or placing unreasonable load on our infrastructure.
                </li>
                <li>
                  Scrape, copy, or republish substantial parts of the Site without
                  our written permission.
                </li>
              </ul>

              <h2>3. Intellectual property</h2>
              <p>
                Unless stated otherwise, all content on the Site — including text,
                design, graphics, logos, code, and the {siteConfig.name} name and
                brand — is owned by {siteConfig.name} or its licensors and is
                protected by intellectual-property laws. You may not reproduce,
                distribute, or create derivative works from it without prior
                written consent. Work produced for clients under a separate
                agreement is governed by that agreement, not these Terms.
              </p>

              <h2>4. Project enquiries &amp; communications</h2>
              <p>
                Information on the Site about our services, process, and pricing is
                provided for general guidance and does not constitute a binding
                offer. Submitting the contact form, or otherwise reaching out, does
                not create a contract. Any engagement begins only once we both
                agree scope, timeline, and price in a separate written proposal or
                agreement. How we handle the details you send is covered in our{" "}
                <Link href="/privacy">Privacy &amp; Cookie Policy</Link>.
              </p>

              <h2>5. Third-party links</h2>
              <p>
                The Site may link to third-party websites or services we don&rsquo;t
                control. We&rsquo;re not responsible for their content, policies, or
                practices, and including a link doesn&rsquo;t imply endorsement.
              </p>

              <h2>6. Disclaimers</h2>
              <p>
                The Site is provided &ldquo;as is&rdquo; and &ldquo;as
                available&rdquo;. While we work to keep it accurate and online, we
                make no warranties that it will be uninterrupted, error-free, or
                free of harmful components, and we don&rsquo;t guarantee that any
                information on it is complete or current.
              </p>

              <h2>7. Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, {siteConfig.name} will not
                be liable for any indirect, incidental, or consequential damages
                arising from your use of, or inability to use, the Site. Nothing in
                these Terms limits liability that cannot be limited under applicable
                law.
              </p>

              <h2>8. Changes to these terms</h2>
              <p>
                We may update these Terms from time to time. Changes take effect
                when posted, and we&rsquo;ll update the &ldquo;Last updated&rdquo;
                date above. Continued use of the Site after changes means you accept
                the revised Terms.
              </p>

              <h2>9. Governing law</h2>
              <p>
                These Terms are governed by the laws of {siteConfig.address.country},
                without regard to conflict-of-law rules. Any disputes will be subject
                to the courts of {siteConfig.address.country}, unless a separate
                client agreement says otherwise.
              </p>

              <h2>10. Contact</h2>
              <p>
                Questions about these Terms? Email us at{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or use
                our <Link href="/contact">contact page</Link>.
              </p>
            </Prose>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
