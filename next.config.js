/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: set strict mode true when msw's rendering problem is fixed.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shibe.online',
      },
    ],
  },
};

module.exports = nextConfig;
