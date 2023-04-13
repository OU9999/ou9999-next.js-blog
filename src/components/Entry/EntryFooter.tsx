import { images } from "@/constants/mainpageArray";
import { INotes } from "@/pages/notes/[category]";
import { colorThemeAtom } from "@/utils/atoms";
import { dbService } from "@/utils/firebase";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  useColorModeValue,
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
import { useRecoilValue } from "recoil";
import NoteCard from "../Notes/NoteCard";
import CommentInput from "./EntryFooter/CommentInput";
import Comments from "./EntryFooter/Comments";

interface IEntryFooterProps {
  category: string;
  docId: string;
}

export default function EntryFooter({ category, docId }: IEntryFooterProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [notes, setNotes] = useState<INotes[] | undefined>(undefined);
  const bgColor = useColorModeValue("white", "#1A202C");

  const getNotes = async (category: string) => {
    try {
      const q = query(
        collection(dbService, "notes"),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(3)
      );
      onSnapshot(q, (snapshot) => {
        const notesArr: any = snapshot.docs.map((note) => ({
          id: note.id + "",
          ...note.data(),
        }));
        setNotes(notesArr);
      });
    } catch (error: any) {}
  };

  useEffect(() => {
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  useEffect(() => {
    getNotes(category);
  }, [category]);

  return (
    <>
      <Box w="full" zIndex={1} position="relative" pb={"28"}>
        <Box py={"10"} />
        <Box width={"full"} height={"auto"} position={"relative"}>
          <Box
            w="100vw"
            h="100vh"
            position={"absolute"}
            zIndex={-1}
            backgroundRepeat="no-repeat"
            backgroundAttachment={"fixed"}
            backgroundSize="cover"
            backgroundPosition={"center center"}
            backgroundImage={`/assets/imgs/main/${backgroundImage}`}
          />
          <Box
            w="100vw"
            h="100vh"
            position={"absolute"}
            zIndex={1}
            background={
              "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
            }
            backgroundSize="10px 10px"
            opacity={0.3}
          />
        </Box>
        <Box
          width={"full"}
          height={"auto"}
          position="relative"
          zIndex={4}
          paddingX={20}
          paddingTop={20}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading
              fontSize="6xl"
              fontWeight="extrabold"
              textShadow={"black 1px 0 10px"}
              color={"white"}
            >
              카테고리의 다른글
            </Heading>
            <Link href={`/notes/${category}`}>
              <Button colorScheme={colorTheme}>다른글 더 보기</Button>
            </Link>
          </Flex>
        </Box>

        {/* NoteCards */}
        <Center
          w="full"
          paddingTop={10}
          gap={20}
          position="relative"
          zIndex={4}
        >
          {notes?.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              thumbnailUrl={note.thumbnailUrl}
              md={note.md}
              category={note.category}
              link={note.id}
              createdAt={note.createdAt}
            />
          ))}
        </Center>

        {/* comments */}
        <Box
          w={"full"}
          height={"auto"}
          position="relative"
          zIndex={5}
          bgColor={bgColor}
        >
          <CommentInput docId={docId} />
          <Comments docId={docId} />
        </Box>
      </Box>
    </>
  );
}
