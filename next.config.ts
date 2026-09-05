import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The social-card routes read their font off disk; tracing cannot see through
  // a runtime path, so name the files here or the deployed route 500s.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./app/_og/*.ttf"],
    "/twitter-image": ["./app/_og/*.ttf"],
  },
};

export default nextConfig;
