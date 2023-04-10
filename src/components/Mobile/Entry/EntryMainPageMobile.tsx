import DeleteModal from "@/components/Entry/DeleteModal";
import { isEntryAtom, isLoginAtom } from "@/utils/atoms";
import { dateFormatter, selectBasicThumbnail } from "@/utils/utilFn";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { BiTimeFive } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import EntryFooterMobile from "./EntryFooterMobile";
import "@fontsource/noto-sans-kr";
import { useEffect } from "react";

//custom style for md view
const CustomStyle = styled.div`
  blockquote {
    background-color: gray;
    border: none;
    padding: 10px;
    color: white;
    border-radius: 10px;
  }
  img {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    border-radius: 15px;
  }
`;

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

export interface IDetail {
  category: string;
  createdAt: number;
  md: string;
  thumbnailUrl: string;
  title: string;
}

interface IEntryProps {
  detail: IDetail;
  docId: string;
}

export default function EntryMainPageMobile({ detail, docId }: IEntryProps) {
  const setIsEntry = useSetRecoilState(isEntryAtom);
  const colorMode = useColorModeValue("light", "dark");
  const isLogin = useRecoilValue(isLoginAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const date = dateFormatter(detail.createdAt);

  useEffect(() => {
    setIsEntry(true);
    return () => {
      setIsEntry(false);
    };
  }, []);

  return (
    <>
      <VStack
        height={"auto"}
        width="100vw"
        overflow={"hidden"}
        pos={"relative"}
      >
        <Image
          alt="mainImg"
          w="100vw"
          h={"30vh"}
          position={"absolute"}
          zIndex={-1}
          src={
            detail.thumbnailUrl === ""
              ? selectBasicThumbnail(detail.category)
              : detail.thumbnailUrl
          }
        />
        <Box
          w="100vw"
          h="30vh"
          position={"absolute"}
          zIndex={32}
          top={-2}
          background={
            "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
          }
          backgroundSize="10px 10px"
          opacity={0.3}
        />
        <Center
          minH={"30vh"}
          width="full"
          color="white"
          zIndex={33}
          position={"relative"}
        >
          <VStack gap={5} w="full" bgColor={"rgba(0,0,0,0.3)"} py={5}>
            <Heading textShadow={"#000 1px 0 10px"} fontSize={"xl"} px={10}>
              {detail?.title}
            </Heading>
            <HStack gap={10}>
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
              >
                <Box fontSize={"sm"}>
                  <GoThreeBars />
                </Box>
                <Text
                  textShadow={"#000 1px 0 10px"}
                  fontSize={"sm"}
                  fontWeight={"bold"}
                >
                  {detail?.category}
                </Text>
              </HStack>
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
              >
                <Box fontSize={"sm"}>
                  <BiTimeFive />
                </Box>
                <Text
                  textShadow={"#000 1px 0 10px"}
                  fontSize={"sm"}
                  fontWeight={"bold"}
                >
                  {date}
                </Text>
              </HStack>
            </HStack>

            {isLogin ? (
              <HStack
                position={"absolute"}
                bottom={4}
                right={4}
                gap={2}
                color="white"
                fontWeight={"bold"}
              >
                <Box
                  onClick={onOpen}
                  cursor={"pointer"}
                  _hover={{
                    borderBottom: "1px solid",
                  }}
                >
                  <Text fontSize={"sm"}>삭제</Text>
                </Box>
              </HStack>
            ) : null}
          </VStack>
        </Center>

        <Box px={10} py={16}>
          <Image
            alt="thumbnail"
            src={
              detail.thumbnailUrl === ""
                ? selectBasicThumbnail(detail.category)
                : detail.thumbnailUrl
            }
            rounded="3xl"
            h="auto"
            w={"auto"}
            transform={"auto"}
            boxShadow={"dark-lg"}
            border={"0px solid"}
          />
        </Box>
        <Flex
          w="full"
          position={"relative"}
          overflow={"hidden"}
          justifyContent={"center"}
        >
          <Box width={"80vw"} height="auto" data-color-mode={colorMode}>
            <CustomStyle>
              <MarkdownPreview
                source={detail.md}
                style={{
                  backgroundColor: colorMode === "dark" ? "#1A202C" : undefined,
                  fontFamily: "Noto Sans KR, sans-serif",
                }}
              />
            </CustomStyle>
          </Box>
        </Flex>

        <Box
          position={"relative"}
          w="full"
          h="auto"
          overflow={"hidden"}
          zIndex={32}
        >
          <EntryFooterMobile category={detail.category} docId={docId} />
        </Box>

        <DeleteModal
          isOpen={isOpen}
          onClose={onClose}
          id={docId}
          thumbnailUrl={detail?.thumbnailUrl!}
        />
      </VStack>
    </>
  );
}
