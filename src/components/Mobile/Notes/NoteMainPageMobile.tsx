import { Divider, VStack } from "@chakra-ui/react";
import NoteCategorySelectorMobile from "./NoteCategorySelectorMobile";
import NoteGridMobile from "./NoteGridMobile";
import { INotesCategoryProps } from "@/pages/notes/[category]";

// const NoteGridMobile = dynamic(() => import("./NoteGridMobile"), {
//   loading: () => <LoadingGridMobile />,
// });

export default function NoteMainPageMobile({
  category,
  notesArr,
  categoryArr,
  snapsize,
}: INotesCategoryProps) {
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
