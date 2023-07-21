/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'xumm.app', 'ipfs.bithomp.com'],
  },
}
console.info('Using backend:', process.env.BACKEND_URL)
module.exports = withPlugins([], {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'https://backend.textrp.io'}/:path*`, // Proxy to Backend
      },
    ]
  },
  ...nextConfig,
})
