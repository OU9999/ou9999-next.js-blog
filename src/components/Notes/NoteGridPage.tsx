import NoteGrid from "@/components/Notes/NoteGrid";
import { colorThemeAtom } from "@/utils/atoms";
import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { MdExpandMore } from "react-icons/md";
import { INote } from "@/firebase/firebaseTypes";

interface INoteGridPageProps {
  notesArr: INote[];
  snapsize: number;
}

export default function NoteGridPage({
  notesArr,
  snapsize,
}: INoteGridPageProps) {
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
      <NoteGrid notes={notesArr} count={count} />
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
