import GBComments from "@/components/GuestBook/GBComments";
import GBInput from "@/components/GuestBook/GBInput";
import { colorThemeAtom } from "@/utils/atoms";
import { returnColors } from "@/utils/utilFn";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function GuestBookMainPage() {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
  }, [colorTheme]);

  return (
    <>
      <VStack h="auto" justifyContent={"flex-start"} position={"relative"}>
        <Box
          w="100vw"
          h="40vh"
          position={"absolute"}
          zIndex={-1}
          backgroundRepeat="no-repeat"
          backgroundAttachment={"fixed"}
          backgroundSize="cover"
          backgroundPosition={"center center"}
          backgroundImage="/assets/imgs/icon/jerry.gif"
        />
        <Box
          w="100vw"
          h="40vh"
          position={"absolute"}
          zIndex={1}
          top={-2}
          background={
            "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
          }
          backgroundSize="10px 10px"
          opacity={0.3}
        />

        <Center minH={"40vh"} color="white" zIndex={2}>
          <VStack gap={4}>
            <Heading textShadow={`3px 3px ${lightColor}`} fontSize={"7xl"}>
              Guest Book
            </Heading>
            <Text
              textShadow={"#000 1px 0 10px"}
              fontSize={"2xl"}
              fontWeight={"bold"}
            >
              시간 내서 블로그에 방문해주셔서 감사해요~ 익명 작성 가능합니다!
            </Text>
          </VStack>
        </Center>
        {/* comments */}
        <Box w={"full"} height={"auto"} zIndex={2} pt={"32"}>
          <GBInput />
          <GBComments />
        </Box>
      </VStack>
    </>
  );
}
