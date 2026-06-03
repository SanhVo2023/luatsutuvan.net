import dns from 'node:dns'
import type { NextConfig } from 'next'

// Ecosystem convention: force IPv4 resolution before any hostname lookups.
dns.setDefaultResultOrder('ipv4first')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
