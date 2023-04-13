import DeleteModal from "@/components/Entry/DeleteModal";
import EntryFooter from "@/components/Entry/EntryFooter";
import { isLoginAtom } from "@/utils/atoms";
import {
  dateFormatter,
  returnUrlTitle,
  selectBasicThumbnail,
} from "@/utils/utilFn";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BiTimeFive } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useEffect, useState } from "react";
import Toc from "@/components/Entry/TOC";
import "@fontsource/noto-sans-kr";
import Image from "next/image";

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
    margin: 10px;
    width: 100%;
    border-radius: 20px;
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

export default function EntryMainPage({ detail, docId }: IEntryProps) {
  const colorMode = useColorModeValue("light", "dark");
  const isLogin = useRecoilValue(isLoginAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const date = dateFormatter(detail.createdAt);
  const urlTitle = returnUrlTitle(detail.title);
  const [re, setRe] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setRe(true);
    }, 500);
  }, []);

  return (
    <>
      <VStack height={"auto"} width="100vw">
        <Box
          w="100vw"
          h="50vh"
          position={"absolute"}
          zIndex={30}
          backgroundRepeat="no-repeat"
          backgroundAttachment={"fixed"}
          backgroundSize="cover"
          backgroundPosition={"center center"}
          backgroundImage={selectBasicThumbnail(detail.category)}
        />
        <Box
          w="100vw"
          h="50vh"
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
          minH={"50vh"}
          width="full"
          color="white"
          zIndex={33}
          position={"relative"}
        >
          <VStack gap={5}>
            <Heading textShadow={"#000 1px 0 10px"} fontSize={"5xl"} px={20}>
              {detail?.title}
            </Heading>
            <HStack gap={10}>
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
              >
                <Box fontSize={"2xl"}>
                  <GoThreeBars />
                </Box>
                <Text
                  textShadow={"#000 1px 0 10px"}
                  fontSize={"2xl"}
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
                <Box fontSize={"2xl"}>
                  <BiTimeFive />
                </Box>
                <Text
                  textShadow={"#000 1px 0 10px"}
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                >
                  {date}
                </Text>
              </HStack>
            </HStack>

            {isLogin ? (
              <HStack
                position={"absolute"}
                bottom={10}
                right={10}
                gap={3}
                color="white"
                fontWeight={"bold"}
              >
                <Link
                  href={{
                    pathname: `/write/${urlTitle}/${docId}`,
                  }}
                >
                  <Box
                    cursor={"pointer"}
                    _hover={{
                      borderBottom: "1px solid",
                    }}
                  >
                    <Text>수정</Text>
                  </Box>
                </Link>
                <Box
                  onClick={onOpen}
                  cursor={"pointer"}
                  _hover={{
                    borderBottom: "1px solid",
                  }}
                >
                  <Text>삭제</Text>
                </Box>
              </HStack>
            ) : null}
          </VStack>
        </Center>

        <Box py={32}>
          <Box
            overflow={"hidden"}
            rounded="3xl"
            w="3xl"
            h="md"
            maxW={"50vw"}
            transform={"auto"}
            boxShadow={"dark-lg"}
          >
            <Image
              aria-label="thumbnail"
              src={selectBasicThumbnail(detail.category)}
              fill={true}
              alt="thumbnail"
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>

        <Flex
          w="full"
          position={"relative"}
          overflow={"hidden"}
          justifyContent={"center"}
        >
          <Box width={"55vw"} height="auto" data-color-mode={colorMode}>
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
          {re && (
            <Box position={"fixed"} right={10} top={150} zIndex={1}>
              <Toc md={detail.md} />
            </Box>
          )}
        </Flex>

        <Box position={"relative"} w="full" h="auto" zIndex={32}>
          <EntryFooter category={detail.category} docId={docId} />
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
