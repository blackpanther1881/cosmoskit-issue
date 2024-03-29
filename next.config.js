/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: ["localhost", "raw.githubusercontent.com"]
  },
  swcMinify: true,
  assetPrefix: isProd ? "./" : "" // To disable assetPrefix in development for hot reload
};

module.exports = nextConfig;
