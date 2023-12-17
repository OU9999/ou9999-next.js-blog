import { returnUrlTitle, selectBasicThumbnail } from "@/utils/utilFn";
import { useMediaQuery } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import EntryMainPage from "@/components/Entry/EntryMainPage";
import { useEffect, useState } from "react";
import { fetchDetail, fetchNotesArr } from "@/firebase/firebaseUtil";
import { IDetail, INotesArr } from "@/firebase/firebaseTypes";

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
    (note: INotesArr) => note.id === docId
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
  notesArr: INotesArr[];
  previousNote: INotesArr | null;
  nextNote: INotesArr | null;
}

export default function Entry({
  detail,
  docId,
  notesArr,
  previousNote,
  nextNote,
}: IEntryProps) {
  console.log("previousNote>>>", previousNote);
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
      <NextSeo
        title={`${detail.title} | OU9999's First Blog`}
        description={`${detail.description} | OU9999's First Blog`}
        openGraph={{
          type: "website",
          url: "no",
          title: `${detail.title} | OU9999's First Blog`,
          description: `${detail.description} | OU9999's First Blog`,
          images: [
            {
              url: selectBasicThumbnail(detail.category!) as string,
              width: 285,
              height: 167,
              alt: "thumbnail",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
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
