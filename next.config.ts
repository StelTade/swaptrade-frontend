import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable webpack bundle analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Split chunks more aggressively
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
      
      // Add bundle analyzer when ANALYZE env var is set
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
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable compression
  compress: true,
  
  // Optimize fonts
  experimental: {
    fontLoaders: [
      {
        loader: 'next/font/google',
        options: {
          subsets: ['latin'],
          display: 'swap',
        },
      },
    ],
  },
};

export default nextConfig;
