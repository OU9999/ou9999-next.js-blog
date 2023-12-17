import { returnUrlTitle, selectBasicThumbnail } from "@/utils/utilFn";
import { useMediaQuery } from "@chakra-ui/react";
import EntryMainPage from "@/components/Entry/EntryMainPage";
import { useEffect, useState } from "react";
import { fetchDetail, fetchNotesArr } from "@/firebase/firebaseUtil";
import { IDetail, INote } from "@/firebase/firebaseTypes";
import BlogSEO from "@/components/common/BlogSEO";

export const getStaticPaths = async () => {
  const { notesArr } = await fetchNotesArr("ALL");

  const paths = notesArr.map((note) => ({
    params: { slug: [returnUrlTitle(note.title!), note.id] },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const docId = params.slug[1];
  const detail = await fetchDetail(docId);
  const { notesArr } = await fetchNotesArr(detail.category!);

  //find index
  const currentNoteIndex = notesArr.findIndex(
    (note: INote) => note.id === docId
  );
  const nextNoteIndex = currentNoteIndex > 0 ? currentNoteIndex - 1 : null;
  const previousNoteIndex =
    currentNoteIndex < notesArr.length - 1 ? currentNoteIndex + 1 : null;

  //find note
  const previousNote =
    previousNoteIndex !== null ? notesArr[previousNoteIndex] : null;
  const nextNote = nextNoteIndex !== null ? notesArr[nextNoteIndex] : null;

  return {
    props: { detail, docId, notesArr, previousNote, nextNote },
  };
};

export interface IEntryProps {
  detail: IDetail;
  docId: string;
  notesArr: INote[];
  previousNote: INote | null;
  nextNote: INote | null;
}

export default function Entry({
  detail,
  docId,
  notesArr,
  previousNote,
  nextNote,
}: IEntryProps) {
  const [desktopView] = useMediaQuery("(min-width: 767px)", {
    ssr: true,
    fallback: false,
  });
  const [EntryMainPageMobile, setEntryMainPageMobile] =
    useState<React.ComponentType<IEntryProps> | null>(null);

  useEffect(() => {
    import("@/components/Mobile/Entry/EntryMainPageMobile").then((module) => {
      setEntryMainPageMobile(() => module.default);
    });
  }, []);

  return (
    <>
      <BlogSEO
        title={detail.title!}
        description={detail.description!}
        image={selectBasicThumbnail(detail.category!) as string}
      />

      {desktopView ? (
        <EntryMainPage
          detail={detail!}
          docId={docId}
          notesArr={notesArr}
          previousNote={previousNote}
          nextNote={nextNote}
        />
      ) : (
        EntryMainPageMobile && (
          <EntryMainPageMobile
            detail={detail}
            docId={docId}
            notesArr={notesArr}
            previousNote={previousNote}
            nextNote={nextNote}
          />
        )
      )}
    </>
  );
}
