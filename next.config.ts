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
    ],
  },
};

export default nextConfig;
