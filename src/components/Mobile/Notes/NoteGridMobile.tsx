import { Box } from "@chakra-ui/react";
import PostMobile from "../Home/PostMobile";
import { INote } from "@/firebase/firebaseTypes";
import NoteGridPagination from "@/components/Notes/NoteGridPage/NoteGridPagination";

interface INoteGridMobileProps {
  notesArr: INote[];
  snapsize: number;
  category: string;
  currentPage: number;
}

const itemsPerPage = 9;
export default function NoteGridMobile({
  notesArr,
  snapsize,
  category,
  currentPage,
}: INoteGridMobileProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      {notesArr.slice(startIndex, endIndex).map((note) => (
        <Box key={note.id} w="full">
          <PostMobile
            key={"postMobile" + note.id}
            link={note.id!}
            title={note.title!}
            thumbnailUrl={note.thumbnailUrl!}
            category={note.category!}
            createdAt={note.createdAt!}
          />
        </Box>
      ))}
      <NoteGridPagination
        category={category}
        snapsize={snapsize}
        currentPage={currentPage}
      />
    </>
  );
}
