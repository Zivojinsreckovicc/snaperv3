import Image from "next/image";
import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  src: string;
  alt: string;
  /** Address-bar label, e.g. a client domain. */
  url?: string;
  priority?: boolean;
  sizes?: string;
  /** Tailwind aspect-ratio class for the viewport area. */
  aspect?: string;
  className?: string;
};

/**
 * A macOS-style browser window wrapping a real screenshot, built with the
 * double-bezel technique (outer machined shell + inner core) for premium
 * physical depth. Server component — pure markup + next/image.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  aspect = "aspect-[16/10]",
  className,
}: BrowserFrameProps) {
  return (
    // Outer shell
    <div
      className={cn(
        "rounded-[1.75rem] border border-border-strong/70 bg-muted/60 p-2 shadow-glow backdrop-blur-sm",
        className
      )}
    >
      {/* Inner core */}
      <div className="overflow-hidden rounded-[1.35rem] border border-border bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b border-border bg-background-subtle/80 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          </div>
          {url ? (
            <div className="mx-auto truncate rounded-md bg-muted px-3 py-1 font-mono text-[11px] text-muted-foreground">
              {url}
            </div>
          ) : null}
        </div>
        {/* Viewport */}
        <div className={cn("relative w-full", aspect)}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
