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
  email: "team@snaperdigital.com",
  phone: "+381 63 284 701",
  // Schema.org / structured-data telephone format.
  phoneSchema: "+381-63-284-701",
  // E.164-style href target for tel: links (no spaces).
  phoneHref: "tel:+38163284701",
  location: "Belgrade, Serbia",
  address: {
    street: "Topolice 9",
    city: "Belgrade",
    postalCode: "11000",
    country: "Serbia",
  },
  // Working remotely with clients worldwide.
  socials: {
    linkedin: "https://www.linkedin.com/company/snaper-digital/",
    instagram: "https://instagram.com/snaper.digital",
    youtube: "https://www.youtube.com/@SnaperDigital",
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

/**
 * Home page brand film (YouTube). Shared by the player section and the
 * VideoObject JSON-LD so the two never drift apart.
 */
export const brandFilm = {
  youtubeId: "9NwZMX5j31k",
  title: "Another Tool Won't Grow Your Business",
  description:
    "This 90-second brand film sums up how we work. Your website should guide the right people, answer the right questions and turn attention into action. Your brand should feel unmistakably yours. Behind the scenes, your business should run just as intelligently: leads captured the moment they arrive, follow-ups sent when they matter, and data moving between your tools without another spreadsheet.",
  uploadDate: "2026-10-23T04:24:44-07:00",
  // ISO 8601 for JSON-LD, plus the human label shown in the caption.
  duration: "PT1M33S",
  durationLabel: "1:33",
  thumbnail: "https://i.ytimg.com/vi/9NwZMX5j31k/maxresdefault.jpg",
} as const;

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
