import { dbService } from "@/utils/firebase";
import { returnDescription, selectBasicThumbnail } from "@/utils/utilFn";
import { useMediaQuery } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { NextSeo } from "next-seo";
import EntryMainPage from "@/components/Entry/EntryMainPage";
import { useEffect, useState } from "react";

export const getServerSideProps = async ({ params }: any) => {
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
}

interface IEntryProps {
  detail: IDetail;
  docId: string;
}

export default function Entry({ detail, docId }: IEntryProps) {
  const [desktopView] = useMediaQuery("(min-width: 768px)", {
    ssr: true,
    fallback: false,
  });
  const [EntryMainPageMobile, setEntryMainPageMobile] =
    useState<React.ComponentType<IEntryProps> | null>(null);
  const desc = returnDescription(detail.md);
  useEffect(() => {
    import("@/components/Mobile/Entry/EntryMainPageMobile").then((module) => {
      setEntryMainPageMobile(() => module.default);
    });
  }, []);

  return (
    <>
      <NextSeo
        title={`${detail.title} | OU9999's First Blog`}
        description={`${desc} | OU9999's First Blog`}
        openGraph={{
          type: "website",
          url: "no",
          title: `${detail.title} | OU9999's First Blog`,
          description: `${desc} | OU9999's First Blog`,
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
