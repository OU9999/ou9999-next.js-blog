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
import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RxSlash } from "react-icons/rx";
import { MdExpandMore } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { colorThemeAtom, isMobileAtom } from "@/utils/atoms";
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
import { Variants, motion, useAnimation } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const backgroundVariants: Variants = {
  normal: { opacity: 1 },
  clicked: {
    opacity: [1, 0],
    filter: ["blur(0px)", "blur(90px)"],
    transition: {
      duration: 1,
      type: "linear",
    },
  },
  done: {
    opacity: [0, 0, 0, 1],
    filter: ["blur(90px)", "blur(60px)", "blur(30px)", "blur(0px)"],
    transition: {
      duration: 1,
      type: "linear",
    },
  },
};

export default function MainPageMobile() {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [notes, setNotes] = useState<INotes[] | undefined>();
  const [limitCount, setLimitCount] = useState(4);
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const backgroundAni = useAnimation();
  const interval = useRef<NodeJS.Timer>();

  const onMoreClicked = () => {
    setLimitCount((prev) => prev + 4);
  };

  const setBgAndQuote = () => {
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const onResetButtonClicked = async () => {
    setTime(0);
    backgroundAni.start("clicked");
    await setBgAndQuote();
    await backgroundAni.start("done");
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
    setBgAndQuote();
  }, []);

  useEffect(() => {
    getNotes(limitCount);
  }, [limitCount]);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
    setBgColor(hbc);
  }, [colorTheme]);

  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time >= 30) {
        onResetButtonClicked();
      } else {
        setTime((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

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
          as={motion.img}
          variants={backgroundVariants}
          animate={backgroundAni}
          initial={"normal"}
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
        <Center w="full" h={"30vh"} zIndex={2} pos={"relative"}>
          <Box pos={"absolute"} w="9" bottom={5} right={5} zIndex={10}>
            <CircularProgressbar
              value={(time / 30) * 100}
              strokeWidth={50}
              styles={buildStyles({
                pathTransitionDuration: 1,
                strokeLinecap: "butt",
                pathColor: lightColor,
              })}
            />
          </Box>
          <Box
            fontSize={"5xl"}
            color={lightColor}
            onClick={onResetButtonClicked}
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
            onClick={onResetButtonClicked}
          >
            <RxSlash />
            <AiOutlineRight />
          </HStack>
        </Center>
        <Divider pt={3} />

        <HStack
          px={5}
          gap={1}
          as={motion.div}
          variants={backgroundVariants}
          animate={backgroundAni}
          initial={"normal"}
        >
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
