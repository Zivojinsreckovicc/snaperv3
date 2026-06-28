/**
 * Central site configuration. Keeps brand strings, URLs and nav in one
 * place so metadata, SEO and layout stay consistent and easy to update.
 */
export const siteConfig = {
  name: "Snaper Digital",
  shortName: "Snaper",
  // Update to the production domain before launch; used by metadataBase
  // and canonical/OG URLs across the site.
  url: "https://snaperdigital.com",
  locale: "en_US",
  // Google Analytics 4 measurement ID (carried over from the previous site).
  gaId: "G-76QZVV1FWE",
  description:
    "Snaper Digital builds modern, conversion-focused websites and practical AI automation systems that help businesses get more leads and save time.",
  tagline: "Modern websites & AI automation that drive real business results.",
  // Concise home/default <title> (50 chars, within the 50-60 SEO target).
  seoTitle: "Snaper Digital | Web Design & AI Automation Agency",
  ogImage: "/imgs/logo.webp",
  logo: "/imgs/logo.webp",
  twitter: "@snaperdigital",
  email: "team@snaperdigital.com",
  phone: "+381 63 284 701",
  // Schema.org / structured-data telephone format.
  phoneSchema: "+381-63-284-701",
  // E.164-style href target for tel: links (no spaces).
  phoneHref: "tel:+38163284701",
  location: "Obrenovac, Serbia",
  address: {
    street: "Topolice 9",
    city: "Obrenovac",
    postalCode: "21000",
    country: "Serbia",
  },
  // Working remotely with clients worldwide.
  socials: {
    x: "https://x.com/snaperdigital",
    linkedin: "https://www.linkedin.com/company/snaper-digital/",
    instagram: "https://instagram.com/snaper.digital",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Optional dropdown sub-items (e.g. the Services menu). */
  children?: NavItem[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "Brand & Creative", href: "/services/branding" },
      { label: "Landing Pages", href: "/services/landing-pages" },
      { label: "Headless Ecommerce", href: "/services/ecommerce" },
      { label: "All Services", href: "/services" },
    ],
  },
];

// Single locked label for the "contact" CTA intent. Reused in the nav,
// hero, sections and footer so the page never ships duplicate CTA intent.
export const contactCta = { label: "Start a project", href: "/contact" };

export type Service = {
  slug: string;
  title: string;
  description: string;
};

/**
 * Canonical service list (from AGENTS.md). Drives future /services pages,
 * Service JSON-LD and navigation without duplicating copy.
 */
export const services: Service[] = [
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    description:
      "Custom websites built with modern technology, strong visual design and clear business goals, from landing pages to full marketing sites.",
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    description:
      "Automation systems that cut manual work: workflow and CRM automation, lead handling, AI-assisted processes and tool integrations.",
  },
  {
    slug: "branding-creative-direction",
    title: "Branding & Creative Direction",
    description:
      "Visual identity, design systems and digital assets that make businesses look more professional and instantly recognizable.",
  },
  {
    slug: "consulting",
    title: "Consulting",
    description:
      "Strategic guidance for improving your website, digital systems, marketing structure and automation setup.",
  },
];
