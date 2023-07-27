/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://ou9999-dev.vercel.app/",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 1,
  exclude: ["/guestbook", "/notes/**", "/test", "/write", "/write/**"],
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
    // dynamic: {
    //   async generateSitemap() {
    //     const notes = await getNotes();
    //     const sitemapFields = notes.map((note) => ({
    //       loc: `https://ou9999-next-js-blog.vercel.app/entry/${returnUrlTitle(
    //         note.title
    //       )}/${note.id}`,
    //       lastmod: new Date().toISOString(),
    //       changefreq: "daily",
    //     }));
    //     return sitemapFields;
    //   },
    // },
  },
};
