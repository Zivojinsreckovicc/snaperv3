import { defineArrayMember, defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

type FaqItemValue = { question?: string };
type BodyBlock = {
  _type?: string;
  children?: { text?: string }[];
  items?: FaqItemValue[];
};

/** Lowercase, punctuation-free text so "Do I need X?" matches "do i need x". */
function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** Every question an FAQ section shows, plus the text of every paragraph and heading. */
function visibleText(body: BodyBlock[] = []) {
  return body
    .flatMap((block) => {
      if (block._type === "faqSection") {
        return (block.items ?? []).map((item) => item.question ?? "");
      }
      if (block._type === "block") {
        return [(block.children ?? []).map((c) => c.text ?? "").join("")];
      }
      return [];
    })
    .map(normalize)
    .join(" | ");
}

/**
 * Controls the FAQPage structured data for a post. "Automatic" (the default)
 * builds it from the FAQ section(s) in the article, so nothing needs filling
 * in. "Custom" lets an editor write the schema questions by hand, for posts
 * whose FAQ is written as plain headings instead of an FAQ section block.
 */
export const faqSchemaType = defineType({
  name: "faqSchema",
  title: "FAQ schema",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "mode",
      title: "FAQ schema",
      description:
        "Adds FAQPage structured data so Google and AI search engines can read this post's questions and answers.",
      type: "string",
      initialValue: "auto",
      options: {
        layout: "radio",
        list: [
          {
            title: "Automatic: use the FAQ section in the article",
            value: "auto",
          },
          { title: "Custom: write the questions below", value: "custom" },
          { title: "Off: don't add FAQ schema to this post", value: "off" },
        ],
      },
    }),
    defineField({
      name: "items",
      title: "Questions",
      description:
        "Google requires every question here to also be visible on the page. Copy them from the article's FAQ, word for word.",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
      hidden: ({ parent }) => parent?.mode !== "custom",
      validation: (rule) => [
        rule.custom((items: FaqItemValue[] | undefined, context) => {
          const mode = (context.parent as { mode?: string } | undefined)?.mode;
          if (mode !== "custom" || items?.length) return true;
          return 'Add at least one question, or switch to "Automatic".';
        }),
        rule
          .custom((items: FaqItemValue[] | undefined, context) => {
            const mode = (context.parent as { mode?: string } | undefined)?.mode;
            if (mode !== "custom" || !items?.length) return true;
            const text = visibleText(context.document?.body as BodyBlock[]);
            const missing = items
              .map((item) => item.question?.trim())
              .filter((q): q is string => !!q && !text.includes(normalize(q)));
            if (!missing.length) return true;
            return `Not found in the article: "${missing.join('", "')}". Google may ignore FAQ schema that doesn't match the page.`;
          })
          .warning(),
      ],
    }),
  ],
});
