import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import MainPage from "./MainPage";
import StartCard from "./StartCard";
import Link from "next/link";
import { MdExpandMore } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import IntroduceModal from "./IntroduceModal";
import { useEffect, useState } from "react";
import { INotes } from "@/pages/notes/[category]";
import { useRecoilValue } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "@/utils/firebase";
import Post from "./Post";

export default function MainScroll() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState<INotes[] | undefined>();
  const [limitCount, setLimitCount] = useState(4);
  const colorTheme = useRecoilValue(colorThemeAtom);

  const onMoreClicked = () => {
    setLimitCount((prev) => prev + 4);
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
          <HStack border={"1px dashed"} p={10} my={10}>
            <Box fontSize={"3xl"}>
              <HiSpeakerphone />
            </Box>
            <Text>
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
                    src={`/assets/imgs/icon/profile.jpeg`}
                  />
                </Box>
                <Link href="https://github.com/OU9999" target="_blank">
                  <StartCard
                    heading="Github"
                    text="OU9999"
                    src={`/assets/imgs/icon/github.png`}
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
          <Heading py={10}>최신 글 🔥</Heading>
          <VStack gap={10}>
            {notes?.map((note, index) => (
              <Post
                key={note.id}
                link={note.id}
                title={note.title}
                md={note.md}
                thumbnailUrl={note.thumbnailUrl}
                category={note.category}
                createdAt={note.createdAt}
                reverse={index % 2 === 0 ? true : false}
              />
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
