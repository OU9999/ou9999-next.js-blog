import { INotes } from "@/pages/notes/[category]";
import { colorThemeAtom } from "@/utils/atoms";
import { dbService } from "@/utils/firebase";
import { Box, IconButton, VStack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PostMobile from "../Home/PostMobile";
import LoadingCardMobile from "./LoadingCardMobile";
import { MdExpandMore } from "react-icons/md";

interface INoteGridMobileProps {
  category: string;
  size: number;
}

export default function NoteGridMobile({
  category,
  size,
}: INoteGridMobileProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [notes, setNotes] = useState<INotes[]>([]);
  const [limitSize, setLimitSize] = useState(9);
  const [isDisable, setIsDisable] = useState(false);

  const onMoreButtonClicked = () => {
    setLimitSize((prev) => prev + 9);
  };

  const getNotes = async (category: string, limitSize: number) => {
    let q;
    if (category === "ALL") {
      q = query(
        collection(dbService, "notes"),
        orderBy("createdAt", "desc"),
        limit(limitSize)
      );
    } else {
      q = query(
        collection(dbService, "notes"),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(limitSize)
      );
    }
    const snapshot = await getDocs(q);
    const notesArr: any = snapshot.docs.map((note) => ({
      id: note.id + "",
      ...note.data(),
    }));
    setNotes(notesArr);
  };

  useEffect(() => {
    if (size >= limitSize) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [limitSize, size]);

  useEffect(() => {
    getNotes(category, limitSize);
  }, [category, limitSize]);

  return (
    <>
      <VStack px={10} gap={10}>
        {!notes
          ? Array.from({ length: 3 }).map((_, index) => (
              <LoadingCardMobile key={index} />
            ))
          : notes.map((note) => (
              <Box key={note.id} w="full">
                <PostMobile
                  link={note.id}
                  title={note.title}
                  thumbnailUrl={note.thumbnailUrl}
                  category={note.category}
                  createdAt={note.createdAt}
                />
              </Box>
            ))}
      </VStack>
      {isDisable ? null : (
        <IconButton
          aria-label="expand"
          fontSize={"5xl"}
          padding={"5"}
          variant={"ghost"}
          colorScheme={colorTheme}
          onClick={onMoreButtonClicked}
        >
          <MdExpandMore />
        </IconButton>
      )}
    </>
  );
}
