import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useEffect, useState } from "react";
import "@fontsource/noto-sans-kr";
import { useRecoilValue } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";
import { returnColors } from "@/utils/utilFn";
import Toc from "./TOC";

//custom style for md view
const CustomStyle = styled.div<{ colorTheme: string }>`
  blockquote {
    background-color: gray;
    border: none;
    border-left: 10px solid ${(props) => props.colorTheme};
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

// const Toc = dynamic(() => import("@/components/Entry/TOC"), {
//   ssr: false,
// });

interface IEntryMainPageProps {
  md: string;
}

export default function EntryMarkdown({ md }: IEntryMainPageProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const relativeColor = useColorModeValue(lightColor, darkColor);
  const colorMode = useColorModeValue("light", "dark");

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
    setDarkColor(dc);
  }, [colorTheme]);

  return (
    <>
      <Flex
        w="full"
        position={"relative"}
        overflow={"hidden"}
        justifyContent={"center"}
      >
        <Box
          pos={"relative"}
          width={"55vw"}
          maxW={"880px"}
          height="auto"
          data-color-mode={colorMode}
        >
          <CustomStyle colorTheme={relativeColor}>
            <MarkdownPreview
              source={md}
              style={{
                backgroundColor: colorMode === "dark" ? "#1A202C" : undefined,
                fontFamily: "Noto Sans KR, sans-serif",
              }}
            />
          </CustomStyle>

          <Box position={"fixed"} right={7} top={150} zIndex={1}>
            <Toc md={md} />
          </Box>
        </Box>
      </Flex>
    </>
  );
}
