import { defineField, defineType } from "sanity";
import { RocketIcon } from "@sanity/icons";
import { ctaLinkFields } from "./shared";

/**
 * A call-to-action banner dropped into the blog body. The design lives in the
 * frontend (three fixed layouts); the editor controls every word and link.
 */
export const ctaBannerType = defineType({
  name: "ctaBanner",
  title: "CTA banner",
  type: "object",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Spotlight (centered, gradient ring + glow)", value: "spotlight" },
          { title: "Split (text left, button right)", value: "split" },
          { title: "Solid (bold brand gradient fill)", value: "solid" },
        ],
        layout: "radio",
      },
      initialValue: "spotlight",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "Optional small label above the heading, e.g. \"Free consultation\".",
      type: "string",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Ready to build something great?",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "text",
      title: "Supporting text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(260),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary button",
      type: "object",
      fields: ctaLinkFields,
      initialValue: { label: "Start a project", href: "/contact" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary button",
      description: "Optional. A quieter second action, e.g. \"See our work\".",
      type: "object",
      fields: ctaLinkFields,
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "showPhone",
      title: "Show the phone number",
      description: "Adds a \"Prefer to talk? Call us\" link next to the buttons.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "heading", variant: "variant", label: "primaryCta.label" },
    prepare({ title, variant, label }) {
      return {
        title: title || "CTA banner",
        subtitle: `CTA · ${variant || "spotlight"}${label ? ` · ${label}` : ""}`,
      };
    },
  },
});
