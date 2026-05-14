import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    // The gallery_builder uses Vercel Blob when BLOB_READ_WRITE_TOKEN is
    // set; otherwise it stores source URLs straight from developer
    // CDNs. We don't know every possible developer hostname up front, so
    // we accept any HTTPS host. Vision QA upstream already filters the
    // images themselves before any URL lands in the snapshot.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default config;
