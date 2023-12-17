import { images } from "@/constants/mainpageArray";
import { colorThemeAtom } from "@/utils/atoms";
import { dbService } from "@/firebase/firebase";
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
import { INotesArr } from "@/firebase/firebaseTypes";
import { IEntryFooterProps } from "@/components/Entry/EntryFooter";

export default function EntryFooterMobile({
  category,
  docId,
  notesArr,
  previousNote,
  nextNote,
}: IEntryFooterProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const bgColor = useColorModeValue("white", "#1A202C");

  useEffect(() => {
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

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
              {notesArr?.slice(0, 4).map((note) => (
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
