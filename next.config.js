/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-repo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-repo' : '',
}

module.exports = nextConfig