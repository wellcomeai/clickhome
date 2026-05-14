/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-b1e3de631e544c69b0ad6587f740e140.r2.dev',
      },
    ],
  },
};

module.exports = nextConfig;
