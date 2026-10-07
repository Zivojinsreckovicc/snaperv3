import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";
import { simpleBlock } from "./shared";

/**
 * One question + short rich-text answer. Shared by the in-article FAQ section
 * and the post's FAQ schema, so items can be copied between the two.
 */
export const faqItemType = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  icon: HelpCircleIcon,
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
});
