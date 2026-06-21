import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN for fast, cached published reads. Live Content API + revalidation keep
  // it fresh; fetches that must bypass it use `.withConfig({ useCdn: false })`.
  useCdn: true,
});
