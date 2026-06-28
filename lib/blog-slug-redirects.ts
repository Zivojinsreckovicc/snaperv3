/**
 * Maps old static-site blog slugs (/blog/posts/{slug}) to Sanity slugs (/blog/{slug}).
 * Verified against snaperv3.vercel.app (2026-06-20).
 */
export const blogSlugRedirects: Record<string, string> = {
  // Slug changed in Sanity
  "website-design-mistakes": "website-design-mistakes-you-should-know-about",
  "landing-page-tips": "proven-landing-page-tips",
  "email-marketing-automation": "what-is-email-marketing-automation",
  "optimize-website-for-conversions": "how-to-optimize-your-website-for-conversions",
  "plan-a-website-structure": "how-to-plan-a-website-structure",
  "best-ecommerce-websites": "top-10-best-e-commerce-websites",

  // Same slug in Sanity
  "what-is-web-development": "what-is-web-development",
  "is-building-a-website-hard": "is-building-a-website-hard",
  "customer-service-automation": "customer-service-automation",
  "best-web-development-agencies": "best-web-development-agencies",
  "importance-of-website": "importance-of-website",
  "web-design-vs-development": "web-design-vs-development",
  "website-speed-and-seo": "website-speed-and-seo",

  // Old post not yet migrated — send to blog index
  "shopify-vs-custom": "/blog",
};
