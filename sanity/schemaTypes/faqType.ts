import { defineArrayMember, defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";
import { simpleBlock } from "./shared";

/**
 * An FAQ section embedded in the blog body. Content is authored here; the
 * frontend renders it as a styled, collapsible accordion (and emits FAQPage
 * JSON-LD). Each item is a question plus a short rich-text answer.
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
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "array",
              validation: (rule) => rule.required(),
              // Keep answers simple: paragraphs, lists, and inline emphasis.
              of: [simpleBlock],
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        }),
      ],
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
