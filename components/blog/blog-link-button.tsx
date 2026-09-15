import { CtaLink } from "@/components/ui/cta-link";
import { cn } from "@/lib/utils";

export type LinkButtonValue = {
  label?: string;
  href?: string;
  openInNewTab?: boolean;
  variant?: "gradient" | "outline";
  align?: "left" | "center";
};

/** A single standalone button in the article flow. */
export function BlogLinkButton({ value }: { value: LinkButtonValue }) {
  if (!value?.label || !value?.href) return null;
  return (
    <div
      className={cn(
        "my-8 flex",
        value.align === "center" ? "justify-center" : "justify-start"
      )}
    >
      <CtaLink
        href={value.href}
        variant={value.variant === "outline" ? "outline" : "gradient"}
        openInNewTab={value.openInNewTab}
      >
        {value.label}
      </CtaLink>
    </div>
  );
}
