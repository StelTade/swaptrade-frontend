import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: isServer
              ? '../analyze/server.html'
              : '../analyze/client.html',
          })
        );
      }
    }
    return config;
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  compress: true,
  async headers() {
    return [
      {
        // Next.js content-hashed chunks — safe to cache forever
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Public static files (SVGs, fonts, images)
        source: '/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Favicon and static assets — long TTL, revalidatable
        source: '/:file(.*\\.(?:ico|svg|png|jpg|jpeg|webp|woff2?))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        // Service worker — must never be cached so updates propagate immediately
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
    ];
  },
};

export default nextConfig;
