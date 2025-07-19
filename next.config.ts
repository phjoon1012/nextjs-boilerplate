import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better SSR
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable compression
  compress: true,
  
  // Enable static optimization where possible
  trailingSlash: false,
  
  // Enable source maps in development
  productionBrowserSourceMaps: false,
};

export default nextConfig;
