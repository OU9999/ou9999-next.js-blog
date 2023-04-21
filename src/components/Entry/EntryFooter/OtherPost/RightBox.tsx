import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { IBoxProps } from "./OtherPost";
import { returnUrlTitle } from "@/utils/utilFn";
import Link from "next/link";

const arrowVar: Variants = {
  hover: {
    x: [0, 10, 0],
    transition: {
      duration: 0.5,
    },
  },
};

export default function RightBox({
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
          <VStack w="full" alignItems={"flex-end"}>
            <Text fontSize={"sm"}>다음 포스트</Text>
            <Text fontSize={"lg"} fontWeight={"bold"} noOfLines={1}>
              {title}
            </Text>
          </VStack>
          <Box
            fontSize={"5xl"}
            color={relativeColor}
            as={motion.div}
            variants={arrowVar}
            initial={{ x: 0 }}
            animate={arrowAni}
          >
            <BsArrowRightCircle />
          </Box>
        </HStack>
      </Link>
    </>
  );
}
