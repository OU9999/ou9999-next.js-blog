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
  useToast,
} from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RxSlash } from "react-icons/rx";
import { GoThreeBars } from "react-icons/go";
import {
  FaGithub,
  FaHome,
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
import { MdEmail, MdLibraryBooks } from "react-icons/md";
import { useRouter } from "next/router";
import HeaderButton from "./Header/HeaderButton";
import { BsPersonFill } from "react-icons/bs";
import ModeSwitch from "./Header/ModeSwitch";

export default function HeaderMobile() {
  const { scrollYProgress } = useScroll();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const relativeColor = useColorModeValue(lightColor, darkColor);
  const Icon = useColorModeValue(FaSun, FaMoon);
  const { toggleColorMode } = useColorMode();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
    setDarkColor(dc);
    setBgColor(hbc);
  }, [colorTheme]);

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

  return (
    <>
      <Button
        aria-label="option"
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
                src={`/assets/imgs/icon/profile.jpeg`}
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
                    fontSize={"xl"}
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
                    fontSize={"xl"}
                    variant="ghost"
                    px={"3"}
                    py={"8"}
                    colorScheme={"green"}
                    onClick={onEmailButtonClicked}
                  >
                    <MdEmail />
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
                  <VStack>
                    <Box pos="relative" left={-1}>
                      <Icon />
                    </Box>
                    <ModeSwitch />
                  </VStack>
                  <Box
                    w="10"
                    h="10"
                    pos="relative"
                    rounded={"md"}
                    borderBottom={"20px solid #7F5AD5"}
                    borderTop={"20px solid #C7A8F7"}
                    borderLeft={"20px solid #7F5AD5"}
                    borderRight={"20px solid #C7A8F7"}
                    onClick={() => setColorTheme("purple")}
                  />
                  <Box
                    w="10"
                    h="10"
                    pos="relative"
                    rounded={"md"}
                    borderBottom={"20px solid #81E6D9"}
                    borderTop={"20px solid #81E6D9"}
                    borderLeft={"20px solid #319795"}
                    borderRight={"20px solid #319795"}
                    onClick={() => setColorTheme("teal")}
                  />
                  <Box
                    w="10"
                    h="10"
                    pos="relative"
                    rounded={"md"}
                    borderBottom={"20px solid #00B5D8"}
                    borderTop={"20px solid #00B5D8"}
                    borderLeft={"20px solid #00B5D8"}
                    borderRight={"20px solid #9DECF9"}
                    onClick={() => setColorTheme("cyan")}
                  />
                </HStack>
              </VStack>
              <Divider />

              <VStack
                py={3}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
                w="full"
              >
                <HeaderButton
                  bgColor={relativeColor}
                  leftIcon={<FaHome />}
                  onClose={onClose}
                  text="Home"
                  link="/"
                />
                <HeaderButton
                  bgColor={relativeColor}
                  leftIcon={<MdLibraryBooks />}
                  onClose={onClose}
                  text="Notes"
                  link="/notes/ALL"
                  notes
                />
                <HeaderButton
                  bgColor={relativeColor}
                  leftIcon={<BsPersonFill />}
                  onClose={onClose}
                  text="Guest Book"
                  link="/guestbook"
                />
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
