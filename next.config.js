/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();

const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = removeImports(nextConfig);
