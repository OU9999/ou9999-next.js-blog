import NotesMainPage from "@/components/Notes/NoteMainPage";
import BlogSEO from "@/components/common/BlogSEO";
import { INote } from "@/firebase/firebaseTypes";
import {
  FetchCategoryResult,
  fetchCategory,
  fetchNotesArr,
} from "@/firebase/firebaseUtil";
import { useDevicehook } from "@/hooks/useDevicehook";
import { useEffect, useState } from "react";

export interface INotesCategoryProps {
  category: string;
  categoryArr: FetchCategoryResult[];
  notesArr: INote[];
  snapsize: number;
  currentPage: number;
}

export const getStaticPaths = async () => {
  const categoryArr = await fetchCategory("ALL");

  const paths = categoryArr.flatMap((category) =>
    Array.from({ length: category.size! }, (_, i) => ({
      params: { slug: [category.category, String(i + 1)] },
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const category = params.slug[0];
  const currentPage = +params.slug[1];

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
      currentPage,
    },
  };
};

export default function NotesCategory({
  snapsize,
  category,
  categoryArr,
  notesArr,
  currentPage,
}: INotesCategoryProps) {
  //state
  const [NoteMainPageMobile, setNoteMainPageMobile] =
    useState<React.ComponentType<INotesCategoryProps> | null>(null);

  //util
  const { isDesktopView } = useDevicehook();

  useEffect(() => {
    import("@/components/Mobile/Notes/NoteMainPageMobile").then((module) => {
      setNoteMainPageMobile(() => module.default);
    });
  }, []);

  return (
    <>
      <BlogSEO title="Notes" description="Notes!" image="/op.webp" />
      {isDesktopView ? (
        <NotesMainPage
          category={category}
          notesArr={notesArr}
          categoryArr={categoryArr}
          snapsize={snapsize}
          currentPage={currentPage}
        />
      ) : (
        NoteMainPageMobile && (
          <NoteMainPageMobile
            category={category}
            notesArr={notesArr}
            categoryArr={categoryArr}
            snapsize={snapsize}
            currentPage={currentPage}
          />
        )
      )}
    </>
  );
}
