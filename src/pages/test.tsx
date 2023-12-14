import { images } from "@/constants/mainpageArray";
import { colorThemeAtom, writeAtom } from "@/utils/atoms";
import {
  dateFormatter,
  dateFormatterMobile,
  returnColors,
} from "@/utils/utilFn";
import { Box, Center, Flex, HStack } from "@chakra-ui/react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RxSlash } from "react-icons/rx";
import TestText from "@/components/Test/TestText";
import moment from "moment";

const backgroundVariants: Variants = {
  normal: { opacity: 1 },
  clicked: {
    opacity: [1, 0],
    filter: ["blur(0px)", "blur(90px)"],
    transition: {
      duration: 1,
      type: "linear",
    },
  },
  done: {
    opacity: [0, 0, 0, 1],
    filter: ["blur(90px)", "blur(60px)", "blur(30px)", "blur(0px)"],
    transition: {
      duration: 1,
      type: "linear",
    },
  },
};

export default function MainPage() {
  const setIsWrtie = useSetRecoilState(writeAtom);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [startAnimation, setStartAnimation] = useState(true);
  const mainTextAni = useAnimation();
  const mainBoxAni = useAnimation();
  const backgroundAni = useAnimation();

  const setBgAndQuote = () => {
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
  };

  const onResetButtonClicked = async () => {
    backgroundAni.start("clicked");
    await setBgAndQuote();
    await backgroundAni.start("done");
  };

  useEffect(() => {
    setBgAndQuote();
    setIsWrtie(true);
  }, []);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
  }, [colorTheme]);

  useEffect(() => {
    if (startAnimation === true) {
      mainTextAni.start("start");
      mainBoxAni.start("start");
      setStartAnimation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation]);

  return (
    <>
      <Box
        w="100vw"
        h={"100vh"}
        position={"absolute"}
        zIndex={-1}
        // backgroundRepeat="no-repeat"
        // backgroundAttachment={"fixed"}
        // backgroundSize="cover"
        // backgroundPosition={"center center"}
        // backgroundImage={`/assets/imgs/main/${backgroundImage}`}
        // as={motion.div}
        // variants={backgroundVariants}
        // animate={backgroundAni}
        // initial={"normal"}
        bgColor={"gray.600"}
      />
      <Box
        w="100vw"
        h={"100vh"}
        position={"absolute"}
        zIndex={1}
        // background={
        //   "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
        // }
        backgroundSize="10px 10px"
        opacity={0.3}
      />
      <Center w={"100vw"} h={"100vh"} position={"relative"}>
        <Flex
          justify={"center"}
          align={"center"}
          direction={"column"}
          position={"relative"}
          zIndex={2}
        >
          <HStack userSelect={"none"} color={"white"}>
            <Box
              fontSize={"170px"}
              color={lightColor}
              onClick={onResetButtonClicked}
              pos={"relative"}
              top={2}
            >
              <AiOutlineLeft />
            </Box>
            <TestText text="O" mainTextAni={mainTextAni} />
            <TestText text="U" mainTextAni={mainTextAni} />
            <TestText text="9" mainTextAni={mainTextAni} />
            <TestText text="9" mainTextAni={mainTextAni} />
            <TestText text="9" mainTextAni={mainTextAni} />
            <TestText text="9" mainTextAni={mainTextAni} />
            <HStack
              fontSize={"170px"}
              spacing={-10}
              color={lightColor}
              onClick={onResetButtonClicked}
              pos={"relative"}
              top={2}
            >
              <RxSlash />
              <AiOutlineRight />
            </HStack>
          </HStack>
        </Flex>
      </Center>
    </>
  );
}
