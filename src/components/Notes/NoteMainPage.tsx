import NoteGrid from "@/components/Notes/NoteGrid";
import { ICategorys, INotes, allCategory } from "@/pages/notes/[category]";
import { colorThemeAtom } from "@/utils/atoms";
import { dbService } from "@/utils/firebase";
import { returnColors } from "@/utils/utilFn";
import {
  Center,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  IconButton,
  HStack,
  Box,
  Divider,
} from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { useRecoilValue } from "recoil";

interface INotesMainPageProps {
  category: string;
  notes: INotes[];
}

export default function NotesMainPage({
  category,
  notes,
}: INotesMainPageProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [categorys, setCategorys] = useState<ICategorys[]>([]);
  const [lightColor, setLightColor] = useState("");

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

  useEffect(() => {
    getCategorys();
  }, [category]);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
  }, [colorTheme]);

  return (
    <>
      <VStack h="auto" justifyContent={"flex-start"} position={"relative"}>
        <Box
          w="100vw"
          h="40vh"
          position={"absolute"}
          zIndex={-1}
          backgroundRepeat="no-repeat"
          backgroundAttachment={"fixed"}
          backgroundSize="cover"
          backgroundPosition={"center center"}
          backgroundImage="https://firebasestorage.googleapis.com/v0/b/ou9999-first-blog.appspot.com/o/imgs%2Fmiles.jpeg?alt=media&token=57761a5b-3caa-437a-a1d5-9cb79a4a9fc1"
        />
        <Box
          w="100vw"
          h="40vh"
          position={"absolute"}
          zIndex={1}
          top={-2}
          background={
            "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
          }
          backgroundSize="10px 10px"
          opacity={0.3}
        />
        <Center minH={"40vh"} color="white" zIndex={2}>
          <Heading textShadow={`3px 3px ${lightColor}`} fontSize={"7xl"}>
            Notes
          </Heading>
        </Center>
        <VStack position={"relative"}>
          <HStack
            gap={3}
            my={"10"}
            border={"1px solid"}
            padding={"10"}
            rounded={"2xl"}
          >
            <Heading>Category : {category}</Heading>
            <Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<GoThreeBars />}
                  variant="outline"
                />
                <MenuList>
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
          <NoteGrid notes={notes} />
          <Divider py={3} />
        </VStack>
      </VStack>
    </>
  );
}
