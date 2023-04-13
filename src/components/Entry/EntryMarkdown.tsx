import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useEffect, useState } from "react";
import Toc from "@/components/Entry/TOC";
import "@fontsource/noto-sans-kr";

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

interface IEntryMainPageProps {
  md: string;
}

export default function EntryMarkdown({ md }: IEntryMainPageProps) {
  const colorMode = useColorModeValue("light", "dark");
  const [re, setRe] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setRe(true);
    }, 500);
  }, []);

  return (
    <>
      <Flex
        w="full"
        position={"relative"}
        overflow={"hidden"}
        justifyContent={"center"}
      >
        <Box width={"55vw"} height="auto" data-color-mode={colorMode}>
          <CustomStyle>
            <MarkdownPreview
              source={md}
              style={{
                backgroundColor: colorMode === "dark" ? "#1A202C" : undefined,
                fontFamily: "Noto Sans KR, sans-serif",
              }}
            />
          </CustomStyle>
        </Box>
        {re && (
          <Box position={"fixed"} right={10} top={150} zIndex={1}>
            <Toc md={md} />
          </Box>
        )}
      </Flex>
    </>
  );
}
