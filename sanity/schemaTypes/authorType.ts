import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / title",
      description: 'e.g. "Founder" or "Content Lead".',
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Profile photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) =>
            rule.warning("Add alt text for accessibility and SEO."),
        }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "link",
      title: "Profile link",
      description: "Optional. LinkedIn, X or personal site.",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https", "http"] }),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
