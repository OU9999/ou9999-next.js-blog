import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaRegCommentDots } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import {
  dateFormatter,
  returnDescription,
  returnUrlTitle,
  selectBasicThumbnail,
} from "@/utils/utilFn";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";

export default function LoadingCardMobile() {
  const mdBgColor = useColorModeValue(
    "rgba(255,255,255,1)",
    "rgba(45,55,72,1)"
  );

  return (
    <>
      <Box>
        <Card minW="80vw" minH={"sm"} boxShadow={"2xl"}>
          <CardBody>
            <Box overflow={"hidden"} borderRadius="lg">
              <Skeleton width={"full"} h={"48"} />
            </Box>
            <Stack mt="6" spacing="3">
              <SkeletonText h="12" />
              <SkeletonText width={"auto"} minH="24" maxH="24" />
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter></CardFooter>
        </Card>
      </Box>
    </>
  );
}
