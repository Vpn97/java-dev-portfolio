/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for Docker deployment
  output: "standalone",

  // Image optimization configuration
  images: {
    domains: [], // Add your image domains here if needed
    formats: ['image/avif', 'image/webp'],
  },

  // Compression
  compress: true,

  // Production optimizations
  swcMinify: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
