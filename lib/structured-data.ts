import { services, siteConfig } from "@/lib/site";
import { projects } from "@/lib/projects";
import { pricingTiers } from "@/lib/pricing";

/**
 * Builds the JSON-LD graph for the home page: Organization, WebSite,
 * ProfessionalService and a Service node per offering. Kept in one @graph so
 * nodes can reference each other via @id.
 */
export function buildHomeJsonLd() {
  const orgId = `${siteConfig.url}/#organization`;
  const siteId = `${siteConfig.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        description: siteConfig.description,
        email: siteConfig.email,
        sameAs: Object.values(siteConfig.socials),
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        image: `${siteConfig.url}${siteConfig.logo}`,
        url: siteConfig.url,
        email: siteConfig.email,
        areaServed: "Worldwide",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country,
        },
        parentOrganization: { "@id": orgId },
        makesOffer: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            provider: { "@id": orgId },
          },
        })),
      },
    ],
  };
}

/**
 * Builds the JSON-LD graph for the /work page: a CollectionPage tied to the
 * site's Organization, a BreadcrumbList, and an ItemList of the portfolio
 * projects as CreativeWork nodes. Reuses the Organization @id for a connected
 * graph.
 */
export function buildWorkJsonLd() {
  const orgId = `${siteConfig.url}/#organization`;
  const workUrl = `${siteConfig.url}/work`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${workUrl}/#webpage`,
        url: workUrl,
        name: `Work & Case Studies | ${siteConfig.name}`,
        description:
          "Selected websites and AI automation systems designed and built by Snaper Digital, with the measurable results they delivered.",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${workUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Work", item: workUrl },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${workUrl}/#projects`,
        name: "Selected work",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            url: `https://${p.url}`,
            image: `${siteConfig.url}${p.src}`,
            about: p.category,
            creator: { "@id": orgId },
            dateCreated: String(p.year),
          },
        })),
      },
    ],
  };
}

/**
 * Builds the JSON-LD graph for the /services page: a CollectionPage tied to the
 * site's Organization, a BreadcrumbList, a Service node per offering, and a
 * FAQPage from the on-page Q&A. Reuses the Organization @id for a connected
 * graph.
 */
export function buildServicesJsonLd(
  offerings: { id: string; name: string; description: string }[],
  faqs: { question: string; answer: string }[]
) {
  const orgId = `${siteConfig.url}/#organization`;
  const servicesUrl = `${siteConfig.url}/services`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${servicesUrl}/#webpage`,
        url: servicesUrl,
        name: `Services | ${siteConfig.name}`,
        description:
          "Web development, AI automation, branding, landing pages and custom headless ecommerce, designed, built and automated by Snaper Digital.",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${servicesUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Services", item: servicesUrl },
        ],
      },
      ...offerings.map((o) => ({
        "@type": "Service",
        "@id": `${servicesUrl}/#${o.id}`,
        name: o.name,
        description: o.description,
        provider: { "@id": orgId },
        areaServed: "Worldwide",
        url: `${servicesUrl}#${o.id}`,
      })),
      {
        "@type": "FAQPage",
        "@id": `${servicesUrl}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

/**
 * Builds the JSON-LD graph for a single /services/[slug] page: a Service node
 * (with its capabilities as an OfferCatalog), a BreadcrumbList, and a FAQPage
 * from the service's Q&A. Reuses the Organization @id for a connected graph.
 */
export function buildServiceDetailJsonLd(service: {
  id: string;
  kicker: string;
  metaDescription: string;
  deliverables: string[];
  faqs: { question: string; answer: string }[];
}) {
  const orgId = `${siteConfig.url}/#organization`;
  const url = `${siteConfig.url}/services/${service.id}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}/#service`,
        name: service.kicker,
        description: service.metaDescription,
        url,
        provider: { "@id": orgId },
        areaServed: "Worldwide",
        serviceType: service.kicker,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.kicker} deliverables`,
          itemListElement: service.deliverables.map((d) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: d },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${siteConfig.url}/services`,
          },
          { "@type": "ListItem", position: 3, name: service.kicker, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

/**
 * Builds the JSON-LD graph for the /about page: an AboutPage tied to the site's
 * Organization (with foundingDate and telephone), a BreadcrumbList, and a
 * FAQPage from the on-page Q&A. Reuses the Organization @id for a connected
 * graph.
 */
export function buildAboutJsonLd(faqs: { question: string; answer: string }[]) {
  const orgId = `${siteConfig.url}/#organization`;
  const aboutUrl = `${siteConfig.url}/about`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${aboutUrl}/#webpage`,
        url: aboutUrl,
        name: `About ${siteConfig.name}`,
        description:
          "The story, values and journey behind Snaper Digital, a small studio building conversion-focused websites and AI automation for businesses worldwide.",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phoneSchema,
        foundingDate: "2021",
        sameAs: Object.values(siteConfig.socials),
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${aboutUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "About", item: aboutUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${aboutUrl}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

/**
 * Builds the JSON-LD graph for the /pricing page: a WebPage tied to the site's
 * Organization, a BreadcrumbList, and a Service node per pricing tier carrying
 * an Offer with a min/max priceSpecification. Reuses the Organization @id.
 */
export function buildPricingJsonLd() {
  const orgId = `${siteConfig.url}/#organization`;
  const pricingUrl = `${siteConfig.url}/pricing`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pricingUrl}/#webpage`,
        url: pricingUrl,
        name: `Pricing | ${siteConfig.name}`,
        description:
          "Transparent, outcome-based pricing for websites and AI automation. Real-world ranges from shipped projects, with exact quotes confirmed after a short call.",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pricingUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Pricing", item: pricingUrl },
        ],
      },
      ...pricingTiers.map((tier) => ({
        "@type": "Service",
        "@id": `${pricingUrl}/#${tier.slug}`,
        name: tier.name,
        description: tier.summary,
        provider: { "@id": orgId },
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          url: pricingUrl,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: tier.min,
            maxPrice: tier.max,
          },
        },
      })),
    ],
  };
}

/**
 * Builds the JSON-LD graph for the /contact page: a ContactPage node tied to
 * the site's Organization, a BreadcrumbList, and a FAQPage from the on-page
 * Q&A. Reuses the Organization @id from the home graph for a connected graph.
 */
export function buildContactJsonLd(
  faqs: { question: string; answer: string }[]
) {
  const orgId = `${siteConfig.url}/#organization`;
  const contactUrl = `${siteConfig.url}/contact`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${contactUrl}/#webpage`,
        url: contactUrl,
        name: `Contact ${siteConfig.name}`,
        description:
          "Get in touch with Snaper Digital about a conversion-focused website or AI automation project.",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        email: siteConfig.email,
        sameAs: Object.values(siteConfig.socials),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phoneSchema,
          email: siteConfig.email,
          contactType: "Customer Service",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${contactUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact",
            item: contactUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${contactUrl}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };
}
