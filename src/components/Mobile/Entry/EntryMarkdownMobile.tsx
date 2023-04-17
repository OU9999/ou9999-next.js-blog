import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@fontsource/noto-sans-kr";
import { colorThemeAtom } from "@/utils/atoms";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { returnColors } from "@/utils/utilFn";

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
        <Box width={"80vw"} height="auto" data-color-mode={colorMode}>
          <CustomStyle colorTheme={relativeColor}>
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
