import { colorThemeAtom } from "@/utils/atoms";
import {
  dateFormatterMobile,
  returnColors,
  returnUrlTitle,
  selectBasicThumbnail,
} from "@/utils/utilFn";
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { useRecoilValue } from "recoil";

interface IAnotherCardProps {
  title: string;
  createdAt: number;
  thumbnailUrl: string;
  link: string;
  category: string;
}

export default function AnotherCard({
  title,
  createdAt,
  thumbnailUrl,
  link,
  category,
}: IAnotherCardProps) {
  const [hover, setHover] = useState(false);
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const relativeColor = useColorModeValue(lightColor, darkColor);
  const mdBgColor = useColorModeValue(
    "rgba(255,255,255,1)",
    "rgba(45,55,72,1)"
  );
  const date = dateFormatterMobile(createdAt);
  const urlTitle = returnUrlTitle(title);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
    setDarkColor(dc);
  }, [colorTheme]);
  return (
    <>
      <Link href={`/entry/${urlTitle}/${link}`}>
        <Box
          as={motion.div}
          initial={{ y: 0 }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
        >
          <VStack
            pos="relative"
            w="72"
            h="xs"
            bgColor={mdBgColor}
            overflow={"hidden"}
            rounded={"2xl"}
            transition={"0.5s"}
            boxShadow={hover ? `0 0 10px 5px ${relativeColor}` : "dark-lg"}
          >
            <Box pos={"relative"} w="full" h="50%">
              <Image
                src={selectBasicThumbnail(category)}
                quality={30}
                fill={true}
                alt="thumbnail"
                style={{
                  objectFit: "cover",
                }}
                placeholder="blur"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
              />
            </Box>
            <VStack w="full" h="50%" p={5}>
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
              <Heading fontSize={"lg"} noOfLines={2}>
                {title}
              </Heading>
            </VStack>
          </VStack>
        </Box>
      </Link>
    </>
  );
}
