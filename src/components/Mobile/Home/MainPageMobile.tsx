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
import PostMobile from "./PostMobile";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Variants, motion, useAnimation } from "framer-motion";
import { INotesArr } from "@/firebase/firebaseTypes";

interface IMainPageMobileProps {
  notesArr: INotesArr[];
}

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

export default function MainPageMobile({ notesArr }: IMainPageMobileProps) {
  const [time, setTime] = useState(0);
  const [quote, setQuote] = useState<string>("");
  const [limitCount, setLimitCount] = useState(4);
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

  useEffect(() => {
    setQt();
  }, []);

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

        <Divider />
        <Heading py={5}>최신 글 🔥</Heading>
        <VStack w="full" px={10} gap={10} spacing={0}>
          {notesArr?.slice(0, limitCount).map((note) => (
            <Box key={note.id} w="full">
              <PostMobile
                key={"postMobile" + note.id!}
                link={note.id!}
                title={note.title!}
                thumbnailUrl={note.thumbnailUrl!}
                category={note.category!}
                createdAt={note.createdAt!}
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
