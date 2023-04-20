/** @type {import('next').NextConfig} */

const Sitemap = require("sitemap");
const removeImports = require("next-remove-imports")();

const generateSitemap = async () => {
  const sitemap = new Sitemap.SitemapStream({
    hostname: "https://ou9999-next-js-blog.vercel.app/",
  });

  sitemap.write({ url: "/", priority: 1.0, changefreq: "daily" });
  sitemap.end();
  return sitemap.toString();
};

const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  exportPathMap: async () => {
    const sitemap = await generateSitemap();
    return {
      "/sitemap.xml": { page: "/sitemap.xml", query: { sitemap } },
    };
  },
};

module.exports = removeImports(nextConfig);
