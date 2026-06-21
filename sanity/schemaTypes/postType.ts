import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const postType = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO & Social" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      description:
        'The address of the post, e.g. /blog/my-post. Click "Generate" to create it from the title.',
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (slug?.current && !/^[a-z0-9-]+$/.test(slug.current)) {
            return "Use lowercase letters, numbers and hyphens only.";
          }
          return true;
        }),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "A 1 to 2 sentence summary shown on cards and used as the default meta description.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) =>
        rule.max(200).warning("Keep the excerpt under 200 characters."),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      description: "The cover image shown at the top of the post and on cards.",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) =>
            rule.warning("Add alt text for accessibility and SEO."),
        }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature this post",
      description: "Highlight this post at the top of the blog.",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO & Social",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      date: "publishedAt",
      media: "mainImage",
    },
    prepare({ title, author, date, media }) {
      const when = date
        ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "No date";
      return {
        title,
        subtitle: author ? `${author} · ${when}` : when,
        media,
      };
    },
  },
});
