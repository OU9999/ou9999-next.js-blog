import { isLoginAtom, writeAtom } from "@/utils/atoms";
import { vhToPixels } from "@/utils/utilFn";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AddModal from "@/components/Write/AddModal";

export const getServerSideProps = async ({ resolvedUrl }: any) => {
  return {
    props: { resolvedUrl },
  };
};

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export default function Write({ resolvedUrl }: any) {
  console.log(resolvedUrl);
  const setIsWrite = useSetRecoilState(writeAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const [md, setMd] = useState<string | undefined>("# 내용을 입력하세요...");
  const [vh, setVh] = useState<number>();
  const [secondVh, setSecondVh] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const colorMode = useColorModeValue("light", "dark");
  const bgColor = useColorModeValue("#ecf0f1", "#0E1117");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onTitleChange = (e: any) => {
    setTitle(e.currentTarget.value);
  };

  const onSaveClicked = () => {
    if (isLogin) {
      if (title !== "") {
        onOpen();
      } else {
        toast({
          title: "제목이 비어있습니다.",
          position: "top",
          isClosable: true,
          status: "error",
        });
      }
    } else {
      toast({
        title: "게스트는 글 작성이 불가능합니다.",
        position: "top",
        isClosable: true,
        status: "error",
      });
    }
  };

  useEffect(() => {
    setVh(vhToPixels(78));
    setSecondVh(vhToPixels(100));
    setIsWrite(true);
    return () => {
      setIsWrite(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HStack
        minW={"100vw"}
        minH={"100vh"}
        boxSizing={"border-box"}
        as={motion.div}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3, type: "linear" },
        }}
      >
        <VStack w={"50%"} minH={"100vh"}>
          <Input
            width={"48vw"}
            minH={"10vh"}
            mt={"3"}
            padding={"10"}
            bgColor={bgColor}
            placeholder="제목을 입력하세요..."
            size="lg"
            fontSize={"4xl"}
            value={title}
            onChange={onTitleChange}
            border={"1px solid"}
            rounded={"1rem"}
            fontWeight={"bold"}
          />
          <Box width={"50vw"} height={"auto"} data-color-mode={colorMode}>
            <MDEditor value={md} onChange={setMd} height={vh} preview="edit" />
          </Box>
          <Flex width={"100%"} height={"8vh"} alignItems={"center"} px={"10"}>
            <Flex width={"50%"}>
              <Link href={"/"}>
                <Button variant={"ghost"} fontSize={"2xl"}>
                  ← 나가기
                </Button>
              </Link>
            </Flex>
            <Flex width={"50%"} justifyContent={"flex-end"} gap={4}>
              <Link href={"/"}>
                <Button
                  variant={"ghost"}
                  colorScheme={"twitter"}
                  fontSize={"2xl"}
                >
                  임시저장
                </Button>
              </Link>

              <Button
                onClick={onSaveClicked}
                colorScheme={"twitter"}
                fontSize={"2xl"}
              >
                노트작성
              </Button>
            </Flex>
          </Flex>
        </VStack>
        <VStack w={"50%"} minH={"100vh"} justifyContent={"center"}>
          <Box width={"50vw"} data-color-mode={colorMode}>
            <MDEditor
              style={{ padding: 10, border: "none" }}
              value={md}
              height={secondVh}
              preview="preview"
              hideToolbar={true}
            />
          </Box>
        </VStack>
        <AddModal
          isOpen={isOpen}
          onClose={onClose}
          bgColor={bgColor}
          title={title}
          md={md!}
        />
      </HStack>
    </>
  );
}
