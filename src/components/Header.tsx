import {
  Box,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaMoon, FaPalette, FaSun, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { RxSlash } from "react-icons/rx";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion, useAnimation, useScroll, Variants } from "framer-motion";
import Link from "next/link";
import LinkButton from "./Header/LinkButton";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginAtom, writeAtom } from "@/utils/atoms";
import LoginPopover from "./Header/LoginPopover";
import LoginModal from "./Header/LoginModal";
import { authService } from "@/firebase/firebase";
import { useColorTheme } from "@/hooks/useColorTheme";

const headerVariants: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: { backgroundColor: "rgba(223, 230, 233,0.8)" },
};

export default function Header() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const isWrite = useRecoilValue(writeAtom);
  const [invisible, setInvisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaMoon, FaSun);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const headerAni = useAnimation();
  const [underBar, setUnderBar] = useState(false);
  const [boxShadow, setBoxShadow] = useState(false);
  const [textColor, setTextColor] = useState(false);
  const { colorTheme, setColorTheme, lightColor, darkColor } = useColorTheme();

  const hoverEnd = () => {
    if (scrollY.get() < 80) {
      setBoxShadow(false);
    }
  };

  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() >= 80) {
        headerAni.start("scroll");
        setBoxShadow(true);
        setTextColor(true);
      } else {
        headerAni.start("top");
        setBoxShadow(false);
        setTextColor(false);
      }
    });
  }, [headerAni, scrollY]);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isWrite) setInvisible(true);
    else setInvisible(false);
  }, [isWrite]);

  return (
    <>
      <HStack
        display={invisible ? "none" : "flex"}
        justifyContent={"space-between"}
        minW={"100vw"}
        transition={"0.3s"}
        px={5}
        py={5}
        h={20}
        backgroundColor={"transparent"}
        position={"fixed"}
        zIndex={"98"}
        as={motion.div}
        spacing={2}
        variants={headerVariants}
        animate={headerAni}
        onHoverStart={() => setBoxShadow(true)}
        onHoverEnd={() => hoverEnd()}
        boxShadow={boxShadow ? "dark-lg" : "none"}
        boxSizing={"border-box"}
        transform="auto"
      >
        <HStack gap={2}>
          <HStack
            zIndex={99}
            justifyContent="center"
            alignItems="center"
            spacing={1}
            position="relative"
            cursor="pointer"
            as={motion.div}
            onHoverStart={() => setUnderBar(true)}
            onHoverEnd={() => setUnderBar(false)}
          >
            <Box
              fontSize={{
                md: "2xl",
                lg: "3xl",
                xl: "4xl",
              }}
              color={lightColor}
              pos={"relative"}
              top={1}
            >
              <AiOutlineLeft />
            </Box>
            <Link href={"/"}>
              <Heading
                fontSize={{
                  md: "2xl",
                  lg: "3xl",
                  xl: "4xl",
                }}
                zIndex={99}
                color="white"
                transform={"auto"}
                textShadow={`${underBar ? lightColor : "#000"} 1px 0 10px`}
                scale={underBar ? 1.05 : 1}
                transition="0.5s"
              >
                OU9999
              </Heading>
            </Link>
            <HStack
              fontSize={{
                md: "2xl",
                lg: "3xl",
                xl: "4xl",
              }}
              spacing={-3}
              color={lightColor}
              pos={"relative"}
              top={1}
            >
              <RxSlash />
              <AiOutlineRight />
            </HStack>
          </HStack>
          <HStack
            spacing={{
              md: 0,
              lg: 1,
              xl: 2,
            }}
          >
            <LinkButton
              text="Home"
              link="/"
              textColor={textColor}
              lightColor={lightColor}
            />
            <LinkButton
              text="Notes"
              link="/notes/ALL"
              textColor={textColor}
              lightColor={lightColor}
            />
            <LinkButton
              text="Guest Book"
              link="/guestbook"
              textColor={textColor}
              lightColor={lightColor}
            />
            <LinkButton
              text="Write"
              link="/write"
              textColor={textColor}
              lightColor={lightColor}
            />
          </HStack>
        </HStack>

        <HStack gap={2}>
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="colorThemeButton"
                fontSize="xl"
                icon={<FaPalette />}
                zIndex={99}
                colorScheme={colorTheme}
              />
              <MenuList>
                <MenuItem
                  zIndex={99}
                  justifyContent="center"
                  fontWeight="bold"
                  color={"purple.light"}
                  value={"purple"}
                  onClick={(e) => setColorTheme(e.currentTarget.value)}
                >
                  Purple
                </MenuItem>
                <MenuItem
                  zIndex={99}
                  fontWeight="bold"
                  justifyContent="center"
                  color={"teal.light"}
                  value={"teal"}
                  onClick={(e) => setColorTheme(e.currentTarget.value)}
                >
                  Teal
                </MenuItem>
                <MenuItem
                  zIndex={99}
                  fontWeight="bold"
                  justifyContent="center"
                  color={"cyan.light"}
                  value={"cyan"}
                  onClick={(e) => setColorTheme(e.currentTarget.value)}
                >
                  Cyan
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <IconButton
            zIndex={99}
            aria-label="toggleColorMode"
            onClick={toggleColorMode}
            variant={"solid"}
            colorScheme={colorTheme}
            fontSize="xl"
            icon={<Icon />}
          />
          {isLogin ? (
            <LoginPopover />
          ) : (
            <IconButton
              zIndex={99}
              onClick={onOpen}
              aria-label="usericon"
              colorScheme={colorTheme}
              fontSize="xl"
              icon={<FaUserCircle />}
            />
          )}
        </HStack>

        <Box
          bgColor={darkColor}
          opacity={0.3}
          zIndex={1}
          w="110vw"
          h={20}
          as={motion.div}
          style={{ scaleX: scrollYProgress }}
          transformOrigin="left"
          position="absolute"
          left={-3}
          top={0}
        ></Box>
      </HStack>

      {isLogin ? null : <LoginModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
