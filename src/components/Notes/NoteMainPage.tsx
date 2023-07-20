import { VStack, Divider, Skeleton } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import LoadingGrid from "./LoadingGrid";
import { ICategorys, INotes } from "@/pages/notes/[category]";
import PageHeader from "../common/PageHeader";

const NoteCategorySelector = dynamic(() => import("./NoteCategorySelector"), {
  loading: () => <Skeleton w="96" h={"32"} rounded={"md"} />,
});

const NoteGridPage = dynamic(() => import("./NoteGridPage"), {
  loading: () => <LoadingGrid />,
});

interface INotesMainPageProps {
  category: string;
  notesArr: INotes[];
  categoryArr: ICategorys[];
  snapsize: number;
}

export default function NotesMainPage({
  category,
  notesArr,
  categoryArr,
  snapsize,
}: INotesMainPageProps) {
  return (
    <VStack h="auto" justifyContent={"flex-start"} position={"relative"}>
      <PageHeader title="Notes" bgImg="/assets/imgs/main/miles.jpeg" />
      <VStack position={"relative"}>
        <NoteCategorySelector categoryArr={categoryArr} category={category} />
        <NoteGridPage notesArr={notesArr} snapsize={snapsize} />
        <Divider py={3} />P
      </VStack>
    </VStack>
  );
}
