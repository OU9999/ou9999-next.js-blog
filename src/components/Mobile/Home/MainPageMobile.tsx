import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { images, quotes } from "@/constants/mainpageArray";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RxSlash } from "react-icons/rx";
import { MdExpandMore } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";
import { INotes } from "@/pages/notes/[category]";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "@/utils/firebase";
import PostMobile from "./PostMobile";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { returnColors } from "@/utils/utilFn";

export default function MainPageMobile() {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [notes, setNotes] = useState<INotes[] | undefined>();
  const [limitCount, setLimitCount] = useState(4);
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [bgColor, setBgColor] = useState("");

  const onMoreClicked = () => {
    setLimitCount((prev) => prev + 4);
  };

  const setBg = () => {
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
  };

  const setQt = () => {
    setQuote(`${quotes[Math.floor(Math.random() * quotes.length)]}`);
  };

  const onChangeButtonClicked = () => {
    setBg();
    setQt();
  };

  const getNotes = async (limitCount: number) => {
    const q = query(
      collection(dbService, "notes"),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    onSnapshot(q, (snapshot) => {
      const notesArr: any = snapshot.docs.map((note) => ({
        id: note.id + "",
        ...note.data(),
      }));
      setNotes(notesArr);
    });
  };

  useEffect(() => {
    getNotes(limitCount);
  }, [limitCount]);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
    setBgColor(hbc);
  }, [colorTheme]);

  useEffect(() => {
    onChangeButtonClicked();
  }, []);

  useEffect(() => {
    if (
      backgroundImage ===
      "https://firebasestorage.googleapis.com/v0/b/ou9999-first-blog.appspot.com/o/imgs%2Feye.jpg?alt=media&token=ce326f62-40a5-45d0-a4da-b31697174803"
    ) {
      setBg();
    }
  }, [backgroundImage]);

  return (
    <>
      <VStack w="100vw" h="auto" overflow={"hidden"}>
        <Image
          alt="mainImg"
          w="100vw"
          h={"30vh"}
          position={"absolute"}
          zIndex={-1}
          src={backgroundImage}
        />
        <Box
          w="100vw"
          h={"30vh"}
          position={"absolute"}
          zIndex={1}
          top={-2}
          background={
            "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
          }
          backgroundSize="10px 10px"
          opacity={0.3}
        />
        <Center w="full" h={"30vh"} zIndex={2}>
          <Box
            fontSize={"5xl"}
            color={lightColor}
            onClick={onChangeButtonClicked}
          >
            <AiOutlineLeft />
          </Box>
          <Text
            fontSize={"5xl"}
            fontWeight={"bold"}
            color={"white"}
            textShadow={`${lightColor} 1px 0 30px`}
          >
            OU9999
          </Text>
          <HStack
            fontSize={"5xl"}
            spacing={-3}
            color={lightColor}
            onClick={onChangeButtonClicked}
          >
            <RxSlash />
            <AiOutlineRight />
          </HStack>
        </Center>
        <Divider pt={3} />

        <HStack px={5} gap={1}>
          <FaQuoteLeft />
          <Text fontWeight={"bold"}>{quote}</Text>
          <FaQuoteRight />
        </HStack>

        <Divider />
        <Heading py={10}>최신 글 🔥</Heading>
        <VStack gap={10}>
          {notes?.map((note) => (
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
          <IconButton
            aria-label="expand"
            fontSize={"5xl"}
            padding={"5"}
            variant={"ghost"}
            colorScheme={"purple"}
            onClick={onMoreClicked}
          >
            <MdExpandMore />
          </IconButton>
        </VStack>
      </VStack>
    </>
  );
}
