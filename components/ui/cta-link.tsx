"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "gradient" | "outline";
  size?: "md" | "lg";
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
  className,
}: CtaLinkProps) {
  const isGradient = variant === "gradient";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full font-medium",
        "transition-all duration-300 ease-[var(--ease-spring)] active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes[size],
        isGradient
          ? "text-white shadow-glow-sm hover:shadow-glow [background-image:linear-gradient(180deg,var(--color-brand-500),var(--color-brand-700))]"
          : "border border-border-strong text-foreground hover:border-accent",
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
          isGradient ? "bg-white/15" : "bg-muted"
        )}
      >
        <ArrowUpRight weight="bold" className="h-4 w-4" />
      </span>
    </Link>
  );
}
