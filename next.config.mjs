/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  // Remove basePath during local development
  basePath: '/nasdaq',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
