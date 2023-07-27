import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { BiTimeFive } from "react-icons/bi";
import {
  dateFormatterMobile,
  returnUrlTitle,
  selectBasicThumbnail,
} from "@/utils/utilFn";
import Link from "next/link";
import { GoThreeBars } from "react-icons/go";
import Image from "next/image";

interface INoteCardProps {
  title: string;
  category: string;
  createdAt: number;
  thumbnailUrl: string;
  link: string;
}

export default function PostMobile({
  title,
  category,
  createdAt,
  thumbnailUrl,
  link,
}: INoteCardProps) {
  const date = dateFormatterMobile(createdAt);
  const urlTitle = returnUrlTitle(title);

  return (
    <>
      <Link href={`/entry/${urlTitle}/${link}`}>
        <Flex
          w="full"
          h="44"
          pos={"relative"}
          rounded={"lg"}
          overflow={"hidden"}
          boxShadow={"dark-lg"}
        >
          <Box w="full" h="44" zIndex={-1} pos={"absolute"}>
            <Image
              src={selectBasicThumbnail(category)}
              quality={75}
              fill={true}
              alt="thumbnail"
              style={{
                objectFit: "cover",
              }}
              priority
              // placeholder="blur"
              // blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
            />
          </Box>

          <Flex
            justifyContent={"flex-end"}
            w="full"
            h="full"
            flexDir={"column"}
          >
            <Box pb={3} px={3} color={"white"}>
              <Heading fontSize={"md"} noOfLines={1}>
                {title}
              </Heading>
              <HStack gap={2}>
                <HStack
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={0}
                >
                  <Box fontSize={"xs"} pos={"relative"} top={0.4}>
                    <GoThreeBars />
                  </Box>
                  <Text
                    textShadow={"#000 1px 0 10px"}
                    fontSize={"2xs"}
                    fontWeight={"bold"}
                    noOfLines={1}
                  >
                    {category}
                  </Text>
                </HStack>
                <HStack
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <Box fontSize={"xs"}>
                    <BiTimeFive />
                  </Box>
                  <Text
                    textShadow={"#000 1px 0 10px"}
                    fontSize={"xs"}
                    fontWeight={"bold"}
                    noOfLines={1}
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
      </Link>
    </>
  );
}
