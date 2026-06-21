/**
 * Inline script that runs synchronously in <head>, before first paint, to
 * set the correct `data-theme` on <html>. This prevents the flash of the
 * wrong theme on hard navigations (see Next.js "Preventing Flash" guide).
 *
 * Resolution order: saved preference -> OS preference -> dark (brand default).
 * Rendered by a Server Component; <html> uses suppressHydrationWarning so
 * React accepts the DOM the script wrote.
 */
export const THEME_STORAGE_KEY = "snaper-theme";
export const DEFAULT_THEME = "dark";

const script = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var t=s||(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"${DEFAULT_THEME}");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","${DEFAULT_THEME}");}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
