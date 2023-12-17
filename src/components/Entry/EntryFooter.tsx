import { images } from "@/constants/mainpageArray";
import { colorThemeAtom } from "@/utils/atoms";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CommentInput from "./EntryFooter/CommentInput";
import Comments from "./EntryFooter/Comments";
import AnotherCard from "./EntryFooter/Comment/AnotherCard";
import OtherPost from "./EntryFooter/OtherPost/OtherPost";
import { INote } from "@/firebase/firebaseTypes";

export interface IEntryFooterProps {
  category: string;
  docId: string;
  notesArr: INote[];
  previousNote: INote | null;
  nextNote: INote | null;
}

export default function EntryFooter({
  category,
  docId,
  notesArr,
  previousNote,
  nextNote,
}: IEntryFooterProps) {
  const [fullOverlay] = useMediaQuery("(min-width: 1280px)", {
    ssr: true,
    fallback: false,
  });

  const colorTheme = useRecoilValue(colorThemeAtom);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [limit, setLimit] = useState(4);
  const bgColor = useColorModeValue("white", "#1A202C");

  useEffect(() => {
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  useEffect(() => {
    if (fullOverlay) {
      setLimit(4);
    } else {
      setLimit(3);
    }
  }, [fullOverlay]);

  return (
    <>
      <OtherPost next={nextNote} prev={previousNote} />
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
        <Center w={"full"} h="auto">
          <Grid
            w={{
              md: "35vw",
              lg: "40vw",
              xl: "55vw",
            }}
            templateColumns={{
              md: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            position="relative"
            gap={10}
            px={10}
            pt={10}
            zIndex={4}
          >
            {notesArr?.slice(0, limit).map((note) => (
              <GridItem key={note.id} colSpan={1} rowSpan={1}>
                <Flex justifyContent={"center"} alignItems={"center"}>
                  <AnotherCard
                    link={note.id!}
                    title={note.title!}
                    createdAt={note.createdAt!}
                    thumbnailUrl={note.thumbnailUrl!}
                    category={note.category!}
                  />
                </Flex>
              </GridItem>
            ))}
          </Grid>
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
