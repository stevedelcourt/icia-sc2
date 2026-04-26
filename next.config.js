/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_EXPORT ? 'export' : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  trailingSlash: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    ppr: false,
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  webpack: (config, { isServer }) => {
    return config
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/accompagnements/citoyen',
        destination: '/accompagnements/citoyens',
        permanent: true,
      },
      {
        source: '/accompagnements/entreprise',
        destination: '/accompagnements/entreprises',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
