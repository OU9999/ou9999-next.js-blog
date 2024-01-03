import { images } from "@/constants/mainpageArray";
import { colorThemeAtom } from "@/utils/atoms";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import OtherPostMobile from "./EntryFooter/OtherPostMobile/OtherPostMobile";
import OtherPost from "./EntryFooter/OtherPost";
import { IEntryFooterProps } from "@/components/Entry/EntryFooter";
import CommentBoxMobile from "./EntryFooter/CommentBoxMobile";

export default function EntryFooterMobile({
  category,
  docId,
  notesArr,
  previousNote,
  nextNote,
}: IEntryFooterProps) {
  //state
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

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
              <Link href={`/notes/${category}/1`}>
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
        <CommentBoxMobile docId={docId} />
      </Box>
    </>
  );
}
