import { selectBasicThumbnail } from "@/utils/utilFn";
import { Box, VStack } from "@chakra-ui/react";
import Image from "next/image";
import EntryHeader from "./EntryHeader";
import dynamic from "next/dynamic";
import EntryMarkdown from "./EntryMarkdown";
import { IEntryProps } from "@/pages/entry/[...slug]";

const DynamicEntryFooter = dynamic(() => import("./EntryFooter"));

export default function EntryMainPage({
  detail,
  docId,
  notesArr,
  previousNote,
  nextNote,
}: IEntryProps) {
  return (
    <>
      <VStack height={"auto"} width="100vw">
        <EntryHeader detail={detail} docId={docId} />
        <VStack height={"auto"} pos={"relative"}>
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
                src={selectBasicThumbnail(detail.category!)}
                fill={true}
                alt="thumbnail"
                style={{
                  objectFit: "cover",
                }}
                priority
                // placeholder="blur"
                // blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
              />
            </Box>
          </Box>
          <EntryMarkdown md={detail.md!} />
        </VStack>
        <Box position={"relative"} w="full" h="auto" zIndex={32}>
          <DynamicEntryFooter
            category={detail.category!}
            docId={docId}
            notesArr={notesArr}
            previousNote={previousNote}
            nextNote={nextNote}
          />
        </Box>
      </VStack>
    </>
  );
}
