import { returnUrlTitle, selectBasicThumbnail } from "@/utils/utilFn";
import {
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { BiTimeFive } from "react-icons/bi";

interface IOtherCardMobileProps {
  title: string;
  docId: string;
  thumbnailUrl: string;
  category: string;
}

export default function OtherCardMobile({
  title,
  docId,
  thumbnailUrl,
  category,
}: IOtherCardMobileProps) {
  const mdBgColor = useColorModeValue(
    "rgba(255,255,255,1)",
    "rgba(45,55,72,1)"
  );
  const urlTitle = returnUrlTitle(title);
  return (
    <>
      <Link href={`/entry/${urlTitle}/${docId}`}>
        <HStack
          w="80"
          h="12"
          rounded={"md"}
          boxShadow={"2xl"}
          bgColor={mdBgColor}
          px={2}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"} w="full">
            <HStack w="100%">
              <Image
                alt="thumbNail"
                src={
                  thumbnailUrl === ""
                    ? selectBasicThumbnail(category)
                    : thumbnailUrl
                }
                w="14"
                h="10"
                rounded={5}
              />
              <VStack gap={0} spacing={0} alignItems={"flex-start"}>
                <Text fontSize={"sm"} color={"gray"}>
                  {category}
                </Text>
                <Text noOfLines={1} fontSize={"md"} fontWeight={"bold"}>
                  {title}
                </Text>
              </VStack>
            </HStack>
          </Flex>
        </HStack>
      </Link>
    </>
  );
}
