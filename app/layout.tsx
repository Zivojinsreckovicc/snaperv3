import type { Metadata, Viewport } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { DEFAULT_THEME, ThemeScript } from "@/components/theme/theme-script";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { JsonLd } from "@/components/seo/json-ld";
import { buildSiteNavigationJsonLd } from "@/lib/structured-data";

// Poppins is the brand's single typeface — body and headings alike.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Monospace kept only for code/URL-style accents (Poppins has no mono cut).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.seoTitle}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "web design",
    "web development",
    "AI automation",
    "conversion-focused websites",
    "branding",
    "digital agency",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.seoTitle}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.seoTitle}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  // Matches the brand near-black / white backgrounds per theme.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <ThemeScript />
        <JsonLd data={buildSiteNavigationJsonLd()} />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <GoogleAnalytics gaId={siteConfig.gaId} />
      </body>
    </html>
  );
}
