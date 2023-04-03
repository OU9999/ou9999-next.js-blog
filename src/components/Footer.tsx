import { isEntryAtom, tocAtom, writeAtom } from "@/utils/atoms";
import {
  Avatar,
  Box,
  HStack,
  Text,
  useColorModeValue,
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
    return {
      y: ani ? 0 : -1000,
      transition: {
        type: "spring",
      },
    };
  },
};

export default function Footer() {
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
        src={
          "https://firebasestorage.googleapis.com/v0/b/ou9999-first-blog.appspot.com/o/icons%2Fhug_me.png?alt=media&token=c44657ff-630e-4edb-a382-b78495387339"
        }
        display={invisible ? "none" : "block"}
        size={"xl"}
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
          y: -1000,
        }}
        custom={hugmeAni}
      />
      {/* {isEntry && (
        <Box position={"fixed"} right={0} top={150} zIndex={1}>
          <Toc md={tocMd} />
        </Box>
      )} */}
    </>
  );
}
