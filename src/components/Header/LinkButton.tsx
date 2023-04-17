import { Box, DarkMode, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface ILinkButtonProps {
  text: string;
  link: string;
  lightColor: string;
  textColor: boolean;
}

export default function LinkButton({
  text,
  link,
  lightColor,
  textColor,
}: ILinkButtonProps) {
  const [underBar, setUnderBar] = useState(false);
  return (
    <>
      <Link href={`/${link}`}>
        <Box
          zIndex={99}
          transition={"0.3s"}
          rounded={"md"}
          position="relative"
          fontWeight={"bold"}
          cursor={"pointer"}
          px={4}
          py={2}
          as={motion.div}
          onHoverStart={() => setUnderBar(true)}
          onHoverEnd={() => setUnderBar(false)}
        >
          <DarkMode>
            <Text
              transition={"0.3s"}
              textColor={!textColor ? "white" : underBar ? lightColor : "black"}
              textShadow={`${
                textColor ? (underBar ? lightColor : "white") : "#000"
              } 1px 0 10px`}
            >
              {text}
            </Text>
          </DarkMode>
          <Box
            w={"full"}
            h="10%"
            bgColor={lightColor}
            position="absolute"
            left={0}
            bottom={-2}
            transition="0.3s"
            transform="auto"
            scaleX={underBar ? 1 : 0}
            transformOrigin="left"
          />
        </Box>
      </Link>
    </>
  );
}
