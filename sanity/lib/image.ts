import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Derive the accepted source type from the builder to avoid version-specific
// type subpaths.
type SanityImageSource = Parameters<typeof builder.image>[0];

/**
 * Image URL builder. Automatically applies editor-set hotspot/crop. Always
 * request the size you need, e.g. `urlFor(img).width(1200).height(630).url()`.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
