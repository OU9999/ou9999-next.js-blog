import NoteMainPageMobile from "@/components/Mobile/Notes/NoteMainPageMobile";
import NotesMainPage from "@/components/Notes/NoteMainPage";
import { useMediaQuery } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export interface INotes {
  id: string;
  category: string;
  createdAt: number;
  title: string;
  md: string;
  thumbnailUrl: string;
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
}

interface INoteMainPageMobileProps {
  category: string;
}

export const getServerSideProps = async ({ params }: any) => {
  const { category } = params;

  return {
    props: { category },
  };
};

export default function NotesCategory({ category }: INotesCategoryProps) {
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
        <NotesMainPage category={category} />
      ) : (
        NoteMainPageMobile && <NoteMainPageMobile category={category} />
      )}
    </>
  );
}
