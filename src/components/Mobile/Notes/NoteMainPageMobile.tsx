import { Divider, VStack } from "@chakra-ui/react";
import NoteGridMobile from "./NoteGridMobile";
import NoteCategorySelectorMobile from "./NoteCategorySelectorMobile";

interface INotesMainPageProps {
  category: string;
  size: number;
}

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
          <NoteGridMobile category={category} size={size} />
          <Divider py={3} />
        </VStack>
      </VStack>
    </>
  );
}
