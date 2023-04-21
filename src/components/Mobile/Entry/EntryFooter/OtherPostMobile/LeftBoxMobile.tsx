import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { Variants } from "framer-motion";
import { IBoxProps } from "./OtherPostMobile";
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

export default function LeftBoxMobile({
  relativeColor,
  bgColor,
  title,
  id,
}: IBoxProps) {
  const urlTitle = returnUrlTitle(title);

  return (
    <>
      <Link href={`/entry/${urlTitle}/${id}`}>
        <HStack w="full" h={16} bgColor={bgColor} rounded={"md"} p={5} gap={3}>
          <Box fontSize={"4xl"} color={relativeColor}>
            <BsArrowLeftCircle />
          </Box>
          <VStack w="full" alignItems={"flex-start"} spacing={0}>
            <Text fontSize={"xs"}>이전 포스트</Text>
            <Text fontSize={"md"} fontWeight={"bold"} noOfLines={1}>
              {title}
            </Text>
          </VStack>
        </HStack>
      </Link>
    </>
  );
}
