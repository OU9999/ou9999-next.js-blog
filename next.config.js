/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();
const withPlugins = require("next-compose-plugins");
const nextRuntimeDotenv = require("next-runtime-dotenv");
const withSitemap = require("nextjs-sitemap-generator");

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
  [
    withSitemap,
    {
      sitemap: {
        path: "/path/to/public/sitemap.xml",
        baseUrl: "https://ou9999-next-js-blog.vercel.app/",
      },
    },
  ],
];

module.exports = withPlugins(plugins, {
  distDir: ".next",
  ...nextConfig,
});
