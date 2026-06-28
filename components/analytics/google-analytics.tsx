import Script from "next/script";

/**
 * Google Analytics 4. Loads gtag.js after the page is interactive so it never
 * blocks rendering, then initializes the configured measurement ID. Rendered
 * once from the root layout. In Next.js App Router, route changes are SPA
 * navigations; GA4's enhanced measurement tracks them via History events, so no
 * manual pageview wiring is needed here.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
