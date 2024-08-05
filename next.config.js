const path = require('path');

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
    webpack: (config, { isServer }) => {
        // Resolve the `@` alias to the project's root directory
        config.resolve.alias['@'] = path.resolve(__dirname);

        // Additional custom Webpack configuration can go here

        return config;
    },
};

module.exports = nextConfig;
