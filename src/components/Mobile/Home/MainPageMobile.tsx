import {
  Box,
  Divider,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { quotes } from "@/constants/mainpageArray";
import { useEffect, useState } from "react";
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
import { Variants, motion, useAnimation } from "framer-motion";
import { HiSpeakerphone } from "react-icons/hi";

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
        title: note.data().title,
        category: note.data().category,
        createdAt: note.data().createdAt,
        thumbnailUrl: note.data().thumbnailUrl,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          py={3}
        >
          <FaQuoteLeft />
          <Text fontWeight={"bold"}>{quote}</Text>
          <FaQuoteRight />
        </HStack>
        <HStack border={"1px dashed"} p={3} my={10}>
          <Box fontSize={"3xl"}>
            <HiSpeakerphone />
          </Box>
          <Text>
            Firebase 무료 요금제여서... 대역폭 한도가 금방차네요! 한동한 이미지
            업로드 기능은 제한할 예정입니다!
          </Text>
        </HStack>
        <Divider />
        <Heading py={10}>최신 글 🔥</Heading>
        <VStack w="full" px={10} gap={10} spacing={0}>
          {notes?.map((note) => (
            <Box key={note.id} w="full">
              <PostMobile
                link={note.id}
                title={note.title}
                thumbnailUrl={note.thumbnailUrl}
                category={note.category}
                createdAt={note.createdAt}
              />
            </Box>
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
