import { defineField, defineType } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";
import { simpleBlock } from "./shared";

/**
 * A highlighted note box (tip, warning, etc.) inside the blog body.
 */
export const calloutType = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "tone",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Note", value: "info" },
          { title: "Tip", value: "tip" },
          { title: "Warning", value: "warning" },
          { title: "Success", value: "success" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      description: "Optional bold heading, e.g. \"Pro tip\".",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "array",
      of: [simpleBlock],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", tone: "tone", body: "body" },
    prepare({ title, tone, body }) {
      const firstText =
        Array.isArray(body) && body[0]?.children
          ? body[0].children.map((c: { text?: string }) => c.text ?? "").join("")
          : "";
      const label: Record<string, string> = {
        info: "Note",
        tip: "Tip",
        warning: "Warning",
        success: "Success",
      };
      return {
        title: title || firstText || "Callout",
        subtitle: `Callout · ${label[tone] ?? "Note"}`,
      };
    },
  },
});
