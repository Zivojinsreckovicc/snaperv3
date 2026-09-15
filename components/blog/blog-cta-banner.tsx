import Link from "next/link";
import { ArrowRight, Phone } from "@phosphor-icons/react/ssr";
import { CtaLink } from "@/components/ui/cta-link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type CtaLinkValue = {
  label?: string;
  href?: string;
  openInNewTab?: boolean;
};

export type CtaBannerValue = {
  variant?: "spotlight" | "split" | "solid";
  eyebrow?: string;
  heading?: string;
  text?: string;
  primaryCta?: CtaLinkValue;
  secondaryCta?: CtaLinkValue;
  showPhone?: boolean;
};

/**
 * Designed call-to-action banner for the blog body. Three fixed layouts; all
 * copy and links come from Sanity. The heading is a <p> on purpose so a
 * promotional block never pollutes the article's heading outline.
 */
export function BlogCtaBanner({ value }: { value: CtaBannerValue }) {
  const variant = value.variant ?? "spotlight";
  const primary = value.primaryCta?.label && value.primaryCta?.href ? value.primaryCta : null;
  const secondary =
    value.secondaryCta?.label && value.secondaryCta?.href ? value.secondaryCta : null;
  if (!value.heading || !primary) return null;

  const onSolid = variant === "solid";

  const phone = value.showPhone ? (
    <a
      href={siteConfig.phoneHref}
      className={cn(
        "group inline-flex items-center gap-2.5 whitespace-nowrap text-sm font-medium transition-colors",
        onSolid ? "text-white hover:text-white/80" : "text-foreground hover:text-accent"
      )}
    >
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110",
          onSolid
            ? "border-white/30 bg-white/10 text-white"
            : "border-border bg-card text-accent"
        )}
      >
        <Phone weight="fill" className="h-4 w-4" />
      </span>
      <span>
        <span
          className={cn(
            "block text-xs",
            onSolid ? "text-white/70" : "text-muted-foreground"
          )}
        >
          Prefer to talk?
        </span>
        {siteConfig.phone}
      </span>
    </a>
  ) : null;

  const secondaryLink = secondary ? (
    onSolid ? (
      <Link
        href={secondary.href!}
        target={secondary.openInNewTab ? "_blank" : undefined}
        rel={secondary.openInNewTab ? "noopener noreferrer" : undefined}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
      >
        {secondary.label}
        <ArrowRight
          weight="bold"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </Link>
    ) : (
      <CtaLink
        href={secondary.href!}
        variant="outline"
        openInNewTab={secondary.openInNewTab}
      >
        {secondary.label}
      </CtaLink>
    )
  ) : null;

  const primaryLink = (
    <CtaLink
      href={primary.href!}
      variant={onSolid ? "inverted" : "gradient"}
      size={variant === "split" ? "md" : "lg"}
      openInNewTab={primary.openInNewTab}
    >
      {primary.label}
    </CtaLink>
  );

  /* ---------------------------------------------------------------- */
  /* Split: text left, actions right                                   */
  /* ---------------------------------------------------------------- */
  if (variant === "split") {
    return (
      <aside
        aria-label={value.heading}
        className="my-10 flex flex-col gap-6 rounded-card border border-border bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="min-w-0">
          {value.eyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {value.eyebrow}
            </p>
          ) : null}
          <p className="font-display text-xl font-semibold leading-snug tracking-tight text-balance text-foreground sm:text-2xl">
            {value.heading}
          </p>
          {value.text ? (
            <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground">
              {value.text}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          {primaryLink}
          {secondaryLink}
          {phone}
        </div>
      </aside>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Solid: bold brand gradient fill                                   */
  /* ---------------------------------------------------------------- */
  if (variant === "solid") {
    return (
      <aside
        aria-label={value.heading}
        className="relative my-10 overflow-hidden rounded-card p-8 text-center text-white shadow-glow sm:p-12 [background-image:linear-gradient(135deg,var(--color-brand-600),var(--color-brand-800))]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-brand-cyan/25 blur-3xl"
        />
        <div className="relative mx-auto max-w-xl">
          {value.eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              {value.eyebrow}
            </p>
          ) : null}
          <p className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-balance sm:text-3xl">
            {value.heading}
          </p>
          {value.text ? (
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/85">
              {value.text}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-4">
            {primaryLink}
            {secondaryLink}
            {phone}
          </div>
        </div>
      </aside>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Spotlight (default): centered, gradient ring + ambient glow       */
  /* ---------------------------------------------------------------- */
  return (
    <aside
      aria-label={value.heading}
      className="ring-gradient relative my-10 overflow-hidden rounded-card p-8 text-center shadow-glow sm:p-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-radial-glow opacity-80"
      />
      <div className="relative mx-auto max-w-xl">
        {value.eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {value.eyebrow}
          </p>
        ) : null}
        <p className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-balance text-foreground sm:text-3xl">
          {value.heading}
        </p>
        {value.text ? (
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            {value.text}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-4">
          {primaryLink}
          {secondaryLink}
          {phone}
        </div>
      </div>
    </aside>
  );
}
