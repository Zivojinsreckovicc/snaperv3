"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react";
import { SanityImage } from "./sanity-image";
import { urlFor } from "@/sanity/lib/image";
import { parseVideoUrl } from "@/lib/video-embed";
import type { SanityImageRef } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

export type VideoValue = {
  source?: "embed" | "upload";
  url?: string;
  file?: { url?: string } | null;
  autoplay?: boolean;
  poster?: SanityImageRef | null;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "9/16";
  title?: string;
  caption?: string;
};

const ratios: Record<NonNullable<VideoValue["aspectRatio"]>, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "9/16": "aspect-[9/16] max-w-sm mx-auto",
};

/**
 * Video block. Embeds are rendered as a click-to-play facade (poster + play
 * button) so no third-party iframe loads until the reader asks for it; the
 * iframe is only rendered up front when there is no poster to show.
 * Uploaded files use the native <video> element.
 */
export function BlogVideo({ value }: { value: VideoValue }) {
  const [playing, setPlaying] = useState(false);
  const ratio = ratios[value.aspectRatio ?? "16/9"];
  const label = value.title || value.caption || "Video";

  let media: React.ReactNode = null;

  if (value.source === "upload") {
    if (!value.file?.url) return null;
    media = (
      <video
        className="h-full w-full object-cover"
        src={value.file.url}
        poster={
          value.poster?.asset?._ref
            ? urlFor(value.poster).width(1280).auto("format").url()
            : undefined
        }
        controls={!value.autoplay}
        autoPlay={value.autoplay}
        loop={value.autoplay}
        muted={value.autoplay}
        playsInline
        preload={value.autoplay ? "auto" : "metadata"}
        aria-label={label}
      />
    );
  } else {
    const embed = parseVideoUrl(value.url);
    if (!embed) return null;

    const hasPoster = Boolean(value.poster?.asset?._ref || embed.thumbnail);
    const playerSrc = `${embed.src}&autoplay=1`;

    media =
      hasPoster && !playing ? (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${label}`}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {value.poster?.asset?._ref ? (
            <SanityImage
              value={value.poster}
              fill
              width={1280}
              sizes="(min-width: 1024px) 768px, 100vw"
              className="transition-transform duration-500 ease-[var(--ease-quart)] group-hover:scale-[1.03]"
            />
          ) : embed.thumbnail ? (
            <Image
              src={embed.thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover transition-transform duration-500 ease-[var(--ease-quart)] group-hover:scale-[1.03]"
            />
          ) : null}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-glow transition-transform duration-300 ease-[var(--ease-spring)] group-hover:scale-110"
          >
            <Play weight="fill" className="ml-0.5 h-6 w-6" />
          </span>
        </button>
      ) : (
        <iframe
          src={hasPoster ? playerSrc : embed.src}
          title={label}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      );
  }

  return (
    <figure className="my-8">
      <div
        className={cn(
          "relative overflow-hidden rounded-card border border-border bg-black shadow-soft",
          ratio
        )}
      >
        {media}
      </div>
      {value.caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
