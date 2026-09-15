import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      // YouTube thumbnails for the click-to-play video facade.
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
