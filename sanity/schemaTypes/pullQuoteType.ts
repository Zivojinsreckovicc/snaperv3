import { defineField, defineType } from "sanity";
import { BlockquoteIcon } from "@sanity/icons";

/**
 * A large, attributed quote (client testimonial, expert line) that breaks up
 * the reading column. For an unattributed inline quote use the "Quote" text
 * style instead.
 */
export const pullQuoteType = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "attribution",
      title: "Who said it",
      description: "Optional, e.g. \"Sarah Jones\".",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role / company",
      description: "Optional, e.g. \"Founder, Acme\".",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "quote", subtitle: "attribution" },
    prepare({ title, subtitle }) {
      return {
        title: title ? `“${title}”` : "Pull quote",
        subtitle: subtitle ? `Pull quote · ${subtitle}` : "Pull quote",
      };
    },
  },
});
