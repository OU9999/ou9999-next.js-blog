import { ICategorys, INotes, allCategory } from "@/pages/notes/[category]";
import { colorThemeAtom } from "@/utils/atoms";
import { dbService } from "@/utils/firebase";
import { returnColors } from "@/utils/utilFn";
import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import {
  collection,
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
import LoadingCard from "@/components/Notes/LoadingCard";
import LoadingCardMobile from "./LoadingCardMobile";
import { MdExpandMore } from "react-icons/md";

interface INotesMainPageProps {
  category: string;
}

export default function NoteMainPageMobile({ category }: INotesMainPageProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [categorys, setCategorys] = useState<ICategorys[]>([]);
  const [lightColor, setLightColor] = useState("");
  const [notes, setNotes] = useState<INotes[]>();
  const [limitCount, setLimitCount] = useState(9);
  const [size, setSize] = useState(0);
  const [isDisable, setIsDisable] = useState(false);

  const onMoreClicked = () => {
    if (size >= limitCount) {
      setLimitCount((prev) => prev + 9);
    }
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

  const getNotes = async (category: string) => {
    let q;
    if (category === "ALL") {
      q = query(collection(dbService, "notes"), orderBy("createdAt", "desc"));
    } else {
      q = query(
        collection(dbService, "notes"),
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );
    }
    onSnapshot(q, (snapshot) => {
      setSize(snapshot.size);
      const notesArr: any = snapshot.docs.map((note) => ({
        id: note.id + "",
        ...note.data(),
      }));
      setNotes(notesArr);
    });
  };

  useEffect(() => {
    getCategorys();
    getNotes(category);
  }, [category]);

  useEffect(() => {
    if (size <= limitCount) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [isDisable, limitCount, size]);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
  }, [colorTheme]);

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
            {!notes && (
              <>
                <LoadingCardMobile />
                <LoadingCardMobile />
                <LoadingCardMobile />
              </>
            )}
            {notes &&
              notes
                .slice(0, limitCount)
                .map((note) => (
                  <PostMobile
                    key={note.id}
                    link={note.id}
                    title={note.title}
                    md={note.md}
                    thumbnailUrl={note.thumbnailUrl}
                    category={note.category}
                    createdAt={note.createdAt}
                  />
                ))}
          </VStack>
          {isDisable ? null : (
            <IconButton
              aria-label="expand"
              fontSize={"5xl"}
              padding={"5"}
              variant={"ghost"}
              colorScheme={colorTheme}
              onClick={onMoreClicked}
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
