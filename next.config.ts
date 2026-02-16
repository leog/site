import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  // Note: Using the Rust compiler means we cannot use
  // rehype or remark plugins. For my app, this is fine.
  experimental: {
    mdxRs: true,
  },
  turbopack: {},
  outputFileTracingIncludes: {
    "/api/keystatic/[...params]": ["./content/**/*"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
