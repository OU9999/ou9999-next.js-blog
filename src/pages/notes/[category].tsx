import NotesMainPage from "@/components/Notes/NoteMainPage";
import { INote } from "@/firebase/firebaseTypes";
import {
  FetchCategoryResult,
  fetchCategory,
  fetchNotesArr,
} from "@/firebase/firebaseUtil";
import { useMediaQuery } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export interface INotesCategoryProps {
  category: string;
  categoryArr: FetchCategoryResult[];
  notesArr: INote[];
  snapsize: number;
}

export const getStaticPaths = async () => {
  const categoryArr = await fetchCategory("snapshot");

  const paths = [
    ...categoryArr.map((c) => ({
      params: { category: c.category },
    })),
    { params: { category: "ALL" } },
  ];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { category } = params;

  //notes
  const { notesArr, snapsize } = await fetchNotesArr(category);

  //category
  const categoryArr = await fetchCategory("ALL");

  return {
    props: {
      category,
      notesArr,
      snapsize,
      categoryArr,
    },
  };
};

export default function NotesCategory({
  snapsize,
  category,
  categoryArr,
  notesArr,
}: INotesCategoryProps) {
  const [desktopView] = useMediaQuery("(min-width: 767px)", {
    ssr: true,
    fallback: false,
  });
  const [NoteMainPageMobile, setNoteMainPageMobile] =
    useState<React.ComponentType<INotesCategoryProps> | null>(null);

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
              url: "/op.webp",
              width: 285,
              height: 167,
              alt: "image",
            },
          ],
        }}
      />
      {desktopView ? (
        <NotesMainPage
          category={category}
          notesArr={notesArr}
          categoryArr={categoryArr}
          snapsize={snapsize}
        />
      ) : (
        NoteMainPageMobile && (
          <NoteMainPageMobile
            category={category}
            notesArr={notesArr}
            categoryArr={categoryArr}
            snapsize={snapsize}
          />
        )
      )}
    </>
  );
}
