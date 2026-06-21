"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

/**
 * Theme switch. Icon visibility is driven purely by CSS via the `dark:`
 * variant (keyed off [data-theme]), so it stays hydration-safe even though
 * the resolved theme isn't known during server render.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={cn(
        "group relative inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border border-border bg-card/60 text-foreground",
        "transition-colors duration-200 hover:border-border-strong hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {/* Sun — shown in dark mode (click to go light) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="absolute h-5 w-5 scale-0 opacity-0 transition-all duration-300 ease-[var(--ease-spring)] dark:scale-100 dark:opacity-100"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>

      {/* Moon — shown in light mode (click to go dark) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="absolute h-5 w-5 scale-100 opacity-100 transition-all duration-300 ease-[var(--ease-spring)] dark:scale-0 dark:opacity-0"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
