import { writeAtom } from "@/utils/atoms";
import { vhToPixels } from "@/utils/utilFn";
import {
  Avatar,
  Box,
  HStack,
  Text,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { motion, useScroll, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { SiFirebase, SiNextdotjs, SiReact, SiTypescript } from "react-icons/si";
import { useRecoilValue } from "recoil";

const hugmeVariants: Variants = {
  hello: (ani: boolean) => {
    const px = vhToPixels(100);
    return {
      y: ani ? 0 : -px!,
      transition: {
        type: "spring",
      },
    };
  },
};

export default function Footer() {
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  const { scrollY } = useScroll();
  const isWrite = useRecoilValue(writeAtom);
  const [invisible, setInvisible] = useState(false);
  const [hugmeAni, setHugmeAni] = useState(false);
  const bgColor = useColorModeValue("#fff", "#1A202C");

  const onHugMeClicked = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() >= 100) {
        setHugmeAni(true);
      } else {
        setHugmeAni(false);
      }
    });
  }, [scrollY]);

  useEffect(() => {
    if (isWrite) setInvisible(true);
    else setInvisible(false);
  }, [isWrite]);

  return (
    <>
      <VStack
        display={invisible ? "none" : "flex"}
        position={"relative"}
        width={"100vw"}
        zIndex={3}
        pt={24}
        pb={10}
        bgColor={bgColor}
      >
        <HStack fontSize={"md"} fontWeight={"semibold"}>
          <Text color={"gray"}>STACK :</Text>
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
        </HStack>
        <HStack>
          <FaGithub />
          <Box
            color={"gray"}
            _hover={{
              borderBottom: "1px solid",
            }}
          >
            <Link href="https://github.com/OU9999">github.com/OU9999</Link>
          </Box>
        </HStack>
      </VStack>
      <Avatar
        src={`/assets/imgs/icon/hug_me.png`}
        display={invisible ? "none" : "block"}
        size={mobileView ? "md" : "xl"}
        position={"fixed"}
        zIndex={99}
        bottom={3}
        right={3}
        cursor="pointer"
        onClick={onHugMeClicked}
        as={motion.div}
        variants={hugmeVariants}
        animate={"hello"}
        initial={{
          y: -vhToPixels(100)!,
        }}
        custom={hugmeAni}
      />
    </>
  );
}
