/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['yunrap-website.vercel.app'],
  },
  rewrites: {
    source: '/sitemap.xml',
    destination: '/sitemap',
  },
};

module.exports = nextConfig;
