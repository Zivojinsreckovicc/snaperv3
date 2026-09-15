import { defineField, defineType } from "sanity";
import { CodeBlockIcon } from "@sanity/icons";

/**
 * Raw HTML embed for third-party widgets (X posts, CodePen, Typeform, maps).
 * Only trusted editors have Studio access: the code is rendered as-is.
 */
export const htmlEmbedType = defineType({
  name: "htmlEmbed",
  title: "Embed (HTML)",
  type: "object",
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description: "For your reference in the editor only, e.g. \"Tweet from client\".",
      type: "string",
    }),
    defineField({
      name: "html",
      title: "Embed code",
      description:
        "Paste the embed code from X, CodePen, Typeform, Google Maps, etc. Scripts inside the snippet will run.",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", html: "html" },
    prepare({ title, html }) {
      const host = typeof html === "string" ? html.match(/https?:\/\/([^/"'\s]+)/)?.[1] : undefined;
      return {
        title: title || host || "HTML embed",
        subtitle: title && host ? `Embed · ${host}` : "Embed",
      };
    },
  },
});
