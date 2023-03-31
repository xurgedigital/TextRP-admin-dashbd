/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'xumm.app'],
  },
}

module.exports = withPlugins([], {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${
          process.env.BACKEND_URL || 'https://xlrp-backendprod.aticloud.atican.dev'
        }/:path*`, // Proxy to Backend
      },
    ]
  },
  ...nextConfig,
})
