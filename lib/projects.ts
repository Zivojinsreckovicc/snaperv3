/**
 * Canonical portfolio / case-study list. Single source of truth for the home
 * "Selected Work" gallery and the standalone /work page, so screenshots, copy
 * and results never drift apart. Extend with real case studies over time.
 */
export type Project = {
  /** Screenshot in /public/imgs/portfolioimages. */
  src: string;
  /** Live domain — doubles as the browser-frame address label. */
  url: string;
  title: string;
  /** Filterable category (keep to the finite set used by the /work filters). */
  category: ProjectCategory;
  /** One-line summary used under the screenshot. */
  blurb: string;
  /** Headline outcome shown on the /work cards to build trust. */
  result: string;
  /** Capabilities delivered — rendered as tags on the /work page. */
  tags: string[];
  /** Delivery year. */
  year: number;
  /** Highlighted on the home gallery / featured slots. */
  featured?: boolean;
};

export type ProjectCategory =
  | "Fintech"
  | "SaaS"
  | "Real Estate"
  | "Consulting"
  | "Education";

export const projects: Project[] = [
  {
    src: "/imgs/portfolioimages/mtxfinance.webp",
    url: "mtxfinance.com",
    title: "MTX Finance",
    category: "Fintech",
    blurb:
      "A high-trust fintech site engineered for speed, clarity and conversions.",
    result: "+72% qualified leads",
    tags: ["Web Design", "Development", "SEO"],
    year: 2025,
    featured: true,
  },
  {
    src: "/imgs/portfolioimages/breinrock.webp",
    url: "breinrock.com",
    title: "Breinrock",
    category: "SaaS",
    blurb: "Bold product marketing with a sharp, modern edge and crisp motion.",
    result: "2.1x demo signups",
    tags: ["Web Design", "Development", "Motion"],
    year: 2025,
    featured: true,
  },
  {
    src: "/imgs/portfolioimages/dominioneurope.webp",
    url: "dominioneurope.com",
    title: "Dominion Europe",
    category: "Real Estate",
    blurb:
      "A premium property brand with a refined, editorial feel end to end.",
    result: "+48% inquiry rate",
    tags: ["Branding", "Web Design", "Development"],
    year: 2024,
    featured: true,
  },
  {
    src: "/imgs/portfolioimages/ismglobal.webp",
    url: "ismglobal.com",
    title: "ISM Global",
    category: "Consulting",
    blurb: "A corporate site structured to build authority and convert leads.",
    result: "+90% organic traffic",
    tags: ["Web Design", "Development", "SEO"],
    year: 2024,
  },
  {
    src: "/imgs/portfolioimages/neranekretnine.webp",
    url: "neranekretnine.com",
    title: "Nera Nekretnine",
    category: "Real Estate",
    blurb: "A fast, clean listings experience built to drive direct inquiries.",
    result: "3.4x direct inquiries",
    tags: ["Web Design", "Development"],
    year: 2025,
  },
  {
    src: "/imgs/portfolioimages/akademiapro.webp",
    url: "akademiapro.com",
    title: "Akademia Pro",
    category: "Education",
    blurb:
      "A course platform designed to turn visitors into enrolled students.",
    result: "+58% course enrollments",
    tags: ["Web Design", "Development", "Automation"],
    year: 2024,
  },
];

/** Distinct categories, in display order, for the /work filter bar. */
export const projectCategories = [
  "Fintech",
  "SaaS",
  "Real Estate",
  "Consulting",
  "Education",
] as const satisfies readonly ProjectCategory[];
