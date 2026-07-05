import type { NextConfig } from "next";
import withBundleAnalyzerInit from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/docs.html",
        destination: "/docs",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
