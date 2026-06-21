import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WorkHero } from "@/components/sections/work-hero";
import { WorkGallery } from "@/components/sections/work-gallery";
import { WorkTrust } from "@/components/sections/work-trust";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { buildWorkJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute` opts out of the "%s | Snaper Digital" template, tuned to the
  // ~50-60 char SEO target.
  title: { absolute: "Our Work & Case Studies | Snaper Digital Portfolio" },
  description:
    "Explore websites and AI automation systems built by Snaper Digital and the measurable results they delivered, from fintech to real estate and SaaS.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/work`,
    title: "Our Work | Snaper Digital Portfolio",
    description:
      "A selection of conversion-focused websites and automation systems we've designed, built and shipped, with the results behind each.",
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | Snaper Digital Portfolio",
    description:
      "Websites and AI automation systems built by Snaper Digital, with the measurable results behind each project.",
    images: [siteConfig.ogImage],
  },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={buildWorkJsonLd()} />
      <Header />
      <main>
        <WorkHero />
        <WorkGallery />
        <WorkTrust />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
