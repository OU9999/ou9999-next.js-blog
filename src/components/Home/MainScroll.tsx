import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import StartCard from "./StartCard";
import Link from "next/link";
import { MdExpandMore } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import IntroduceModal from "./IntroduceModal";
import { useState } from "react";
import { INotes } from "@/pages/notes/[category]";
import { useRecoilValue } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";
import Post from "./Post";
import { motion } from "framer-motion";
import MainPage from "./MainPage";

interface IMainScrollProps {
  notesArr: INotes[];
}

const item = {
  hidden: { opacity: 0 },
  show: (idx: number) => {
    return {
      opacity: [0, 1],
      y: [100, 0],
      transition: {
        duration: 0.5,
        type: "linear",
        delay: 0.05 * idx,
      },
    };
  },
};

export default function MainScroll({ notesArr }: IMainScrollProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [limitCount, setLimitCount] = useState(4);
  const colorTheme = useRecoilValue(colorThemeAtom);

  const onMoreClicked = () => {
    setLimitCount((prev) => prev + 4);
  };

  return (
    <>
      <VStack
        h={"auto"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        position={"relative"}
        w="100vw"
      >
        <MainPage />
        <VStack w={"100%"} justifyContent={"center"}>
          <HStack
            border={"1px dashed"}
            rounded={"md"}
            w={{
              md: "2xl",
              lg: "3xl",
              xl: "5xl",
            }}
            p={10}
            my={10}
          >
            <Box fontSize={"3xl"}>
              <HiSpeakerphone />
            </Box>
            <Text fontSize={"xl"}>
              Firebase 무료 요금제여서... 대역폭 한도가 금방차네요! 한동한
              이미지 업로드 기능은 제한할 예정입니다!
            </Text>
          </HStack>
          <Heading py={10}>START!</Heading>
          <HStack w={"full"}>
            <Center w={"full"}>
              <HStack gap={3} boxSizing="border-box" justifyContent={"center"}>
                <Box onClick={onOpen}>
                  <StartCard
                    heading="Introduce"
                    text="응애 나 애기 개발자 꿈나무"
                    src={`/assets/imgs/icon/profile.webp`}
                  />
                </Box>
                <Link href="https://github.com/OU9999" target="_blank">
                  <StartCard
                    heading="Github"
                    text="OU9999"
                    src={`/assets/imgs/icon/github.webp`}
                  />
                </Link>
                <Link href="https://velog.io/@ou9999" target="_blank">
                  <StartCard
                    heading="Velog"
                    text="이전 블로그"
                    src={`/assets/imgs/icon/velog.webp`}
                  />
                </Link>
              </HStack>
            </Center>
          </HStack>

          <Divider py={8} />
          <VStack gap={10} w={"full"} h="auto">
            <Flex w="full" justifyContent={"center"}>
              <Heading py={10} fontSize={"6xl"}>
                최신 글
              </Heading>
            </Flex>

            {notesArr?.slice(0, limitCount).map((note, index) => (
              <Box
                key={note.id}
                as={motion.div}
                initial={{
                  opacity: 0,
                  y: 100,
                }}
                variants={item}
                whileInView={"show"}
                custom={index}
                viewport={{ once: true }}
              >
                <Post
                  key={note.id}
                  link={note.id}
                  title={note.title}
                  description={note.description}
                  thumbnailUrl={note.thumbnailUrl}
                  category={note.category}
                  createdAt={note.createdAt}
                  reverse={index % 2 === 0 ? true : false}
                />
              </Box>
            ))}
            <IconButton
              aria-label="expand"
              fontSize={"5xl"}
              padding={"5"}
              variant={"ghost"}
              colorScheme={colorTheme}
              onClick={onMoreClicked}
            >
              <MdExpandMore />
            </IconButton>
          </VStack>
          <Divider py={3} />
        </VStack>
      </VStack>
      <IntroduceModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
