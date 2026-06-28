import type { Redirect } from "next/dist/lib/load-custom-routes";
import { blogSlugRedirects } from "./blog-slug-redirects";

/**
 * 301 redirects from the previous static snaperdigital.com URL structure to the
 * Next.js App Router paths. Only routes whose paths changed are listed here —
 * /work, /pricing, and /blog already match the new site.
 */
const blogPostRedirects: Redirect[] = Object.entries(blogSlugRedirects).flatMap(
  ([oldSlug, destination]) => {
    const dest = destination.startsWith("/") ? destination : `/blog/${destination}`;
    return [
      { source: `/blog/posts/${oldSlug}`, destination: dest, permanent: true },
      { source: `/blog/posts/${oldSlug}.html`, destination: dest, permanent: true },
    ];
  }
);

export const legacyRedirects: Redirect[] = [
  // About (old path used -en suffix)
  { source: "/about-en", destination: "/about", permanent: true },
  { source: "/about-en.html", destination: "/about", permanent: true },

  // Services hub (old site used services-en.html)
  { source: "/services-en", destination: "/services", permanent: true },
  { source: "/services-en.html", destination: "/services", permanent: true },

  // Service landings lived at the root on the old site
  { source: "/web-development", destination: "/services/web-development", permanent: true },
  { source: "/web-development.html", destination: "/services/web-development", permanent: true },
  { source: "/ai-automation", destination: "/services/ai-automation", permanent: true },
  { source: "/ai-automation.html", destination: "/services/ai-automation", permanent: true },
  { source: "/seo-optimisation", destination: "/services", permanent: true },
  { source: "/seo-optimisation.html", destination: "/services", permanent: true },

  // Contact & home (.html variants from the static build)
  { source: "/contact.html", destination: "/contact", permanent: true },
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/work.html", destination: "/work", permanent: true },
  { source: "/pricing.html", destination: "/pricing", permanent: true },

  // Blog index
  { source: "/blog/index.html", destination: "/blog", permanent: true },

  // Blog posts — explicit old slug → Sanity slug (see blog-slug-redirects.ts)
  ...blogPostRedirects,

  // Legal
  {
    source: "/policies/privacy-cookie-policy.html",
    destination: "/privacy",
    permanent: true,
  },
  {
    source: "/policies/privacy-cookie-policy",
    destination: "/privacy",
    permanent: true,
  },
];
