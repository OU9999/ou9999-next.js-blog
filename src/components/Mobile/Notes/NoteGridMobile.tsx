import { INotes } from "@/pages/notes/[category]";
import { colorThemeAtom } from "@/utils/atoms";
import { Box, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PostMobile from "../Home/PostMobile";
import { MdExpandMore } from "react-icons/md";

interface INoteGridMobileProps {
  notesArr: INotes[];
  snapsize: number;
}

export default function NoteGridMobile({
  notesArr,
  snapsize,
}: INoteGridMobileProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [isDisable, setIsDisable] = useState(true);
  const [count, setCount] = useState(9);

  useEffect(() => {
    if (snapsize > count) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [count, snapsize]);

  const onMoreButtonClicked = () => {
    setCount((prev) => prev + 9);
  };

  return (
    <>
      {notesArr.slice(0, count).map((note) => (
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
