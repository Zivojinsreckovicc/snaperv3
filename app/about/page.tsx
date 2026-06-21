import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutBeginning } from "@/components/sections/about-beginning";
import { Stats } from "@/components/sections/stats";
import { AboutValues } from "@/components/sections/about-values";
import { AboutJourney } from "@/components/sections/about-journey";
import { AboutWhy } from "@/components/sections/about-why";
import { AboutCta } from "@/components/sections/about-cta";
import { AboutFaq, aboutFaqs } from "@/components/sections/about-faq";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { buildAboutJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute` opts out of the "%s | Snaper Digital" template, tuned to the
  // ~50-60 char SEO target.
  title: { absolute: "About Snaper Digital | A Small Team That Cares" },
  description:
    "Meet Snaper Digital: a small, hands-on studio building conversion-focused websites and AI automation. Our story, values and journey since 2021.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/about`,
    title: "About Snaper Digital | The Team Behind the Work",
    description:
      "A small team that builds every project like it's ours. The story, values and journey behind Snaper Digital since 2021.",
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Snaper Digital | The Team Behind the Work",
    description:
      "A small team that builds every project like it's ours. Our story, values and journey since 2021.",
    images: [siteConfig.ogImage],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildAboutJsonLd(aboutFaqs)} />
      <Header />
      <main>
        <AboutHero />
        <AboutBeginning />
        <Stats />
        <AboutValues />
        <AboutJourney />
        <AboutWhy />
        <AboutCta />
        <AboutFaq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
