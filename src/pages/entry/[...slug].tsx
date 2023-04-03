import DeleteModal from "@/components/Entry/DeleteModal";
import EntryFooter from "@/components/Entry/EntryFooter";
import { isLoginAtom } from "@/utils/atoms";
import { dbService } from "@/utils/firebase";
import {
  dateFormatter,
  returnDescription,
  returnUrlTitle,
  selectBasicThumbnail,
} from "@/utils/utilFn";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import EntryMainPage from "@/components/Entry/EntryMainPage";
import EntryMainPageMobile from "@/components/Mobile/Entry/EntryMainPageMobile";

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
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  const desc = returnDescription(detail.md);

  return (
    <>
      <NextSeo
        title={`${detail.title} | OU9999's First Blog`}
        description={desc}
        openGraph={{
          type: "website",
          url: "no",
          title: detail.title,
          description: desc,
          images: [
            {
              url:
                detail.thumbnailUrl === ""
                  ? (selectBasicThumbnail(detail.category) as string)
                  : (detail.thumbnailUrl as string),
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
      {mobileView ? (
        <EntryMainPageMobile detail={detail} docId={docId} />
      ) : (
        <EntryMainPage detail={detail} docId={docId} />
      )}
    </>
  );
}
