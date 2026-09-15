import { defineField, defineType } from "sanity";
import { ArrowRightIcon } from "@sanity/icons";
import { ctaLinkFields } from "./shared";

/**
 * A single standalone button in the flow of the article, for a lighter-weight
 * nudge than the full CTA banner.
 */
export const linkButtonType = defineType({
  name: "linkButton",
  title: "Button",
  type: "object",
  icon: ArrowRightIcon,
  fields: [
    ...ctaLinkFields,
    defineField({
      name: "variant",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Brand gradient", value: "gradient" },
          { title: "Outline", value: "outline" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "gradient",
    }),
    defineField({
      name: "align",
      title: "Alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "left",
    }),
  ],
  preview: {
    select: { title: "label", href: "href", variant: "variant" },
    prepare({ title, href, variant }) {
      return {
        title: title || "Button",
        subtitle: `Button · ${variant || "gradient"}${href ? ` · ${href}` : ""}`,
      };
    },
  },
});
