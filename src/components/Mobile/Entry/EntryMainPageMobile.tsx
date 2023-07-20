import { isEntryAtom } from "@/utils/atoms";
import { selectBasicThumbnail } from "@/utils/utilFn";
import { Box, Center, VStack } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import Image from "next/image";
import EntryHeaderMobile from "./EntryHeaderMobile";
import dynamic from "next/dynamic";
import EntryMarkdownMobile from "./EntryMarkdownMobile";

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

const DynamicEntryFooterMobile = dynamic(() => import("./EntryFooterMobile"));

export default function EntryMainPageMobile({ detail, docId }: IEntryProps) {
  const setIsEntry = useSetRecoilState(isEntryAtom);

  useEffect(() => {
    setIsEntry(true);
    return () => {
      setIsEntry(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <VStack
        height={"auto"}
        width="100vw"
        overflow={"hidden"}
        pos={"relative"}
      >
        <EntryHeaderMobile detail={detail} docId={docId} />
        <Center w="full" py={20} px={10}>
          <Box
            rounded={"3xl"}
            overflow={"hidden"}
            w="full"
            h="48"
            transform={"auto"}
            boxShadow={"dark-lg"}
          >
            <Image
              src={selectBasicThumbnail(detail.category)}
              fill={true}
              alt="thumbnail"
              style={{
                objectFit: "cover",
              }}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
            />
          </Box>
        </Center>

        <EntryMarkdownMobile md={detail.md} />

        <Box
          position={"relative"}
          w="full"
          h="auto"
          overflow={"hidden"}
          zIndex={32}
        >
          <DynamicEntryFooterMobile category={detail.category} docId={docId} />
        </Box>
      </VStack>
    </>
  );
}
