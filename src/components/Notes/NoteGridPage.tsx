import NoteGrid from "@/components/Notes/NoteGrid";
import { INote } from "@/firebase/firebaseTypes";
import NoteGridPagination from "./NoteGridPage/NoteGridPagination";

interface INoteGridPageProps {
  category: string;
  notesArr: INote[];
  snapsize: number;
  currentPage: number;
}

export default function NoteGridPage({
  category,
  notesArr,
  snapsize,
  currentPage,
}: INoteGridPageProps) {
  return (
    <>
      <NoteGrid notes={notesArr} currentPage={currentPage} />
      <NoteGridPagination
        category={category}
        snapsize={snapsize}
        currentPage={currentPage}
      />
    </>
  );
}
