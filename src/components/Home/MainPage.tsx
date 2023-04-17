import { images, quotes } from "@/constants/mainpageArray";
import { colorThemeAtom } from "@/utils/atoms";
import { returnColors, vhToPixels } from "@/utils/utilFn";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { motion, useAnimation, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaGithub,
  FaInstagram,
  FaQuoteLeft,
  FaQuoteRight,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail, MdReplay } from "react-icons/md";
import MainPageText from "./MainPageText";
import { useRecoilValue } from "recoil";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RxSlash } from "react-icons/rx";

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

const mainBoxVariants: Variants = {
  normal: { y: -100, opacity: 0 },
  start: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 200, delay: 0.3 },
  },
};

const quoteVariants: Variants = {
  normal: { y: 0 },
  clicked: {
    y: [-50, 0],
    opacity: [0, 1],
    transition: {
      duration: 1,
    },
  },
};

const resetButtonVariants: Variants = {
  hovering: () => {
    return {
      rotateZ: 0,
      scale: [1, 1.3, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        type: "tween",
      },
    };
  },
};

export default function MainPage() {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [startAnimation, setStartAnimation] = useState(true);
  const mainTextAni = useAnimation();
  const mainBoxAni = useAnimation();
  const quoteAni = useAnimation();
  const resetButtonAni = useAnimation();
  const backgroundAni = useAnimation();
  const toast = useToast();
  const [time, setTime] = useState(0);

  const setBgAndQuote = () => {
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
    setQuote(`${quotes[Math.floor(Math.random() * quotes.length)]}`);
  };

  const onResetButtonClicked = async () => {
    setTime(0);
    quoteAni.start("clicked");
    backgroundAni.start("clicked");
    await setBgAndQuote();
    await backgroundAni.start("done");
  };

  const onEmailButtonClicked = () => {
    toast({
      title: `복사 완료!`,
      position: "top",
      isClosable: true,
      icon: (
        <Box fontSize={"2xl"}>
          <MdEmail />
        </Box>
      ),
    });
    navigator.clipboard.writeText("omh232323@gmail.com");
  };

  const onScrollDownClicked = () => {
    window.scrollTo({ top: vhToPixels(100), behavior: "smooth" });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time >= 30) {
        onResetButtonClicked();
      } else {
        setTime((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    setBgAndQuote();
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

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = `/assets/imgs/main/${backgroundImage}`;
  }, [backgroundImage]);

  return (
    <>
      <Box
        w="100vw"
        h={"100vh"}
        position={"absolute"}
        zIndex={-1}
        backgroundRepeat="no-repeat"
        backgroundAttachment={"fixed"}
        backgroundSize="cover"
        backgroundPosition={"center center"}
        opacity={imageLoaded ? 1 : 0}
        backgroundImage={`/assets/imgs/main/${backgroundImage}`}
        as={motion.div}
        variants={backgroundVariants}
        animate={backgroundAni}
        initial={"normal"}
      />
      <Box
        w="100vw"
        h={"100vh"}
        position={"absolute"}
        zIndex={1}
        top={-2}
        background={
          "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
        }
        backgroundSize="10px 10px"
        opacity={0.3}
      />
      <Center w={"100vw"} h={"100vh"} position={"relative"}>
        <Box pos={"absolute"} bottom={10} right={10} w="16" zIndex={10}>
          <CircularProgressbar
            value={(time / 30) * 100}
            strokeWidth={50}
            styles={buildStyles({
              pathTransitionDuration: 1,
              strokeLinecap: "butt",
              pathColor: lightColor,
            })}
          />
        </Box>
        <Flex
          justify={"center"}
          align={"center"}
          direction={"column"}
          position={"relative"}
          zIndex={2}
        >
          <HStack userSelect={"none"} color={"white"}>
            <Box fontSize={"9xl"} color={lightColor} pos={"relative"} top={2}>
              <AiOutlineLeft />
            </Box>
            <MainPageText text="O" mainTextAni={mainTextAni} />
            <MainPageText text="U" mainTextAni={mainTextAni} />
            <MainPageText text="9" mainTextAni={mainTextAni} />
            <MainPageText text="9" mainTextAni={mainTextAni} />
            <MainPageText text="9" mainTextAni={mainTextAni} />
            <MainPageText text="9" mainTextAni={mainTextAni} />
            <HStack
              fontSize={"9xl"}
              spacing={-10}
              color={lightColor}
              pos={"relative"}
              top={2}
            >
              <RxSlash />
              <AiOutlineRight />
            </HStack>
          </HStack>

          <Flex
            as={motion.div}
            variants={mainBoxVariants}
            initial={"normal"}
            animate={mainBoxAni}
            backgroundColor={"red"}
            width="5xl"
            height="xs"
            background={"rgba(0,0,0,0.5)"}
            borderRadius={"3rem"}
            fontSize={"4xl"}
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
            color={"white"}
            padding={"10"}
            gap={20}
            position="relative"
            overflow={"hidden"}
          >
            <HStack
              fontSize={"2xl"}
              gap={1}
              as={motion.div}
              variants={quoteVariants}
              initial={"normal"}
              animate={quoteAni}
              minH={"50%"}
            >
              <FaQuoteLeft />
              <Text fontWeight={"bold"}>{quote}</Text>
              <FaQuoteRight />
            </HStack>
            <Flex gap={10}>
              <Button
                fontSize={"4xl"}
                variant="ghost"
                px={"3"}
                py={"8"}
                colorScheme={"gray"}
              >
                <Link href="https://github.com/OU9999" target="_blank">
                  <FaGithub />
                </Link>
              </Button>
              <Button
                fontSize={"4xl"}
                variant="ghost"
                px={"3"}
                py={"8"}
                colorScheme={"twitter"}
                onClick={() =>
                  toast({
                    title: `사실 트위터 안함 ㅋ`,
                    position: "top",
                    isClosable: true,
                    icon: (
                      <Box fontSize={"2xl"}>
                        <FaTwitter />
                      </Box>
                    ),
                  })
                }
              >
                <FaTwitter />
              </Button>
              <Button
                fontSize={"4xl"}
                variant="ghost"
                px={"3"}
                py={"8"}
                colorScheme={"pink"}
                onClick={() =>
                  toast({
                    title: `사실 인스타 안함 ㅋ`,
                    position: "top",
                    isClosable: true,
                    icon: (
                      <Box fontSize={"2xl"}>
                        <FaInstagram />
                      </Box>
                    ),
                  })
                }
              >
                <FaInstagram />
              </Button>
              <Button
                fontSize={"4xl"}
                variant="ghost"
                px={"3"}
                py={"8"}
                colorScheme={"green"}
                onClick={onEmailButtonClicked}
              >
                <MdEmail />
              </Button>
            </Flex>
            <Box
              as={motion.div}
              position={"absolute"}
              color="#fff"
              bottom={"10"}
              right={"10"}
              variants={resetButtonVariants}
              cursor={"pointer"}
              onClick={onResetButtonClicked}
              animate={resetButtonAni}
              initial={{
                rotateZ: 360,
              }}
              whileHover={"hovering"}
            >
              <MdReplay />
            </Box>
          </Flex>
        </Flex>
        <Box
          position={"absolute"}
          bottom={10}
          fontSize={"5xl"}
          as={motion.div}
          animate={{
            y: [20, -20, 0],
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          color="white"
          zIndex={99}
          cursor="pointer"
          transition={"0.5s"}
          _hover={{
            color: "#1A94DA",
          }}
          onClick={onScrollDownClicked}
        >
          <FaArrowDown />
        </Box>
      </Center>
    </>
  );
}
