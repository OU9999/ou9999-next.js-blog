import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Variants } from "framer-motion";
import { IBoxProps } from "./OtherPostMobile";
import { returnUrlTitle } from "@/utils/utilFn";
import Link from "next/link";

export default function RightBoxMobile({
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
          <VStack w="full" alignItems={"flex-end"} spacing={0}>
            <Text fontSize={"xs"}>다음 포스트</Text>
            <Text fontSize={"md"} fontWeight={"bold"} noOfLines={1}>
              {title}
            </Text>
          </VStack>
          <Box fontSize={"4xl"} color={relativeColor}>
            <BsArrowRightCircle />
          </Box>
        </HStack>
      </Link>
    </>
  );
}
