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
        <Image
          alt="mainImg"
          w="100vw"
          h={"30vh"}
          position={"absolute"}
          zIndex={-1}
          src="https://firebasestorage.googleapis.com/v0/b/ou9999-first-blog.appspot.com/o/icons%2Fjerry.gif?alt=media&token=b7813d8a-f932-46ee-a480-dca70707d3c6"
        />
        <Box
          w="100vw"
          h="30vh"
          position={"absolute"}
          zIndex={1}
          top={-2}
          background={
            "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
          }
          backgroundSize="10px 10px"
          opacity={0.3}
        />
        <Center minH={"30vh"} color="white" zIndex={2}>
          <VStack gap={2}>
            <Heading textShadow={`3px 3px ${lightColor}`} fontSize={"5xl"}>
              Guest Book
            </Heading>
            <VStack gap={0} spacing={0}>
              <Text
                textShadow={"#000 1px 0 10px"}
                fontSize={"md"}
                fontWeight={"bold"}
              >
                시간 내서 블로그에 방문해주셔서 감사해요~
              </Text>
              <Text
                textShadow={"#000 1px 0 10px"}
                fontSize={"md"}
                fontWeight={"bold"}
              >
                익명 작성 가능합니다!
              </Text>
            </VStack>
          </VStack>
        </Center>

        {/* comments */}
        <Box w={"full"} height={"auto"} zIndex={2}>
          <GBInputMobile />
          <GBCommentsMobile />
        </Box>
      </VStack>
    </>
  );
}
