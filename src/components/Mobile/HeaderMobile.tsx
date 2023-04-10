import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RxSlash } from "react-icons/rx";
import { GoThreeBars } from "react-icons/go";
import {
  FaGithub,
  FaInstagram,
  FaMoon,
  FaSun,
  FaTwitter,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { returnColors } from "@/utils/utilFn";
import { useRecoilState } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { SiFirebase, SiNextdotjs, SiReact, SiTypescript } from "react-icons/si";
import { MdEmail } from "react-icons/md";

export default function HeaderMobile() {
  const { scrollYProgress } = useScroll();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const relativeColor = useColorModeValue(lightColor, darkColor);
  const Icon = useColorModeValue(FaMoon, FaSun);
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
    setDarkColor(dc);
    setBgColor(hbc);
  }, [colorTheme]);

  return (
    <>
      <Box
        bgColor={bgColor}
        opacity={0.3}
        zIndex={99}
        w="105vw"
        h="2"
        as={motion.div}
        style={{ scaleX: scrollYProgress }}
        transformOrigin="left"
        position="fixed"
        left={-3}
        top={0}
      ></Box>
      <Button
        colorScheme={colorTheme}
        onClick={onOpen}
        position={"fixed"}
        zIndex={99}
        top={2}
        left={2}
      >
        <GoThreeBars />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent overflow={"hidden"}>
          <DrawerCloseButton />
          <DrawerBody>
            <HStack w="full" justifyContent={"center"} spacing={0}>
              <Box
                fontSize={"3xl"}
                color={lightColor}
                pos={"relative"}
                top={0.5}
              >
                <AiOutlineLeft />
              </Box>
              <Text
                color={relativeColor}
                fontSize={"2xl"}
                fontWeight={"bold"}
                textShadow={`${lightColor} 1px 0 30px`}
              >
                OU9999
              </Text>
              <HStack
                fontSize={"3xl"}
                spacing={-3}
                color={lightColor}
                pos={"relative"}
                top={0.5}
              >
                <RxSlash />
                <AiOutlineRight />
              </HStack>
            </HStack>
            <VStack h={"full"}>
              <Avatar
                mt={10}
                size={"xl"}
                name="OU9999"
                src={
                  "https://firebasestorage.googleapis.com/v0/b/ou9999-first-blog.appspot.com/o/icons%2Fprofile.jpeg?alt=media&token=9f24e1a0-9580-4fbd-b086-344f45116885"
                }
              />
              <HStack w="full" justifyContent={"center"}>
                <Flex gap={1}>
                  <Button
                    fontSize={"xl"}
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
                    fontSize={"xl"}
                    variant="ghost"
                    px={"3"}
                    py={"8"}
                    colorScheme={"twitter"}
                  >
                    <FaTwitter />
                  </Button>
                  <Button
                    fontSize={"xl"}
                    variant="ghost"
                    px={"3"}
                    py={"8"}
                    colorScheme={"pink"}
                  >
                    <FaInstagram />
                  </Button>
                  <Button
                    fontSize={"xl"}
                    variant="ghost"
                    px={"3"}
                    py={"8"}
                    colorScheme={"green"}
                    // onClick={onEmailButtonClicked}
                  >
                    <MdEmail />
                  </Button>
                  <Button
                    fontSize={"xl"}
                    variant="ghost"
                    px={"3"}
                    py={"8"}
                    colorScheme={colorTheme}
                    onClick={toggleColorMode}
                  >
                    <Icon />
                  </Button>
                </Flex>
              </HStack>

              <Divider />

              <VStack py={3} justifyContent={"center"} alignItems={"center"}>
                <Text
                  colorScheme={colorTheme}
                  fontSize={"xl"}
                  mb={2}
                  fontWeight={"bold"}
                >
                  Color Theme
                </Text>
                <HStack>
                  <Button
                    colorScheme="purple"
                    onClick={() => setColorTheme("purple")}
                  >
                    Purple
                  </Button>
                  <Button
                    colorScheme="teal"
                    onClick={() => setColorTheme("teal")}
                  >
                    Teal
                  </Button>
                  <Button
                    colorScheme="cyan"
                    onClick={() => setColorTheme("cyan")}
                  >
                    Cyan
                  </Button>
                </HStack>
              </VStack>
              <Divider />

              <VStack
                py={3}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                <Link href={"/"} onClick={onClose}>
                  <Button>Home</Button>
                </Link>
                <Link href={"/notes/ALL"} onClick={onClose}>
                  <Button>Notes</Button>
                </Link>
                <Link href={"/guestbook"} onClick={onClose}>
                  <Button>Guest Book</Button>
                </Link>
              </VStack>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack fontSize={"md"} fontWeight={"semibold"}>
              <Box
                as={motion.div}
                initial={{
                  rotateZ: 360,
                }}
                animate={{
                  rotateZ: 0,
                  transition: {
                    duration: 9,
                    repeat: Infinity,
                    type: "linear",
                  },
                }}
              >
                <SiReact color="#61DAFB" />
              </Box>

              <SiTypescript color="#3178C6" />
              <SiFirebase color=" #FFCA28" />
              <SiNextdotjs />
              <FaGithub />
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
