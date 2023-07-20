import { dbService } from "@/utils/firebase";
import { returnUrlTitle, selectBasicThumbnail } from "@/utils/utilFn";
import { useMediaQuery } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { NextSeo } from "next-seo";
import EntryMainPage from "@/components/Entry/EntryMainPage";
import { useEffect, useState } from "react";

export const getStaticPaths = async () => {
  const q = query(collection(dbService, "notes"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const notesArr: any = snapshot.docs.map((note) => ({
    id: note.id + "",
    title: note.data().title,
  }));

  const paths = notesArr.map((note: any) => ({
    params: { slug: [returnUrlTitle(note.title), note.id] },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const docId = params.slug[1];
  const ref = await doc(dbService, "notes", docId);
  const snap = await getDoc(ref);
  const detail = snap.data();

  return {
    props: { detail, docId },
  };
};

export interface IDetail {
  category: string;
  createdAt: number;
  md: string;
  thumbnailUrl: string;
  title: string;
  description: string;
}

interface IEntryProps {
  detail: IDetail;
  docId: string;
}

export default function Entry({ detail, docId }: IEntryProps) {
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
              url: selectBasicThumbnail(detail.category) as string,
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
        <EntryMainPage detail={detail} docId={docId} />
      ) : (
        EntryMainPageMobile && (
          <EntryMainPageMobile detail={detail} docId={docId} />
        )
      )}
    </>
  );
}
