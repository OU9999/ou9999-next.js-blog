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
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaEye, FaRegCommentDots } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import {
  dateFormatter,
  returnColors,
  returnDescription,
  returnUrlTitle,
  selectBasicThumbnail,
} from "@/utils/utilFn";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";
import Image from "next/image";

interface INoteCardProps {
  title: string;
  md: string;
  category: string;
  createdAt: number;
  thumbnailUrl: string;
  link: string;
}

export default function NoteCard({
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
        as={motion.div}
        initial={{ y: 0 }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
      >
        <Card
          maxW="sm"
          minH={"sm"}
          boxShadow={hover ? `0 0 10px 5px ${relativeColor}` : "2xl"}
          transition={"0.5s"}
        >
          <CardBody>
            <Box overflow={"hidden"} borderRadius="lg" h="44" bgColor={"gray"}>
              <Link href={`/entry/${urlTitle}/${link}`}>
                <Box
                  transform={"auto"}
                  scale={hover ? 1.05 : 1}
                  transition={"0.5s"}
                >
                  <Image
                    src={selectBasicThumbnail(category)}
                    width={350}
                    height={180}
                    alt="thumbnail"
                    style={{
                      objectFit: "cover",
                    }}
                    placeholder="blur"
                    blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
                  />
                </Box>
              </Link>
            </Box>

            <Stack mt="6" spacing="3">
              <Link href={`/entry/${urlTitle}/${link}`}>
                <Flex h={"12"} alignItems={"center"}>
                  <Heading
                    size="md"
                    noOfLines={2}
                    transition={"0.3s"}
                    cursor="pointer"
                    color={hover ? relativeColor : undefined}
                  >
                    {title}
                  </Heading>
                </Flex>
              </Link>
              <Box position={"relative"}>
                <Box
                  width={"auto"}
                  minH="24"
                  maxH="24"
                  overflow={"hidden"}
                  data-color-mode={colorMode}
                >
                  {/* <NoStyle>
                    <MarkdownPreview
                      source={md}
                      style={{
                        backgroundColor: mdBgColor,
                      }}
                    />
                  </NoStyle> */}
                  <Text>{desc}</Text>
                </Box>
                <Box
                  position={"absolute"}
                  w="full"
                  h="full"
                  background={`linear-gradient(to top, ${mdBgColor} 0%,rgba(255,255,255,0) 100%)`}
                  top={0}
                ></Box>
              </Box>

              <Button
                colorScheme={colorTheme}
                fontSize="lg"
                width={"50%"}
                cursor="auto"
              >
                {category}
              </Button>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <HStack gap={1}>
              <FaEye />
              <FaRegCommentDots />
              <HStack
                spacing={1}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <BiTimeFive />
                <Text>{date}</Text>
              </HStack>
            </HStack>
          </CardFooter>
        </Card>
      </Box>
    </>
  );
}
