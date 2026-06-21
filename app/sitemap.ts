import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { POSTS_SITEMAP_QUERY } from "@/sanity/lib/queries";
import { serviceSlugs } from "@/lib/services-data";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/work",
    "/pricing",
    "/about",
    "/contact",
    "/blog",
    ...serviceSlugs.map((slug) => `/services/${slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  let posts: MetadataRoute.Sitemap = [];
  try {
    const data = await client
      .withConfig({ useCdn: false })
      .fetch<{ slug: string; _updatedAt: string }[]>(POSTS_SITEMAP_QUERY);
    posts = (data ?? []).map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // If Sanity is unreachable at build time, still emit the static routes.
    posts = [];
  }

  return [...staticRoutes, ...posts];
}
