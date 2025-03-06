/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v0.blob.com",
      },
    ],
  },
  experimental: {
    // Enable Next.js 15 experimental features
    serverActions: {
      allowedOrigins: ["localhost:3000", "agathiyarjanachithar.vercel.app"],
    },
  },
}

module.exports = nextConfig

