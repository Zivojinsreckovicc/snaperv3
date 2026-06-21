import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ServicesHero } from "@/components/sections/services-hero";
import { ServicesFlow } from "@/components/sections/services-flow";
import { Process } from "@/components/sections/process";
import { ServicesFaq, servicesFaqs } from "@/components/sections/services-faq";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { buildServicesJsonLd } from "@/lib/structured-data";
import { serviceOfferings } from "@/lib/services-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute` opts out of the "%s | Snaper Digital" template, tuned to the
  // ~50-60 char SEO target.
  title: { absolute: "Services | Web, AI Automation & Ecommerce | Snaper" },
  description:
    "Web development, AI automation, branding, landing pages and custom headless ecommerce. Explore everything Snaper Digital designs, builds and automates.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/services`,
    title: "Services | Snaper Digital",
    description:
      "Web development, AI automation, branding, landing pages and custom headless ecommerce, built and automated by Snaper Digital.",
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Snaper Digital",
    description:
      "Web development, AI automation, branding, landing pages and custom headless ecommerce, built by Snaper Digital.",
    images: [siteConfig.ogImage],
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={buildServicesJsonLd(serviceOfferings, servicesFaqs)} />
      <Header />
      <main>
        <ServicesHero />
        <ServicesFlow />
        <Process />
        <ServicesFaq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
