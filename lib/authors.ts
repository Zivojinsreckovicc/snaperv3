/**
 * Team / author profiles. Curated here (like `projects` and `pricingTiers`) so
 * the profile pages render polished, production-ready content independent of
 * CMS state, while each author's articles are still pulled live from Sanity by
 * matching slug. Keep these slugs in sync with the `author` documents in Studio
 * so post bylines link through correctly.
 */
export type AuthorSocial = { label: string; href: string };

export type AuthorProfile = {
  slug: string;
  name: string;
  /** Job title, e.g. "Founder & Web Engineer". */
  role: string;
  /** One-line positioning statement shown under the name. */
  tagline: string;
  /** Local profile photo in /public. Omit to render the monogram fallback. */
  image?: string;
  /** Two-letter monogram used when there's no photo. */
  initials: string;
  location: string;
  /** SEO meta description (<= ~160 chars). */
  metaDescription: string;
  /** About paragraphs. */
  bio: string[];
  /** Specialty chips. */
  expertise: string[];
  /** Qualitative highlight rail shown beside the intro. */
  highlights: { value: string; label: string }[];
  socials: AuthorSocial[];
};

export const authors: AuthorProfile[] = [
  {
    slug: "zivojin-sreckovic",
    name: "Zivojin Srećković",
    role: "Founder & Web Engineer",
    tagline:
      "I help businesses grow with fast, high-converting websites and smart automation.",
    image: "/imgs/zivojin-sreckovic.webp",
    initials: "ZS",
    location: "Obrenovac, Serbia",
    metaDescription:
      "Zivojin Srećković, founder of Snaper Digital — building fast, high-converting websites, AI chatbots and backend automations for businesses worldwide.",
    bio: [
      "I help businesses grow with fast, high-converting websites and smart automation.",
      "From clean, responsive web design to AI chatbots and backend automations, I build systems that save time, improve user experience, and scale as you do.",
      "As the founder of Snaper Digital, I work end-to-end — from strategy and design through development and deployment — for clients around the world.",
    ],
    expertise: [
      "Web Design",
      "Web Development",
      "Conversion Optimization",
      "AI Chatbots",
      "Backend Automation",
      "System Integrations",
      "Next.js",
      "Performance",
    ],
    highlights: [
      { value: "Web + AI", label: "Core focus" },
      { value: "End-to-end", label: "Design to deploy" },
      { value: "Worldwide", label: "Clients served" },
    ],
    socials: [],
  },
  {
    slug: "mihailo-dencev",
    name: "Mihailo Denčev",
    role: "SEO Analyst",
    tagline:
      "SEO for B2B SaaS and fintech — from content strategy to Generative Engine Optimization.",
    initials: "MD",
    location: "Working worldwide",
    metaDescription:
      "Mihailo Denčev, SEO Analyst at Snaper Digital specializing in B2B SaaS and fintech SEO: content strategy, on-page, keyword research, link building and GEO.",
    bio: [
      "SEO Analyst with experience in B2B SaaS and fintech SEO, specializing in content strategy, on-page optimization, keyword research, link building, and Generative Engine Optimization (GEO).",
      "I build search strategies that connect technical foundations to content that ranks — and increasingly, to how AI answer engines surface and cite that content.",
    ],
    expertise: [
      "Content Strategy",
      "On-Page Optimization",
      "Keyword Research",
      "Link Building",
      "Technical SEO",
      "Generative Engine Optimization (GEO)",
      "B2B SaaS",
      "Fintech",
    ],
    highlights: [
      { value: "B2B SaaS", label: "Industry focus" },
      { value: "Fintech", label: "Sector expertise" },
      { value: "GEO", label: "Next-gen search" },
    ],
    socials: [],
  },
];

export function getAuthor(slug: string): AuthorProfile | undefined {
  return authors.find((a) => a.slug === slug);
}

export const authorSlugs = authors.map((a) => a.slug);
