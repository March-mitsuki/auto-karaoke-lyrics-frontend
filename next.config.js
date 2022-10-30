/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEV_WS_URL: 'ws://192.168.64.4:19800',
    // PRO_WS_URL: "wss://subapi.mitsuki114514.com",
    PRO_WS_URL: 'ws://192.168.64.4:19800',
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
