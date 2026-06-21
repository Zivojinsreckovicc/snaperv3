import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingHero } from "@/components/sections/pricing-hero";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { PricingProof } from "@/components/sections/pricing-proof";
import { PricingTiers } from "@/components/sections/pricing-tiers";
import { PricingCta } from "@/components/sections/pricing-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPricingJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute` opts out of the "%s | Snaper Digital" template, tuned to the
  // ~50-60 char SEO target.
  title: { absolute: "Pricing | Web Design & AI Automation | Snaper Digital" },
  description:
    "Transparent, outcome-based pricing for websites and AI automation. See real-world ranges from shipped projects, from launch pages to full growth systems.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/pricing`,
    title: "Pricing | Snaper Digital",
    description:
      "Outcome-based pricing for websites and AI automation, with real-world ranges from shipped projects and exact quotes after a short call.",
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Snaper Digital",
    description:
      "Outcome-based pricing for websites and AI automation, with real-world ranges from shipped projects.",
    images: [siteConfig.ogImage],
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={buildPricingJsonLd()} />
      <Header />
      <main>
        <PricingHero />
        <ClientMarquee />
        <PricingProof />
        <PricingTiers />
        <PricingCta />
      </main>
      <Footer />
    </>
  );
}
