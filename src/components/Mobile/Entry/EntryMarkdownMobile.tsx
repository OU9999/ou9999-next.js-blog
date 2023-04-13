import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
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

interface IEntryMarkdownMobileProps {
  md: string;
}

export default function EntryMarkdownMobile({ md }: IEntryMarkdownMobileProps) {
  const colorMode = useColorModeValue("light", "dark");

  return (
    <>
      <Flex
        w="full"
        position={"relative"}
        overflow={"hidden"}
        justifyContent={"center"}
      >
        <Box width={"80vw"} height="auto" data-color-mode={colorMode}>
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
      </Flex>
    </>
  );
}
