import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 1) Turn off Next.js’s built-in CSS optimizer entirely
  experimental: {
    optimizeCss: false,
  },

};

export default nextConfig;
