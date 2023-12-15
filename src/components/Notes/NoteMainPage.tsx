import { VStack, Divider } from "@chakra-ui/react";
import PageHeader from "../common/PageHeader";
import NoteCategorySelector from "./NoteCategorySelector";
import NoteGridPage from "./NoteGridPage";
import { INotesCategoryProps } from "@/pages/notes/[category]";

export default function NotesMainPage({
  category,
  notesArr,
  categoryArr,
  snapsize,
}: INotesCategoryProps) {
  return (
    <VStack h="auto" justifyContent={"flex-start"} position={"relative"}>
      <PageHeader title="Notes" bgImg="/assets/imgs/main/miles.webp" />
      <VStack position={"relative"}>
        <NoteCategorySelector categoryArr={categoryArr} category={category} />
        <NoteGridPage notesArr={notesArr} snapsize={snapsize} />
        <Divider py={3} />P
      </VStack>
    </VStack>
  );
}
