import { Divider, VStack } from "@chakra-ui/react";
import NoteCategorySelectorMobile from "./NoteCategorySelectorMobile";
import dynamic from "next/dynamic";
import LoadingGridMobile from "./LoadingGridMobile";
import { ICategorys, INotes } from "@/pages/notes/[category]";
import NoteGridMobile from "./NoteGridMobile";

interface INotesMainPageProps {
  category: string;
  notesArr: INotes[];
  categoryArr: ICategorys[];
  snapsize: number;
}

// const NoteGridMobile = dynamic(() => import("./NoteGridMobile"), {
//   loading: () => <LoadingGridMobile />,
// });

export default function NoteMainPageMobile({
  category,
  notesArr,
  categoryArr,
  snapsize,
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
        <VStack position={"relative"} w="full">
          <NoteCategorySelectorMobile
            categoryArr={categoryArr}
            category={category}
          />
          <VStack px={10} gap={10} w="full">
            <NoteGridMobile notesArr={notesArr} snapsize={snapsize} />
          </VStack>
          <Divider py={3} />
        </VStack>
      </VStack>
    </>
  );
}
