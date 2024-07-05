/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
};

module.exports = nextConfig;
