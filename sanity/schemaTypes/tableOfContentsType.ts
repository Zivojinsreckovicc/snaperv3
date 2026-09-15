import { defineField, defineType } from "sanity";
import { OlistIcon } from "@sanity/icons";

/**
 * An auto-generated table of contents built from the article's headings.
 * Drop it wherever the list should appear (usually after the intro).
 */
export const tableOfContentsType = defineType({
  name: "tableOfContents",
  title: "Table of contents",
  type: "object",
  icon: OlistIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "In this article",
    }),
    defineField({
      name: "includeH3",
      title: "Include Heading 3 subheadings",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Table of contents", subtitle: "Generated from headings" };
    },
  },
});
