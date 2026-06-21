/**
 * Canonical pricing tiers. Single source of truth for the /pricing page UI and
 * its Service/Offer JSON-LD, so displayed ranges and structured data never
 * drift. Ranges are real-world, not final quotes.
 */
export type PricingTier = {
  slug: string;
  name: string;
  /** Displayed price range, already formatted (en dash for the range). */
  priceFrom: string;
  priceTo: string;
  /** e.g. "/mo" for the retainer. */
  priceSuffix?: string;
  /** Short delivery / cadence line. */
  delivery: string;
  /** One-line positioning under the name. */
  summary: string;
  features: string[];
  /** Contextual CTA label provided per tier. */
  cta: string;
  /** Numeric bounds (USD) for JSON-LD priceSpecification. */
  min: number;
  max: number;
  /** Highlighted "most popular" tier. */
  featured?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    slug: "launch-page",
    name: "Launch Page",
    priceFrom: "$1,500",
    priceTo: "$2,500",
    delivery: "Delivered in 5–7 days",
    summary: "One sharp, high-converting page to get to market fast.",
    features: [
      "1 high-converting landing page",
      "Speed-optimized build",
      "Basic automations",
      "CRM integration",
      "Mobile responsive",
    ],
    cta: "Talk About Your Launch Page",
    min: 1500,
    max: 2500,
  },
  {
    slug: "website-system",
    name: "Website System",
    priceFrom: "$3,500",
    priceTo: "$8,500",
    delivery: "Delivered in 2–3 weeks",
    summary: "A full marketing site built to capture and convert leads.",
    features: [
      "5–7 page website",
      "UX-first design",
      "Lead capture setup",
      "CRM integration",
      "Basic automations",
    ],
    cta: "Talk About a Website System",
    min: 3500,
    max: 8500,
    featured: true,
  },
  {
    slug: "growth-engine",
    name: "Growth Engine",
    priceFrom: "$8,500",
    priceTo: "$15,000",
    delivery: "Delivered in 3–6 weeks",
    summary: "Website, funnel and automation working as one revenue system.",
    features: [
      "Full website + funnel",
      "Advanced automations",
      "CRM buildout",
      "AI follow-up sequences",
      "Analytics dashboard",
      "Conversion optimization",
    ],
    cta: "Talk About a Growth Engine",
    min: 8500,
    max: 15000,
  },
  {
    slug: "monthly-retainers",
    name: "Monthly Retainers",
    priceFrom: "$150",
    priceTo: "$2,500",
    priceSuffix: "/mo",
    delivery: "Ongoing support",
    summary: "Keep everything fast, current and improving every month.",
    features: [
      "Hosting & updates",
      "Speed optimization",
      "Reporting dashboard",
      "Priority support",
      "New automations monthly",
    ],
    cta: "Talk About a Retainer",
    min: 150,
    max: 2500,
  },
];
