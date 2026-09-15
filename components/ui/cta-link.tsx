"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  /**
   * gradient: brand fill (default). outline: bordered on a normal surface.
   * inverted: white pill for use on top of a solid brand-colored surface.
   */
  variant?: "gradient" | "outline" | "inverted";
  size?: "md" | "lg";
  openInNewTab?: boolean;
  className?: string;
};

const sizes = {
  md: "h-12 pl-6 pr-2 text-sm",
  lg: "h-14 pl-7 pr-2.5 text-base",
};

const iconSizes = {
  md: "h-8 w-8",
  lg: "h-9 w-9",
};

const variants = {
  gradient:
    "text-white shadow-glow-sm hover:shadow-glow [background-image:linear-gradient(180deg,var(--color-brand-500),var(--color-brand-700))]",
  outline: "border border-border-strong text-foreground hover:border-accent",
  inverted: "bg-white text-brand-700 shadow-soft hover:bg-brand-50",
};

const iconVariants = {
  gradient: "bg-white/15",
  outline: "bg-muted",
  inverted: "bg-brand-100 text-brand-700",
};

/**
 * Primary call-to-action link with the "button-in-button" trailing icon:
 * the arrow lives in its own circular wrapper flush to the right, and shifts
 * diagonally on hover for internal kinetic tension. Pure CSS hover physics.
 */
export function CtaLink({
  href,
  children,
  variant = "gradient",
  size = "md",
  openInNewTab = false,
  className,
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-3 whitespace-nowrap rounded-full font-medium",
        "transition-all duration-300 ease-[var(--ease-spring)] active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes[size],
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-spring)]",
          "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          iconSizes[size],
          iconVariants[variant]
        )}
      >
        <ArrowUpRight weight="bold" className="h-4 w-4" />
      </span>
    </Link>
  );
}
