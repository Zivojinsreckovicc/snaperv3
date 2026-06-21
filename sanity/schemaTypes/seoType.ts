import { defineField, defineType } from "sanity";
import { SearchIcon } from "@sanity/icons";

/**
 * Reusable SEO metadata object. Every field is optional and falls back to the
 * post's own content (title, excerpt, main image) in the GROQ query, so an
 * editor only fills these in to override the defaults.
 */
export const seoType = defineType({
  name: "seo",
  title: "SEO & Social",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      description:
        "Overrides the browser tab + Google title. Aim for 50 to 60 characters. Leave blank to use the post title.",
      type: "string",
      validation: (rule) =>
        rule.max(60).warning("Keep the meta title under 60 characters."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      description:
        "The snippet shown under the title in search results. Aim for 140 to 160 characters. Leave blank to use the excerpt.",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning("Keep the meta description under 160 characters."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      description:
        "Shown when the post is shared on social media. 1200 x 630 recommended. Leave blank to use the main image.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      description:
        "Advanced: only set this if this content lives primarily on another URL.",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["https", "http"] }).warning("Use a full https URL."),
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      description:
        "Turn on to stop Google from indexing this post (it stays live on the site).",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
