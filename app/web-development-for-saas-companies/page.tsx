import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Faq } from "@/components/sections/faq";
import {
  FreeSaasDesignOffer,
  SaasCapabilities,
  SaasConversionLeaks,
  SaasFit,
  SaasMarketingHero,
  SaasProcess,
} from "@/components/sections/saas-marketing-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { buildSaasMarketingWebsiteJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

const path = "/web-development-for-saas-companies";
const title = "Web Development for SaaS Companies | Snaper Digital";
const description =
  "Conversion-focused web development for SaaS companies running serious campaigns. Get a faster marketing website and a free homepage design concept.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    url: siteConfig.url + path,
    title,
    description,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.ogImage],
  },
};

export const saasWebsiteFaqs = [
  {
    question: "Do you build the SaaS product itself?",
    answer:
      "No. This service is specifically for the marketing website around your SaaS product: homepage, product and solution pages, campaign landing pages, resources, pricing, demo flows and the systems that capture leads. We do not replace your product engineering team.",
  },
  {
    question: "What does a SaaS marketing website typically cost?",
    answer:
      "Campaign landing pages typically start at $1,500, while full marketing websites typically start at $3,500. The final range depends on page count, content, integrations, motion and how much positioning work is needed. You receive a clear scope before any work starts.",
  },
  {
    question: "What is included in the free design?",
    answer:
      "For qualified SaaS projects, we create one custom above-the-fold homepage direction. It includes a sharper message, primary call to action and visual direction, followed by a short walkthrough. There is no obligation to continue.",
  },
  {
    question: "Can you build landing pages for paid campaigns?",
    answer:
      "Yes. We design and develop focused campaign pages for paid search, paid social, outbound, product launches and lead magnets, with analytics, forms and CRM handoffs included where needed.",
  },
  {
    question: "How long does a SaaS marketing website take?",
    answer:
      "A focused landing page can usually be delivered in 5–7 days. A full marketing website typically takes 2–6 weeks depending on scope, content readiness, feedback speed and integrations.",
  },
  {
    question: "Can you work with our existing brand and marketing team?",
    answer:
      "Yes. We can work within an established brand system, collaborate with your in-house marketers and writers, or lead the page strategy and visual direction when your team needs more support.",
  },
];

export default function WebDevelopmentForSaasCompaniesPage() {
  return (
    <>
      <JsonLd data={buildSaasMarketingWebsiteJsonLd(saasWebsiteFaqs)} />
      <Header />
      <main>
        <SaasMarketingHero />
        <SaasConversionLeaks />
        <SaasCapabilities />
        <SaasFit />
        <SaasProcess />
        <FreeSaasDesignOffer />
        <Faq
          items={saasWebsiteFaqs}
          heading="SaaS website questions, answered."
          intro="Clear answers before you invest in a new marketing website."
          surface="subtle"
        />
      </main>
      <Footer />
    </>
  );
}
