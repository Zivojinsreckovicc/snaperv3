"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
// Below this width the "flexible" widget would overflow, so use "compact".
const MIN_FLEXIBLE_WIDTH = 300;

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action?: string;
      theme?: "light" | "dark";
      size?: "flexible" | "compact";
    },
  ) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null;

/** Loads Cloudflare's script once, however many widgets are on the page. */
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () =>
      window.turnstile
        ? resolve(window.turnstile)
        : reject(new Error("Turnstile did not initialise"));
    script.onerror = () => {
      // Allow a fresh attempt the next time a widget mounts.
      scriptPromise = null;
      script.remove();
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export type TurnstileHandle = {
  /** Issue a fresh token. Tokens are single-use, so call after each submit. */
  reset: () => void;
};

/**
 * Cloudflare Turnstile widget. Rendered inside a <form>, it adds a hidden
 * `cf-turnstile-response` input carrying the token, which the server must
 * verify. The script loads only once the widget nears the viewport.
 */
export function Turnstile({
  action,
  ref,
  className,
}: {
  action: string;
  ref?: React.Ref<TurnstileHandle>;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const { theme } = useTheme();

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      },
    }),
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!SITE_KEY) {
      console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set.");
      return;
    }

    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        loadTurnstile()
          .then((turnstile) => {
            if (cancelled) return;
            setLoadFailed(false);
            widgetIdRef.current =
              turnstile.render(container, {
                sitekey: SITE_KEY,
                action,
                theme,
                size:
                  container.offsetWidth < MIN_FLEXIBLE_WIDTH
                    ? "compact"
                    : "flexible",
              }) ?? null;
          })
          .catch(() => {
            if (!cancelled) setLoadFailed(true);
          });
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [action, theme]);

  return (
    <div className={className}>
      <div ref={containerRef} className={cn(!loadFailed && "min-h-[65px]")} />
      {loadFailed ? (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          The security check couldn&apos;t load. Disable any blocker for this
          site and refresh the page.
        </p>
      ) : null}
    </div>
  );
}
