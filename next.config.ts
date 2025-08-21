import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 1) Turn off Next.js’s built-in CSS optimizer entirely
  experimental: {
    optimizeCss: false,
  },

  // 2) (Optional) If you still want CSS minification, alias LightningCSS → WASM
  webpack(config) {
    config.resolve.alias = {
      // preserve any existing aliases
      ...(config.resolve.alias ?? {}),

      // redirect any `import 'lightningcss'` calls to the pure-WASM version
      lightningcss: "lightningcss-wasm",
    };

    return config;
  },
};

export default nextConfig;
