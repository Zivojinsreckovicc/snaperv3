import { defineArrayMember, defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

/**
 * An FAQ section embedded in the blog body. Content is authored here; the
 * frontend renders it as a styled, collapsible accordion. Its questions also
 * feed the post's FAQPage schema while the FAQ Schema tab is on "Automatic".
 */
export const faqType = defineType({
  name: "faqSection",
  title: "FAQ section",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Optional. Shown above the questions (e.g. \"Frequently asked questions\").",
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [defineArrayMember({ type: "faqItem" })],
    }),
  ],
  preview: {
    select: { heading: "heading", items: "items" },
    prepare({ heading, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: heading || "FAQ section",
        subtitle: `${count} question${count === 1 ? "" : "s"}`,
      };
    },
  },
});
