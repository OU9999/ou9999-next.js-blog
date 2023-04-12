import { ICategorys, INotes, allCategory } from "@/pages/notes/[category]";
import { colorThemeAtom } from "@/utils/atoms";
import { dbService } from "@/utils/firebase";
import {
  Box,
  Divider,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { useRecoilValue } from "recoil";
import PostMobile from "../Home/PostMobile";
import LoadingCardMobile from "./LoadingCardMobile";
import { MdExpandMore } from "react-icons/md";

interface INotesMainPageProps {
  category: string;
  size: number;
}

export default function NoteMainPageMobile({
  category,
  size,
}: INotesMainPageProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [categorys, setCategorys] = useState<ICategorys[]>([]);
  const [notes, setNotes] = useState<INotes[]>([]);
  const [limitSize, setLimitSize] = useState(9);
  const [isDisable, setIsDisable] = useState(false);

  const onMoreButtonClicked = () => {
    setLimitSize((prev) => prev + 9);
  };

  const getCategorys = async () => {
    const q = query(
      collection(dbService, "categorys"),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (snapshot) => {
      const categoryArr: any = snapshot.docs.map((category) => ({
        id: category.id + "",
        ...category.data(),
      }));
      setCategorys([allCategory, ...categoryArr]);
    });
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
    getCategorys();
    getNotes(category, limitSize);
  }, [category, limitSize]);

  return (
    <>
      <VStack
        w="100vw"
        h="auto"
        justifyContent={"flex-start"}
        position={"relative"}
        overflow={"hidden"}
      >
        <VStack position={"relative"}>
          <HStack
            gap={3}
            my={"10"}
            border={"1px solid"}
            padding={"5"}
            rounded={"2xl"}
          >
            <Heading fontSize={"xl"}>Category : {category}</Heading>
            <Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<GoThreeBars />}
                  variant="outline"
                />
                <MenuList zIndex={99}>
                  {categorys.map((category) => (
                    <>
                      <Link href={`/notes/${category.category}`}>
                        <MenuItem
                          key={category.id}
                          value={category.category}
                          px={"7"}
                        >
                          {category.category}
                        </MenuItem>
                      </Link>
                    </>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          </HStack>
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
          <Divider py={3} />
        </VStack>
      </VStack>
    </>
  );
}
