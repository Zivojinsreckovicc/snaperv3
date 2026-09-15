import { defineField, defineType } from "sanity";
import { RemoveIcon } from "@sanity/icons";

/** A visual break between sections of an article. */
export const dividerType = defineType({
  name: "divider",
  title: "Divider",
  type: "object",
  icon: RemoveIcon,
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Line", value: "line" },
          { title: "Three dots", value: "dots" },
          { title: "Empty space", value: "space" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "line",
    }),
  ],
  preview: {
    select: { style: "style" },
    prepare({ style }) {
      const label: Record<string, string> = {
        line: "Line",
        dots: "Three dots",
        space: "Empty space",
      };
      return { title: "Divider", subtitle: label[style] ?? "Line" };
    },
  },
});
