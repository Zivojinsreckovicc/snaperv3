import { defineArrayMember, defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

/**
 * A grid of 2 to 6 images (before/after shots, screenshots, work samples).
 * For a single image use the regular Image block.
 */
export const imageGalleryType = defineType({
  name: "imageGallery",
  title: "Image gallery",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      validation: (rule) => rule.required().min(2).max(6),
      of: [
        defineArrayMember({
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
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "caption", subtitle: "alt", media: "asset" },
          },
        }),
      ],
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: {
        list: [
          { title: "2 columns", value: 2 },
          { title: "3 columns", value: 3 },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: 2,
    }),
    defineField({
      name: "caption",
      title: "Gallery caption",
      description: "Optional. Shown below the whole grid.",
      type: "string",
    }),
  ],
  preview: {
    select: { images: "images", caption: "caption", media: "images.0" },
    prepare({ images, caption, media }) {
      const count = Array.isArray(images) ? images.length : 0;
      return {
        title: caption || "Image gallery",
        subtitle: `${count} image${count === 1 ? "" : "s"}`,
        media,
      };
    },
  },
});
