/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        // Prevent Turbopack from parsing broken source maps
        "source-map-js": false,
      },
    },
  },
};

module.exports = nextConfig;
