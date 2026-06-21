/**
 * Embedded Sanity Studio, mounted at /studio. This catch-all route hands all
 * /studio/* paths to the Studio app. Forced dynamic + noindex so it is never
 * statically prerendered or crawled.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
