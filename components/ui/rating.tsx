import { Star, StarHalf } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

type RatingProps = {
  /** Score out of 5, e.g. 4.9. Rounded to the nearest half star. */
  value?: number;
  /** Star size in px. */
  size?: number;
  className?: string;
  /** Accessible label override. */
  label?: string;
};

/**
 * Star rating display. Renders full / half / empty stars for a 0-5 score and
 * carries an accessible label. Server component (uses the /ssr Phosphor entry).
 */
export function Rating({ value = 5, size = 16, className, label }: RatingProps) {
  const rounded = Math.round(value * 2) / 2;
  const aria = label ?? `Rated ${value} out of 5`;

  return (
    <span
      role="img"
      aria-label={aria}
      className={cn("inline-flex items-center gap-0.5 text-accent", className)}
      style={{ fontSize: 0 }}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const position = i + 1;
        if (rounded >= position) {
          return (
            <Star
              key={i}
              weight="fill"
              aria-hidden="true"
              style={{ width: size, height: size }}
            />
          );
        }
        if (rounded >= position - 0.5) {
          return (
            <span key={i} className="relative inline-flex">
              <Star
                weight="regular"
                aria-hidden="true"
                className="opacity-30"
                style={{ width: size, height: size }}
              />
              <StarHalf
                weight="fill"
                aria-hidden="true"
                className="absolute inset-0"
                style={{ width: size, height: size }}
              />
            </span>
          );
        }
        return (
          <Star
            key={i}
            weight="regular"
            aria-hidden="true"
            className="opacity-30"
            style={{ width: size, height: size }}
          />
        );
      })}
    </span>
  );
}
