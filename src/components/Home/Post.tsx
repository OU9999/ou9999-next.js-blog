import {
  Box,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaEye, FaRegCommentDots } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { BiTimeFive } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import {
  dateFormatterMobile,
  returnColors,
  returnUrlTitle,
  selectBasicThumbnail,
} from "@/utils/utilFn";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";
import Image from "next/image";

interface IPostProps {
  reverse: boolean;
  title: string;
  category: string;
  createdAt: number;
  thumbnailUrl: string;
  link: string;
  description: string;
}

export default function Post({
  reverse,
  title,
  category,
  createdAt,
  thumbnailUrl,
  link,
  description,
}: IPostProps) {
  const [hover, setHover] = useState(false);
  const mdBgColor = useColorModeValue(
    "rgba(255,255,255,1)",
    "rgba(45,55,72,1)"
  );
  const colorMode = useColorModeValue("light", "dark");
  const date = dateFormatterMobile(createdAt);
  const urlTitle = returnUrlTitle(title);
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const relativeColor = useColorModeValue(lightColor, darkColor);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
    setDarkColor(dc);
  }, [colorTheme]);

  return (
    <>
      <Box
        position={"relative"}
        rounded="2xl"
        w={{
          md: "3xl",
          lg: "4xl",
          xl: "5xl",
        }}
        h="xs"
        overflow={"hidden"}
        boxShadow={hover ? `0 0 10px 5px ${relativeColor}` : "dark-lg"}
        bgColor={mdBgColor}
        transition={"0.5s"}
        transform="auto"
        as={motion.div}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
      >
        <HStack
          width={"100%"}
          height={"100%"}
          overflow={"hidden"}
          flexDir={reverse ? "row-reverse" : "row"}
          gap={0}
          spacing={0}
        >
          <VStack
            width={"50%"}
            height={"100%"}
            alignItems={"flex-start"}
            p={10}
            gap={2}
          >
            <Link href={`/entry/${urlTitle}/${link}`}>
              <Heading
                noOfLines={2}
                cursor="pointer"
                fontSize={{
                  md: "xl",
                  lg: "xl",
                  xl: "2xl",
                }}
                color={hover ? relativeColor : undefined}
                transition={"0.3s"}
              >
                {title}
              </Heading>
            </Link>
            <HStack
              gap={1}
              fontSize={{
                md: "sm",
                lg: "sm",
                xl: "md",
              }}
            >
              <FaEye />
              <FaRegCommentDots />
              <HStack
                spacing={-0.2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <GoThreeBars />
                <Text pos={"relative"} top={"-1px"}>
                  {category}
                </Text>
              </HStack>
              <HStack
                spacing={1}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <BiTimeFive />
                <Text pos={"relative"} top={"-1px"}>
                  {date}
                </Text>
              </HStack>
            </HStack>
            <Box position={"relative"} overflow="hidden">
              <Box
                w={{
                  md: "xs",
                  lg: "sm",
                  xl: "md",
                }}
                h={"24"}
                noOfLines={5}
                data-color-mode={colorMode}
                zIndex={1}
                overflow="hidden"
                wordBreak={"break-all"}
              >
                <Text>{description}</Text>
              </Box>
              <Box
                position={"absolute"}
                w="full"
                h="full"
                background={`linear-gradient(to top, ${mdBgColor} 0%,rgba(255,255,255,0) 100%)`}
                top={0}
              />
            </Box>
          </VStack>

          <VStack
            width={"50%"}
            height={"100%"}
            overflow={"hidden"}
            cursor={"pointer"}
            zIndex={5}
            justifyContent="center"
            alignItems={"center"}
            pos={"relative"}
          >
            <Link
              href={`/entry/${urlTitle}/${link}`}
              style={{ width: "100%", height: "100%" }}
            >
              <Box
                transform={"auto"}
                scale={hover ? 1.05 : 1}
                transition={"0.5s"}
                w="full"
                h="full"
              >
                <Image
                  src={selectBasicThumbnail(category)}
                  fill={true}
                  alt="thumbnail"
                  style={{
                    objectFit: "cover",
                  }}
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
                />
              </Box>
            </Link>
          </VStack>
        </HStack>
        <HStack
          position={"absolute"}
          bottom={5}
          left={reverse ? "none" : 5}
          right={reverse ? 5 : "none"}
          fontSize={"3xl"}
        >
          <Text
            cursor={"pointer"}
            transition={"0.5s"}
            _hover={{
              color: relativeColor,
            }}
          >
            <BsThreeDots />
          </Text>
        </HStack>
      </Box>
    </>
  );
}
