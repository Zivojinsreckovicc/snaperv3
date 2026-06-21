"use client";

/**
 * Sanity Studio config for the embedded Studio mounted at /studio
 * (see app/studio/[[...tool]]/page.tsx).
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "snaperdigital",
  title: "Snaper Digital",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // GROQ playground, available at /studio/vision
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
