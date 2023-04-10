import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
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
import { GoThreeBars } from "react-icons/go";

interface INoteCardProps {
  title: string;
  md: string;
  category: string;
  createdAt: number;
  thumbnailUrl: string;
  link: string;
}

export default function PostMobile({
  title,
  md,
  category,
  createdAt,
  thumbnailUrl,
  link,
}: INoteCardProps) {
  const [hover, setHover] = useState(false);
  const colorMode = useColorModeValue("light", "dark");
  const mdBgColor = useColorModeValue(
    "rgba(255,255,255,1)",
    "rgba(45,55,72,1)"
  );
  const date = dateFormatter(createdAt);
  const urlTitle = returnUrlTitle(title);
  const desc = returnDescription(md);
  const colorTheme = useRecoilValue(colorThemeAtom);

  return (
    <>
      <Flex
        w="full"
        h="44"
        pos={"relative"}
        rounded={"lg"}
        overflow={"hidden"}
        boxShadow={"dark-lg"}
      >
        <Image
          alt="thumbNail"
          src={
            thumbnailUrl === "" ? selectBasicThumbnail(category) : thumbnailUrl
          }
          w="full"
          h="full"
          zIndex={-1}
          pos="absolute"
        />

        <Flex justifyContent={"flex-end"} w="full" h="full" flexDir={"column"}>
          <Box pb={3} pl={3} color={"white"}>
            <Heading
              textShadow={"#000 1px 0 10px"}
              fontSize={"xl"}
              noOfLines={1}
            >
              {title}
            </Heading>
            <HStack gap={2}>
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
              >
                <Box fontSize={"sm"}>
                  <GoThreeBars />
                </Box>
                <Text
                  textShadow={"#000 1px 0 10px"}
                  fontSize={"sm"}
                  fontWeight={"bold"}
                >
                  React
                </Text>
              </HStack>
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
              >
                <Box fontSize={"sm"}>
                  <BiTimeFive />
                </Box>
                <Text
                  textShadow={"#000 1px 0 10px"}
                  fontSize={"sm"}
                  fontWeight={"bold"}
                >
                  {date}
                </Text>
              </HStack>
            </HStack>
          </Box>

          <Box
            position={"absolute"}
            w="full"
            h="full"
            background={`linear-gradient(to top, rgba(0,0,0,1) 0% ,rgba(255,255,255,0) 50%)`}
            top={0}
            zIndex={-1}
          />
        </Flex>
      </Flex>
    </>
  );
}
