import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ServiceDetailHero } from "@/components/sections/service-detail-hero";
import { ServiceOverview } from "@/components/sections/service-overview";
import { ServiceCapabilities } from "@/components/sections/service-capabilities";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { OtherServices } from "@/components/sections/other-services";
import { Contact } from "@/components/sections/contact";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { GrowthChart } from "@/components/visuals/growth-chart";
import { JsonLd } from "@/components/seo/json-ld";
import { buildServiceDetailJsonLd } from "@/lib/structured-data";
import {
  getServiceBySlug,
  serviceSlugs,
  type ServiceContent,
} from "@/lib/services-data";
import { siteConfig } from "@/lib/site";

const serviceFormSubjects: Partial<Record<string, string>> = {
  "web-development": "Web Development Inquiry from snaperdigital.com",
  "ai-automation": "AI Automation Inquiry from snaperdigital.com",
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const url = `${siteConfig.url}/services/${service.id}`;
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      type: "website",
      url,
      title: `${service.kicker} | ${siteConfig.name}`,
      description: service.metaDescription,
      images: [{ url: siteConfig.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.kicker} | ${siteConfig.name}`,
      description: service.metaDescription,
      images: [siteConfig.ogImage],
    },
  };
}

/** Per-service hero visual, reusing the BrowserFrame, GrowthChart and Image. */
function heroVisual(service: ServiceContent) {
  const glow = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-radial-glow opacity-70 blur-2xl"
    />
  );

  switch (service.id) {
    case "web-development":
      return (
        <div className="relative">
          {glow}
          <BrowserFrame
            src="/imgs/portfolioimages/mtxfinance.webp"
            alt="A custom website built by Snaper Digital"
            url="mtxfinance.com"
            priority
            sizes="(min-width: 1024px) 46vw, 90vw"
          />
        </div>
      );
    case "landing-pages":
      return (
        <div className="relative">
          {glow}
          <BrowserFrame
            src="/imgs/portfolioimages/breinrock.webp"
            alt="A high-converting landing page built by Snaper Digital"
            url="breinrock.com"
            priority
            sizes="(min-width: 1024px) 46vw, 90vw"
          />
        </div>
      );
    case "ecommerce":
      return (
        <div className="relative">
          {glow}
          <BrowserFrame
            src="/imgs/portfolioimages/dominioneurope.webp"
            alt="A custom storefront built by Snaper Digital"
            url="dominioneurope.com"
            priority
            sizes="(min-width: 1024px) 46vw, 90vw"
          />
        </div>
      );
    case "branding":
      return (
        <div className="relative">
          {glow}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border shadow-glow">
            <Image
              src="/imgs/cleandesign.webp"
              alt="Brand and creative direction work by Snaper Digital"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      );
    case "ai-automation":
    default:
      return (
        <figure className="relative">
          {glow}
          <GrowthChart />
          <figcaption className="mt-5 text-center text-sm text-muted-foreground">
            The kind of growth clients see after we automate lead capture and
            follow-up.
          </figcaption>
        </figure>
      );
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd data={buildServiceDetailJsonLd(service)} />
      <Header />
      <main>
        <ServiceDetailHero service={service} visual={heroVisual(service)} />
        <ServiceOverview service={service} />
        <ServiceCapabilities service={service} />
        <Process />
        <Testimonials />
        <Faq
          items={service.faqs}
          heading={`${service.kicker}, answered.`}
          intro="The questions we hear most about this service. Still unsure? Just ask."
        />
        <OtherServices currentSlug={service.id} />
        <Contact subject={serviceFormSubjects[service.id]} />
      </main>
      <Footer />
    </>
  );
}
