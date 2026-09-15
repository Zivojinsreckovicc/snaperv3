import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon, HighlightIcon, ImageIcon } from "@sanity/icons";
import { hrefRule, linkAnnotation } from "./shared";

/**
 * The blog body. Rich text with headings, lists, quotes, inline formatting,
 * links, and a set of designed blocks (images, video, CTA banners, callouts,
 * code, tables, FAQs, and more) so an editor can build a complete article
 * without touching code. The look of each block lives in components/blog/.
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
        { title: "Checklist", value: "check" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strikethrough", value: "strike-through" },
          { title: "Highlight", value: "highlight", icon: HighlightIcon },
          { title: "Code", value: "code" },
        ],
        annotations: [
          linkAnnotation,
          // Link to another blog post: resolved to /blog/<slug> at query time,
          // so links never break when a slug changes.
          defineArrayMember({
            name: "internalLink",
            title: "Link to another post",
            type: "object",
            icon: DocumentTextIcon,
            fields: [
              defineField({
                name: "reference",
                title: "Post",
                type: "reference",
                to: [{ type: "post" }],
                validation: (rule) => rule.required(),
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
        defineField({
          name: "link",
          title: "Link",
          type: "string",
          description: "Optional. Makes the image clickable (site path or full URL).",
          validation: (rule) => hrefRule(rule),
        }),
      ],
      preview: {
        select: { title: "caption", subtitle: "alt", media: "asset" },
      },
    }),
    // A 2 to 6 image grid.
    defineArrayMember({ type: "imageGallery" }),
    // YouTube / Vimeo / Loom embed or uploaded file.
    defineArrayMember({ type: "video" }),
    // Designed call-to-action banner (layout in code, copy in Sanity).
    defineArrayMember({ type: "ctaBanner" }),
    // A single standalone button.
    defineArrayMember({ type: "linkButton" }),
    // Highlighted note / tip / warning box.
    defineArrayMember({ type: "callout" }),
    // Large attributed quote.
    defineArrayMember({ type: "pullQuote" }),
    // Syntax-highlighted code (from @sanity/code-input).
    defineArrayMember({
      type: "code",
      title: "Code block",
      options: {
        withFilename: true,
        language: "typescript",
        languageAlternatives: [
          { title: "TypeScript", value: "typescript" },
          { title: "JavaScript", value: "javascript" },
          { title: "TSX / JSX", value: "tsx" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "JSON", value: "json" },
          { title: "Shell", value: "sh" },
          { title: "Python", value: "python" },
          { title: "SQL", value: "sql" },
          { title: "Markdown", value: "markdown" },
          { title: "Plain text", value: "text" },
        ],
      },
    }),
    // Data tables (from @sanity/table): spreadsheet-style editing in Studio.
    defineArrayMember({ type: "table" }),
    // Styled, collapsible FAQ sections (rendered by the frontend).
    defineArrayMember({ type: "faqSection" }),
    // Auto-generated list of the article's headings.
    defineArrayMember({ type: "tableOfContents" }),
    // Visual section break.
    defineArrayMember({ type: "divider" }),
    // Escape hatch for third-party widgets.
    defineArrayMember({ type: "htmlEmbed" }),
  ],
});
