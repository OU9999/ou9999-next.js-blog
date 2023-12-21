import { VStack, Divider } from "@chakra-ui/react";
import PageHeader from "../common/PageHeader";
import NoteCategorySelector from "./NoteCategorySelector";
import NoteGridPage from "./NoteGridPage";
import { INotesCategoryProps } from "@/pages/notes/[...slug]";

export default function NotesMainPage({
  category,
  notesArr,
  categoryArr,
  snapsize,
  currentPage,
}: INotesCategoryProps) {
  return (
    <VStack h="auto" justifyContent={"flex-start"} position={"relative"}>
      <PageHeader title="Notes" bgImg="/assets/imgs/main/miles.webp" />
      <VStack position={"relative"}>
        <NoteCategorySelector categoryArr={categoryArr} category={category} />
        <NoteGridPage
          category={category}
          notesArr={notesArr}
          snapsize={snapsize}
          currentPage={currentPage}
        />
        <Divider py={3} />
      </VStack>
    </VStack>
  );
}
