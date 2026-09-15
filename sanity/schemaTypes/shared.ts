import { defineArrayMember, defineField, type StringRule } from "sanity";
import { LinkIcon } from "@sanity/icons";

/**
 * Shared building blocks reused across body block types so every link, button
 * and "simple rich text" field behaves the same way in the Studio.
 */

/** Accepts internal paths ("/contact", "#faq") and full external URLs. */
export function hrefRule(rule: StringRule) {
  return rule.custom((value?: string) => {
    if (!value) return true;
    if (/^(\/|#|https?:\/\/|mailto:|tel:)/.test(value.trim())) return true;
    return "Use a site path like /contact or a full address like https://example.com";
  });
}

/** Label + destination for a button or call-to-action link. */
export const ctaLinkFields = [
  defineField({
    name: "label",
    title: "Button text",
    type: "string",
    validation: (rule) => rule.required().max(40),
  }),
  defineField({
    name: "href",
    title: "Link",
    description: "A page on this site (e.g. /contact) or a full URL.",
    type: "string",
    validation: (rule) => hrefRule(rule.required()),
  }),
  defineField({
    name: "openInNewTab",
    title: "Open in new tab",
    type: "boolean",
    initialValue: false,
  }),
];

/**
 * The inline "Link" annotation. Accepts both site paths and full URLs so an
 * editor can link to /contact without typing the whole domain.
 */
export const linkAnnotation = defineArrayMember({
  name: "link",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "href",
      title: "URL",
      description: "A page on this site (e.g. /contact) or a full URL.",
      type: "string",
      validation: (rule) => hrefRule(rule.required()),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

/**
 * A deliberately small rich-text block (paragraphs, lists, bold/italic, links)
 * for secondary copy such as FAQ answers and callout bodies.
 */
export const simpleBlock = defineArrayMember({
  type: "block",
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
    annotations: [linkAnnotation],
  },
});
