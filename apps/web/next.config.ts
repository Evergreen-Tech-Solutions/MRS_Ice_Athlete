import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Let the build succeed even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cdn.sanity.io' },
      { protocol: 'https', hostname: 'cdn.sanity.io' }
    ]
  }
}

export default nextConfig
