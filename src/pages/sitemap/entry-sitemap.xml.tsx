import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { dbService } from "@/utils/firebase";
import { returnUrlTitle } from "@/utils/utilFn";

export const getServerSideProps = async (context: any) => {
  const getNotes = async () => {
    const q = query(
      collection(dbService, "notes"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const notesArr: any = await snapshot.docs.slice(0, 10).map((note) => ({
      id: note.id + "",
      title: note.data().title,
      category: note.data().category,
      createdAt: note.data().createdAt,
      thumbnailUrl: note.data().thumbnailUrl,
      description: note.data().description,
    }));
    return notesArr;
  };

  const notes = await getNotes();

  const sitemapFields: ISitemapField[] = notes.map((note: any) => {
    const urlTitle = returnUrlTitle(note.title);
    return {
      loc: `https://ou9999-next-js-blog.vercel.app/entry/${urlTitle}/${note.id}`, // 페이지 경로
      lastmod: new Date().toISOString(), // 최근변경일자
      changefreq: "daily", // 페이지 주소 변경 빈도 (검색엔진에 제공됨) - always, daily, hourly, monthly, never, weekly, yearly 중 택 1
      priority: 1, // 페이지 주소 우선순위 (검색엔진에 제공됨, 우선순위가 높은 순서대로 크롤링함)
    };
  });

  return getServerSideSitemap(context, sitemapFields);
};

export default function Sitemap() {
  // This is here to satisfy Next.js' requirement for a default export
  // This page will not be rendered since we're only using it to generate a sitemap.xml file
  return null;
}
