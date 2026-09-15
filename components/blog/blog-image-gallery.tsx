import { SanityImage } from "./sanity-image";
import type { SanityImageRef } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

export type ImageGalleryValue = {
  images?: (SanityImageRef & { _key: string })[];
  columns?: 2 | 3;
  caption?: string;
};

/** A 2 or 3 column image grid with optional per-image and gallery captions. */
export function BlogImageGallery({ value }: { value: ImageGalleryValue }) {
  const images = value?.images?.filter((img) => img?.asset?._ref) ?? [];
  if (!images.length) return null;
  const columns = value.columns === 3 ? 3 : 2;

  return (
    <figure className="my-8">
      <div
        className={cn(
          "grid gap-3 sm:gap-4",
          columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
        )}
      >
        {images.map((image) => (
          <figure key={image._key} className="min-w-0">
            <div className="overflow-hidden rounded-card border border-border">
              <SanityImage
                value={image}
                width={columns === 3 ? 640 : 900}
                sizes={
                  columns === 3
                    ? "(min-width: 1024px) 256px, 50vw"
                    : "(min-width: 1024px) 384px, 100vw"
                }
              />
            </div>
            {image.caption ? (
              <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
      {value.caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
