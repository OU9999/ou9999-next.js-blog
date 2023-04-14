import { Divider, VStack } from "@chakra-ui/react";
import NoteCategorySelectorMobile from "./NoteCategorySelectorMobile";
import dynamic from "next/dynamic";
import LoadingGridMobile from "./LoadingGridMobile";

interface INotesMainPageProps {
  category: string;
  size: number;
}

const NoteGridMobile = dynamic(() => import("./NoteGridMobile"), {
  loading: () => <LoadingGridMobile />,
});

export default function NoteMainPageMobile({
  category,
  size,
}: INotesMainPageProps) {
  return (
    <>
      <VStack
        w="100vw"
        h="auto"
        justifyContent={"flex-start"}
        position={"relative"}
        overflow={"hidden"}
      >
        <VStack position={"relative"}>
          <NoteCategorySelectorMobile category={category} />
          <VStack px={10} gap={10}>
            <NoteGridMobile category={category} size={size} />
          </VStack>
          <Divider py={3} />
        </VStack>
      </VStack>
    </>
  );
}
