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
      <Box>
        <Card maxW="80vw" minH={"sm"} boxShadow={"2xl"}>
          <CardBody>
            <Box overflow={"hidden"} borderRadius="lg">
              <Link href={`/entry/${urlTitle}/${link}`}>
                <Image
                  width={"full"}
                  h={"48"}
                  src={
                    thumbnailUrl === ""
                      ? selectBasicThumbnail(category)
                      : thumbnailUrl
                  }
                  alt="thumbnail"
                  borderRadius="lg"
                  transition={"0.5s"}
                />
              </Link>
            </Box>
            <Stack mt="6" spacing="3">
              <Link href={`/entry/${urlTitle}/${link}`}>
                <Flex h={"12"} alignItems={"center"}>
                  <Heading size="md" noOfLines={2}>
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
