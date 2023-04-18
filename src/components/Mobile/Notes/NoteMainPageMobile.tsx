import { Divider, VStack } from "@chakra-ui/react";
import NoteCategorySelectorMobile from "./NoteCategorySelectorMobile";
import dynamic from "next/dynamic";
import LoadingGridMobile from "./LoadingGridMobile";

interface INotesMainPageProps {
  category: string;
}

const NoteGridMobile = dynamic(() => import("./NoteGridMobile"), {
  loading: () => <LoadingGridMobile />,
  ssr: false,
});

export default function NoteMainPageMobile({ category }: INotesMainPageProps) {
  return (
    <>
      <VStack
        w="100vw"
        h="auto"
        justifyContent={"flex-start"}
        position={"relative"}
        overflow={"hidden"}
      >
        <VStack position={"relative"} w="full">
          <NoteCategorySelectorMobile category={category} />
          <VStack px={10} gap={10} w="full">
            <NoteGridMobile category={category} size={size} />
          </VStack>
          <Divider py={3} />
        </VStack>
      </VStack>
    </>
  );
}
