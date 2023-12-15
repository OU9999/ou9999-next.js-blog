import { images } from "@/constants/mainpageArray";
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
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CommentInputMobile from "./EntryFooter/CommentInputMobile";
import CommentsMobile from "./EntryFooter/CommentsMobile";
import OtherPostMobile from "./EntryFooter/OtherPostMobile/OtherPostMobile";
import OtherPost from "./EntryFooter/OtherPost";
import { INotesArr } from "@/utils/firebaseTypes";

interface IEntryFooterProps {
  category: string;
  docId: string;
}
export interface INextPrev {
  id: string;
  title: string;
}

export default function EntryFooterMobile({
  category,
  docId,
}: IEntryFooterProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [notes, setNotes] = useState<INotesArr[] | undefined>(undefined);
  const [previousNote, setPreviousNote] = useState<INextPrev | null>(null);
  const [nextNote, setNextNote] = useState<INextPrev | null>(null);
  const bgColor = useColorModeValue("white", "#1A202C");

  const getNotes = async (category: string, docId: string) => {
    try {
      const q = query(
        collection(dbService, "notes"),
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
        const notesArr = snapshot.docs.map((note) => ({
          id: note.id + "",
          title: note.data().title,
          category: note.data().category,
          createdAt: note.data().createdAt,
          thumbnailUrl: note.data().thumbnailUrl,
          description: note.data().description,
        }));

        setNotes(notesArr);

        const currentNoteIndex = notesArr.findIndex(
          (note: INotesArr) => note.id === docId
        );
        const nextNoteIndex =
          currentNoteIndex > 0 ? currentNoteIndex - 1 : null;
        const previousNoteIndex =
          currentNoteIndex < notesArr.length - 1 ? currentNoteIndex + 1 : null;

        const previousNoteValue =
          previousNoteIndex !== null ? notesArr[previousNoteIndex] : null;
        const nextNoteValue =
          nextNoteIndex !== null ? notesArr[nextNoteIndex] : null;

        setPreviousNote(previousNoteIndex !== null ? previousNoteValue : null);
        setNextNote(nextNoteIndex !== null ? nextNoteValue : null);
      });
    } catch (error: any) {}
  };

  useEffect(() => {
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  useEffect(() => {
    getNotes(category, docId);
  }, [category, docId]);

  return (
    <>
      <OtherPostMobile next={nextNote} prev={previousNote} />
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
            opacity={0.7}
          />
          <Center
            w="100vw"
            h="40vh"
            position="relative"
            zIndex={4}
            flexDir={"column"}
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
            <VStack w="full" alignItems={"flex-start"} p={5} gap={1}>
              {notes?.slice(0, 4).map((note) => (
                <OtherPost key={note.id} title={note.title!} docId={note.id!} />
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
