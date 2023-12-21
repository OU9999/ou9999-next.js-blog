import { HStack } from "@chakra-ui/react";
import NoteGridPageButton from "./NoteGridPageButton";
import NoteGridPageCenter from "./NoteGridPageCenter";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface INoteGridPaginationProps {
  category: string;
  snapsize: number;
  currentPage: number;
}

const NoteGridPagination = ({
  category,
  snapsize,
  currentPage,
}: INoteGridPaginationProps) => {
  const totalPages = Math.ceil(snapsize / 9);
  const prevParam = currentPage - 1;
  const nextParam = currentPage + 1;

  return (
    <HStack gap={3}>
      <NoteGridPageButton
        type="prev"
        icon={<FaChevronLeft />}
        text="Prev"
        category={category}
        pageParam={prevParam}
        isDisabled={currentPage === 1}
      />
      <NoteGridPageCenter currentPage={currentPage} totalPages={totalPages} />
      <NoteGridPageButton
        type="next"
        icon={<FaChevronRight />}
        text="Next"
        category={category}
        pageParam={nextParam}
        isDisabled={currentPage === totalPages}
      />
    </HStack>
  );
};

export default NoteGridPagination;
