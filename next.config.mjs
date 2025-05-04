/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  // Only use basePath in production, not during local development
  basePath: process.env.NODE_ENV === 'production' ? '/nasdaq' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
