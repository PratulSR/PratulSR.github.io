import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Cloudflare Pages Next.js integration
  output: 'export', 
  images: {
    unoptimized: true, // Cloudflare Pages static export doesn't support the default Image Optimization
  },
};

export default nextConfig;