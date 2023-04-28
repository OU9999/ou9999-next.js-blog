import { returnUrlTitle } from "@/utils/utilFn";
import { getNotes } from "./sitemap/entry-sitemap";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
}

interface SitemapProps {
  urls: SitemapUrl[];
}

export async function getServerSideProps(): Promise<{ props: SitemapProps }> {
  const notes = await getNotes();
  const urls = notes.map((note: any) => ({
    loc: `https://ou9999-next-js-blog.vercel.app/entry/${returnUrlTitle(
      note.title
    )}/${note.id}`,
    lastmod: new Date(note.updatedAt).toISOString(),
    changefreq: "daily",
  }));
  return { props: { urls } };
}

const SitemapXml = () => null;

export default SitemapXml;
