import { selectBasicThumbnail } from "@/utils/utilFn";
import { Box, VStack } from "@chakra-ui/react";
import Image from "next/image";
import EntryHeader from "./EntryHeader";
import dynamic from "next/dynamic";
import EntryMarkdown from "./EntryMarkdown";

export interface IDetail {
  category: string;
  createdAt: number;
  md: string;
  thumbnailUrl: string;
  title: string;
}

export interface IEntryProps {
  detail: IDetail;
  docId: string;
}

// const DynamicEntryMarkdown = dynamic(() => import("./EntryMarkdown"));
const DynamicEntryFooter = dynamic(() => import("./EntryFooter"));

export default function EntryMainPage({ detail, docId }: IEntryProps) {
  return (
    <>
      <VStack height={"auto"} width="100vw">
        <EntryHeader detail={detail} docId={docId} />
        <Box py={32}>
          <Box
            overflow={"hidden"}
            rounded="3xl"
            w="3xl"
            h="md"
            maxW={"50vw"}
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
        </Box>
        {/* <DynamicEntryMarkdown md={detail.md} /> */}
        <EntryMarkdown md={detail.md} />
        <Box position={"relative"} w="full" h="auto" zIndex={32}>
          <DynamicEntryFooter category={detail.category} docId={docId} />
        </Box>
      </VStack>
    </>
  );
}
