/** @type {import('next').NextConfig} */

const withSitemap = require("next-sitemap");
const removeImports = require("next-remove-imports")();

const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = removeImports(
  withSitemap({
    sitemap: {
      path: "/sitemap.xml",
      getServerSidePaths: async () => {
        const dynamicPaths = await fetchDynamicPaths();
        const paths = [
          {
            loc: "https://ou9999-next-js-blog.vercel.app/",
            priority: "1.0",
            changefreq: "daily",
          },
          ...dynamicPaths.map((title, id) => ({
            loc: `https://ou9999-next-js-blog.vercel.app/entry/${title}/${id}`,
            priority: "0.5",
            changefreq: "daily",
          })),
        ];

        return paths;
      },
    },
    ...nextConfig,
  })
);
