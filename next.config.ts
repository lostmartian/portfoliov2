import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Temporarily disabled due to Next.js 16 Turbopack issue with generateStaticParams detection
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
