import type { QueryParams } from "next-sanity";
import { client } from "./client";

/**
 * Thin fetch wrapper with ISR caching. Published content updates appear within
 * `revalidate` seconds. `tags` are still attached for optional manual/webhook
 * revalidation later, but don't disable the time-based refresh on their own.
 * Use `fresh: true` to bypass the CDN (static params).
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
  fresh = false,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
  fresh?: boolean;
}): Promise<T> {
  return client.withConfig({ useCdn: !fresh }).fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
