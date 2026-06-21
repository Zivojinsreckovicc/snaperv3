import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageIcon, LinkIcon } from "@sanity/icons";

/**
 * The blog body. Rich text with headings, lists, quotes, inline formatting,
 * links, and embedded images, so an editor can fully style an article without
 * touching code.
 */
export const blockContentType = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // Paragraph and heading styles offered in the editor toolbar.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Code", value: "code" },
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
    // Embedded images inside the article body.
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the image for accessibility and SEO.",
          validation: (rule) =>
            rule.warning("Add alt text for accessibility and SEO."),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional. Shown below the image.",
        }),
      ],
      preview: {
        select: { title: "caption", subtitle: "alt", media: "asset" },
      },
    }),
  ],
});
