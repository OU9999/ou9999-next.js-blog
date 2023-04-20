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
    const notesArr: any = await snapshot.docs.slice(0, 5).map((note) => ({
      id: note.id + "",
      title: note.data().title,
    }));
    return notesArr;
  };

  const notes = await getNotes();
  console.log(notes.map((note: any) => console.log(note)));
  const sitemapFields: ISitemapField[] = notes.map((note: any) => {
    const id = note.id;
    const urlTitle = returnUrlTitle(note.title);
    return {
      loc: `https://ou9999-next-js-blog.vercel.app/entry/${urlTitle}/${id}`, // 페이지 경로
      lastmod: new Date().toISOString(), // 최근변경일자
      changefreq: "daily", // 페이지 주소 변경 빈도 (검색엔진에 제공됨) - always, daily, hourly, monthly, never, weekly, yearly 중 택 1
    };
  });

  return getServerSideSitemap(context, sitemapFields);
};

export default function Sitemap() {
  return null;
}