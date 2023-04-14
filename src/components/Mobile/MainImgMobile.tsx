import {
  Box,
  Center,
  Flex,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { images } from "@/constants/mainpageArray";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RxSlash } from "react-icons/rx";
import { useRecoilValue } from "recoil";
import { colorThemeAtom, isEntryAtom } from "@/utils/atoms";
import { returnColors } from "@/utils/utilFn";
import { Variants, motion, useAnimation } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useRouter } from "next/router";
import Image from "next/image";

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

export default function MainImgMobile() {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const relativeColor = useColorModeValue(lightColor, darkColor);
  const backgroundAni = useAnimation();
  const router = useRouter();
  const isEntry = useRecoilValue(isEntryAtom);

  const setBg = () => {
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
  };

  const onResetButtonClicked = async () => {
    setTime(0);
    backgroundAni.start("clicked");
    await setBg();
    await backgroundAni.start("done");
  };

  useEffect(() => {
    setBg();
  }, []);

  useEffect(() => {
    console.log(router.pathname);
  }, [router]);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
    setDarkColor(dc);
  }, [colorTheme]);

  const [time, setTime] = useState(0);

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

  return (
    <>
      <VStack
        w="100vw"
        h="auto"
        overflow={"hidden"}
        display={isEntry ? "none" : undefined}
      >
        <Box
          w="100vw"
          h={"30vh"}
          position={"absolute"}
          zIndex={-1}
          as={motion.div}
          variants={backgroundVariants}
          animate={backgroundAni}
          initial={"normal"}
        >
          <Image
            src={`/assets/imgs/main/${backgroundImage}`}
            fill={true}
            alt="background"
            style={{
              objectFit: "cover",
            }}
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
          />
        </Box>

        <Box
          w="100vw"
          h={"30vh"}
          position={"absolute"}
          zIndex={1}
          top={-2}
          background={
            "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
          }
          backgroundSize="10px 10px"
          opacity={0.3}
        />
        <Center w="full" h={"30vh"} zIndex={2} pos={"relative"}>
          <Box pos={"absolute"} w="9" bottom={5} right={5} zIndex={10}>
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
          <Box fontSize={"5xl"} color={lightColor} pos={"relative"} top={1}>
            <AiOutlineLeft />
          </Box>
          <Text
            fontSize={"5xl"}
            fontWeight={"extrabold"}
            color={"white"}
            textShadow={`${lightColor} 1px 0 30px`}
          >
            OU9999
          </Text>
          <HStack
            fontSize={"5xl"}
            spacing={-3}
            color={lightColor}
            pos={"relative"}
            top={1}
          >
            <RxSlash />
            <AiOutlineRight />
          </HStack>
        </Center>
        <HStack w="full" h="12" justifyContent={"center"} alignItems={"center"}>
          <Flex
            w="33%"
            justifyContent={"center"}
            alignItems={"center"}
            h="full"
            pos={"relative"}
            onClick={() => router.push("/")}
          >
            <Text fontWeight={router.pathname === "/" ? "bold" : undefined}>
              Home
            </Text>

            {router.pathname === "/" ? (
              <Box
                w="full"
                h="1"
                bgColor={relativeColor}
                pos={"absolute"}
                bottom={0}
                as={motion.div}
                layoutId="underBar"
              />
            ) : null}
          </Flex>
          <Flex
            w="33%"
            justifyContent={"center"}
            alignItems={"center"}
            h="full"
            pos={"relative"}
            onClick={() => router.push("/notes/ALL")}
          >
            <Text
              fontWeight={
                router.pathname === "/notes/[category]" ? "bold" : undefined
              }
            >
              Notes{" "}
            </Text>

            {router.pathname === "/notes/[category]" ? (
              <Box
                w="full"
                h="1"
                bgColor={relativeColor}
                pos={"absolute"}
                bottom={0}
                as={motion.div}
                layoutId="underBar"
              />
            ) : null}
          </Flex>
          <Flex
            w="33%"
            justifyContent={"center"}
            alignItems={"center"}
            h="full"
            pos={"relative"}
            onClick={() => router.push("/guestbook")}
          >
            <Text
              fontWeight={router.pathname === "/guestbook" ? "bold" : undefined}
            >
              Guest Book
            </Text>

            {router.pathname === "/guestbook" ? (
              <Box
                w="full"
                h="1"
                bgColor={relativeColor}
                pos={"absolute"}
                bottom={0}
                as={motion.div}
                layoutId="underBar"
              />
            ) : null}
          </Flex>
        </HStack>
      </VStack>
    </>
  );
}
