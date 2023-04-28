/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();
const withPlugins = require("next-compose-plugins");
const nextRuntimeDotenv = require("next-runtime-dotenv");

const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

const plugins = [
  removeImports,
  [
    nextRuntimeDotenv,
    {
      public: [
        "NEXT_PUBLIC_API_KEY",
        "NEXT_PUBLIC_AUTH_DOMAIN",
        "NEXT_PUBLIC_PROJECT_ID",
        "NEXT_PUBLIC_STORAGE_BUCKET",
        "NEXT_PUBLIC_MESSAGING_SENDER_ID",
        "NEXT_PUBLIC_APP_ID",
      ],
    },
  ],
];

module.exports = withPlugins(plugins, {
  distDir: ".next",
  ...nextConfig,
});
