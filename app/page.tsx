import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { ServicesPreview } from "@/components/sections/services-flow";
import { Process } from "@/components/sections/process";
import { ServiceWebDevelopment } from "@/components/sections/service-web-development";
import { ServiceAiAutomation } from "@/components/sections/service-ai-automation";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { buildHomeJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={buildHomeJsonLd()} />
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <ClientMarquee />
        <ServicesPreview />
        <Process />
        <ServiceWebDevelopment />
        <ServiceAiAutomation />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
