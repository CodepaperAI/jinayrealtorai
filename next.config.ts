import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob — primary image host for project covers.
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      // GHL CDN — fallback when an older project's cover still points
      // at the GHL-hosted hero image from the email pipeline.
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "msgsndr-*.s3.amazonaws.com",
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default config;
