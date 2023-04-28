/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://ou9999-next-js-blog.vercel.app/",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 1,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/notes", "/guestbook", "/test", "/write/**"],
      },
    ],
  },
  sitemap: {
    path: "/public/sitemap.xml",
  },
};
