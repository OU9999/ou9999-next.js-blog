import {
  Box,
  Center,
  Divider,
  Flex,
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
import {
  FaEye,
  FaQuoteLeft,
  FaQuoteRight,
  FaRegCommentDots,
} from "react-icons/fa";
import { returnColors } from "@/utils/utilFn";
import { Variants, motion, useAnimation } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import MainImgMobile from "../MainImgMobile";
import { reactThumbnail } from "@/constants/basicThumbnail";
import { GoThreeBars } from "react-icons/go";
import { BiTimeFive } from "react-icons/bi";

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
  const [quote, setQuote] = useState<string>("");
  const [notes, setNotes] = useState<INotes[] | undefined>();
  const [limitCount, setLimitCount] = useState(4);
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const backgroundAni = useAnimation();

  const onMoreClicked = () => {
    setLimitCount((prev) => prev + 4);
  };

  const setQt = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const onResetButtonClicked = async () => {
    setTime(0);
    backgroundAni.start("clicked");
    await setQt();
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
    setQt();
  }, []);

  useEffect(() => {
    getNotes(limitCount);
  }, [limitCount]);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
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
        <VStack w="full" px={10} gap={10} spacing={0}>
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
