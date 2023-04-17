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
  Image,
  VStack,
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
import OtherCardMobile from "./EntryFooter/OtherCardMobile";
import CommentInputMobile from "./EntryFooter/CommentInputMobile";
import CommentsMobile from "./EntryFooter/CommentsMobile";

interface IEntryFooterProps {
  category: string;
  docId: string;
}

export default function EntryFooterMobile({
  category,
  docId,
}: IEntryFooterProps) {
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
          title: note.data().title,
          category: note.data().category,
          createdAt: note.data().createdAt,
          thumbnailUrl: note.data().thumbnailUrl,
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
          <Image
            alt="footerImg"
            w="100vw"
            h="40vh"
            position={"absolute"}
            zIndex={-1}
            src={`/assets/imgs/main/${backgroundImage}`}
          />
          <Box
            w="100vw"
            h="40vh"
            position={"absolute"}
            zIndex={1}
            background={
              "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
            }
            backgroundSize="10px 10px"
            opacity={0.3}
          />
          <Center
            w="100vw"
            h="40vh"
            position="relative"
            zIndex={4}
            flexDir={"column"}
            justifyContent={"space-around"}
          >
            <Flex
              w="full"
              justifyContent={"space-between"}
              alignItems={"center"}
              px="5"
            >
              <Heading
                fontSize="md"
                fontWeight="extrabold"
                textShadow={"black 1px 0 10px"}
                color={"white"}
              >
                카테고리의 다른글
              </Heading>
              <Link href={`/notes/${category}`}>
                <Button size={"sm"} colorScheme={colorTheme}>
                  다른글 더 보기
                </Button>
              </Link>
            </Flex>
            <VStack w="full">
              {notes?.map((note) => (
                <OtherCardMobile
                  key={note.id}
                  title={note.title}
                  thumbnailUrl={note.thumbnailUrl}
                  category={note.category}
                  docId={note.id}
                />
              ))}
            </VStack>
          </Center>
        </Box>

        {/* comments */}
        <Box
          w={"full"}
          height={"auto"}
          position="relative"
          zIndex={5}
          bgColor={bgColor}
        >
          <CommentInputMobile docId={docId} />
          <CommentsMobile docId={docId} />
        </Box>
      </Box>
    </>
  );
}
