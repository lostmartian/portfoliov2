import type { NextConfig } from "next";

// Published as a static site to GitHub Pages (.github/workflows/deploy.yml uploads ./out),
// so there is no server: no image optimizer and no rewrites.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
