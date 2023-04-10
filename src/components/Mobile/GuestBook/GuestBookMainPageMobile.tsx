import { colorThemeAtom } from "@/utils/atoms";
import { returnColors } from "@/utils/utilFn";
import { Box, Center, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import GBInputMobile from "./GBInputMobile";
import GBCommentsMobile from "./GBCommentsMobile";

export default function GuestBookMainPageMobile() {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
  }, [colorTheme]);
  return (
    <>
      <VStack
        w="100vw"
        h="auto"
        justifyContent={"flex-start"}
        position={"relative"}
        overflow={"hidden"}
      >
        {/* comments */}
        <Box w={"full"} height={"auto"} zIndex={2}>
          <GBInputMobile />
          <GBCommentsMobile />
        </Box>
      </VStack>
    </>
  );
}
