import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

type SanityImageValue = {
  asset?: { _ref?: string };
  alt?: string;
  lqip?: string;
  dimensions?: { width: number; height: number };
};

type SanityImageProps = {
  value: SanityImageValue | null | undefined;
  /** Rendered pixel width to request from the CDN. */
  width?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Override alt (otherwise uses the image's own alt). */
  alt?: string;
  /** Cover-fill mode — caller must provide a sized relative parent. */
  fill?: boolean;
};

/**
 * Renders a Sanity image through next/image: hotspot-aware URL, natural aspect
 * ratio from the asset metadata, and an LQIP blur-up placeholder. Pass `fill`
 * for cover thumbnails inside a fixed-aspect container.
 */
export function SanityImage({
  value,
  width = 1600,
  className,
  sizes = "(min-width: 1024px) 768px, 100vw",
  priority,
  alt,
  fill = false,
}: SanityImageProps) {
  if (!value?.asset?._ref) return null;

  const placeholder = value.lqip ? "blur" : "empty";

  if (fill) {
    return (
      <Image
        src={urlFor(value).width(width).auto("format").url()}
        alt={alt ?? value.alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
        placeholder={placeholder}
        blurDataURL={value.lqip}
      />
    );
  }

  const ratio = value.dimensions
    ? value.dimensions.height / value.dimensions.width
    : 9 / 16;
  const height = Math.round(width * ratio);

  return (
    <Image
      src={urlFor(value).width(width).height(height).fit("max").auto("format").url()}
      alt={alt ?? value.alt ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={cn("h-auto w-full", className)}
      placeholder={placeholder}
      blurDataURL={value.lqip}
    />
  );
}
