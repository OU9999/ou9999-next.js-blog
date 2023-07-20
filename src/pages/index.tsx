import { NextSeo } from "next-seo";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MainScroll from "@/components/Home/MainScroll";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "@/utils/firebase";
import { INotes } from "./notes/[category]";

interface IHomeProps {
  notesArr: INotes[];
}

export default function Home({ notesArr }: IHomeProps) {
  const [desktopView] = useMediaQuery("(min-width: 768px)", {
    ssr: true,
    fallback: false,
  });
  const [MainPageMobile, setMainPageMobile] =
    useState<React.ComponentType<IHomeProps> | null>(null);

  useEffect(() => {
    import("@/components/Mobile/Home/MainPageMobile").then((module) => {
      setMainPageMobile(() => module.default);
    });
  }, []);

  return (
    <>
      <NextSeo
        title="OU9999's First Blog"
        description="OU9999 First Blog!"
        openGraph={{
          type: "website",
          url: "no",
          title: "OU9999",
          description: "OU9999 First Blog!",
          images: [
            {
              url: "/op.png",
              width: 285,
              height: 167,
              alt: "image",
            },
          ],
        }}
      />

      {desktopView ? (
        <MainScroll notesArr={notesArr} />
      ) : (
        MainPageMobile && <MainPageMobile notesArr={notesArr} />
      )}
    </>
  );
}

export const getStaticProps = async () => {
  const q = query(collection(dbService, "notes"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const notesArr: any = snapshot.docs.map((note) => ({
    id: note.id + "",
    title: note.data().title,
    category: note.data().category,
    createdAt: note.data().createdAt,
    thumbnailUrl: note.data().thumbnailUrl,
    description: note.data().description,
  }));

  return {
    props: {
      notesArr,
    },
  };
};
