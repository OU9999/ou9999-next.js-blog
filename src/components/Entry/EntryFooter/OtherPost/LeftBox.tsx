import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { IBoxProps } from "./OtherPost";
import Link from "next/link";
import { returnUrlTitle } from "@/utils/utilFn";

const arrowVar: Variants = {
  hover: {
    x: [0, -10, 0],
    transition: {
      duration: 0.5,
    },
  },
};

export default function LeftBox({
  relativeColor,
  bgColor,
  title,
  id,
}: IBoxProps) {
  const [hover, setHover] = useState(false);
  const arrowAni = useAnimation();
  const urlTitle = returnUrlTitle(title);

  useEffect(() => {
    if (hover) arrowAni.start("hover");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover]);

  return (
    <>
      <Link href={`/entry/${urlTitle}/${id}`}>
        <HStack
          w="full"
          h={20}
          bgColor={bgColor}
          rounded={"md"}
          p={5}
          gap={5}
          cursor={"pointer"}
          as={motion.div}
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
        >
          <Box
            fontSize={"5xl"}
            color={relativeColor}
            as={motion.div}
            variants={arrowVar}
            initial={{ x: 0 }}
            animate={arrowAni}
          >
            <BsArrowLeftCircle />
          </Box>
          <VStack w="full" alignItems={"flex-start"}>
            <Text fontSize={"sm"}>이전 포스트</Text>
            <Text fontSize={"lg"} fontWeight={"bold"} noOfLines={1}>
              {title}
            </Text>
          </VStack>
        </HStack>
      </Link>
    </>
  );
}
