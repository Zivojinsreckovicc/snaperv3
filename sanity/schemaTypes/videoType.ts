import { defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

const EMBED_HOSTS = /(youtube\.com|youtu\.be|vimeo\.com|loom\.com)/i;

/**
 * A video in the blog body. Either a YouTube / Vimeo / Loom link (rendered as
 * a click-to-play embed so the page stays fast) or an uploaded video file.
 */
export const videoType = defineType({
  name: "video",
  title: "Video",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "YouTube / Vimeo / Loom link", value: "embed" },
          { title: "Upload a video file", value: "upload" },
        ],
        layout: "radio",
      },
      initialValue: "embed",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Video link",
      description: "Paste the normal share link, e.g. https://youtu.be/abc123",
      type: "url",
      hidden: ({ parent }) => parent?.source !== "embed",
      validation: (rule) =>
        rule.uri({ scheme: ["https", "http"] }).custom((value, context) => {
          const parent = context.parent as { source?: string } | undefined;
          if (parent?.source !== "embed") return true;
          if (!value) return "Paste a YouTube, Vimeo or Loom link.";
          if (!EMBED_HOSTS.test(value)) {
            return "Only YouTube, Vimeo and Loom links are supported.";
          }
          return true;
        }),
    }),
    defineField({
      name: "file",
      title: "Video file",
      description: "MP4 or WebM. Keep files small (under ~20 MB) for fast loading.",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.source !== "upload",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { source?: string } | undefined;
          if (parent?.source === "upload" && !value?.asset) {
            return "Upload a video file.";
          }
          return true;
        }),
    }),
    defineField({
      name: "autoplay",
      title: "Autoplay silently (loop, no controls)",
      description: "Good for short demo clips. Plays muted, like a GIF.",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.source !== "upload",
    }),
    defineField({
      name: "poster",
      title: "Thumbnail",
      description:
        "Shown before the video plays. Optional for YouTube links (the YouTube thumbnail is used automatically).",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect ratio",
      type: "string",
      options: {
        list: [
          { title: "16:9 (landscape)", value: "16/9" },
          { title: "4:3", value: "4/3" },
          { title: "1:1 (square)", value: "1/1" },
          { title: "9:16 (vertical)", value: "9/16" },
        ],
        layout: "radio",
      },
      initialValue: "16/9",
    }),
    defineField({
      name: "title",
      title: "Title",
      description: "Short accessible name for the video (read by screen readers).",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      description: "Optional. Shown below the video.",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", caption: "caption", url: "url", source: "source", media: "poster" },
    prepare({ title, caption, url, source, media }) {
      return {
        title: title || caption || (source === "upload" ? "Uploaded video" : url) || "Video",
        subtitle: source === "upload" ? "Video · uploaded file" : "Video · embed",
        media: media || PlayIcon,
      };
    },
  },
});
