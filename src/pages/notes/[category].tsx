import NotesMainPage from "@/components/Notes/NoteMainPage";
import { dbService } from "@/utils/firebase";
import { useMediaQuery } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export interface INotes {
  id: string;
  category: string;
  createdAt: number;
  title: string;
  md: string;
  thumbnailUrl: string;
  description: string;
}

export interface ICategorys {
  id: string;
  category: string;
  createdAt: number;
}

export const allCategory: ICategorys = {
  id: "1",
  category: "ALL",
  createdAt: 1,
};

interface INotesCategoryProps {
  params: {
    category: string;
  };
  category: string;
  notes: INotes[];
  size: number;
}

interface INoteMainPageMobileProps {
  category: string;
  size: number;
}

export const getServerSideProps = async ({ params }: any) => {
  const { category } = params;

  let q;
  if (category === "ALL") {
    q = query(collection(dbService, "notes"), orderBy("createdAt", "desc"));
  } else {
    q = query(
      collection(dbService, "notes"),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
  }

  const snapshot = await getDocs(q);
  const size = snapshot.size;

  return {
    props: {
      category,
      size,
    },
  };
};

export default function NotesCategory({ category, size }: INotesCategoryProps) {
  const [desktopView] = useMediaQuery("(min-width: 768px)", {
    ssr: true,
    fallback: false,
  });
  const [NoteMainPageMobile, setNoteMainPageMobile] =
    useState<React.ComponentType<INoteMainPageMobileProps> | null>(null);

  useEffect(() => {
    import("@/components/Mobile/Notes/NoteMainPageMobile").then((module) => {
      setNoteMainPageMobile(() => module.default);
    });
  }, []);

  return (
    <>
      <NextSeo
        title="Notes | OU9999's First Blog"
        description="Notes! | OU9999's First Blog"
        openGraph={{
          type: "website",
          url: "no",
          title: "OU9999",
          description: "Notes! | OU9999's First Blog",
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
        <NotesMainPage category={category} size={size} />
      ) : (
        NoteMainPageMobile && (
          <NoteMainPageMobile category={category} size={size} />
        )
      )}
    </>
  );
}
