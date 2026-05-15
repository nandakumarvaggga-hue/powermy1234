/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  turbopack: {
    resolveAlias: {
      '@': './app',
    },
  },
}

export default nextConfig
