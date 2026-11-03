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
  // Agents fetch /post/<slug>.md for the raw Markdown of a post.
  rewrites: async () => [
    { source: "/post/:slug.md", destination: "/md/:slug" },
  ],
  outputFileTracingIncludes: {
    "/**/*": ["./content/**/*"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
