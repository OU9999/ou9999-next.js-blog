/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

const removeImports = require("next-remove-imports")();

module.exports = removeImports(nextConfig);
