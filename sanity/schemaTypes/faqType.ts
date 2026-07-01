import { defineArrayMember, defineField, defineType } from "sanity";
import { HelpCircleIcon, LinkIcon } from "@sanity/icons";

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
              of: [
                defineArrayMember({
                  type: "block",
                  // Keep answers simple: paragraphs, lists, and inline emphasis.
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [
                    { title: "Bullet", value: "bullet" },
                    { title: "Numbered", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                    ],
                    annotations: [
                      defineArrayMember({
                        name: "link",
                        title: "Link",
                        type: "object",
                        icon: LinkIcon,
                        fields: [
                          defineField({
                            name: "href",
                            title: "URL",
                            type: "url",
                            validation: (rule) =>
                              rule
                                .required()
                                .uri({ scheme: ["https", "http", "mailto", "tel"] }),
                          }),
                          defineField({
                            name: "openInNewTab",
                            title: "Open in new tab",
                            type: "boolean",
                            initialValue: false,
                          }),
                        ],
                      }),
                    ],
                  },
                }),
              ],
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
