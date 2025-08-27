/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Admin panel specific configuration
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Allow larger file uploads for admin
    },
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Image optimization for admin uploads
  images: {
    domains: [
      'localhost',
      'admitverse.com',
      'admin.admitverse.com',
      'images.unsplash.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Security headers for admin panel
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Environment variables for admin
  env: {
    NEXT_PUBLIC_APP_NAME: 'AdmitVerse Admin',
    NEXT_PUBLIC_APP_DESCRIPTION: 'Content Management System',
  },

  // TypeScript and ESLint
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Output configuration
  output: 'standalone',
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig