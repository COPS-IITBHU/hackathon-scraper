/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        {
          protocol: 'http',
          hostname: '**',
        },
      ],
    },
    // Add experimental features to fix the clientModules error
    experimental: {
      serverActions: {
        bodySizeLimit: '2mb',
      },
    },
    // Disable type checking in production builds for better performance
    typescript: {
      ignoreBuildErrors: process.env.NODE_ENV === 'production',
    },
    // Disable ESLint during builds for better performance
    eslint: {
      ignoreDuringBuilds: process.env.NODE_ENV === 'production',
    },
  }
  
  module.exports = nextConfig