import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function OtherPostProfileMobile() {
  const toast = useToast();

  const onEmailButtonClicked = () => {
    toast({
      title: `복사 완료!`,
      position: "top",
      isClosable: true,
      icon: (
        <Box fontSize={"2xl"}>
          <MdEmail />
        </Box>
      ),
    });
    navigator.clipboard.writeText("omh232323@gmail.com");
  };
  return (
    <HStack w="full" p={7} gap={2}>
      <Avatar src="/assets/imgs/icon/profile.webp" size={"2xl"} />
      <VStack alignItems={"flex-start"} gap={0}>
        <Heading fontSize={"xl"}>@OU9999</Heading>
        <Text fontSize={"md"}>
          개발하면서 겪은 것, 깨달은 것을 정리하는 곳입니다.
        </Text>
        <HStack>
          <Button fontSize={"xl"} variant="ghost" colorScheme={"gray"}>
            <Link href="https://github.com/OU9999" target="_blank">
              <FaGithub />
            </Link>
          </Button>
          <Button
            fontSize={"xl"}
            variant="ghost"
            colorScheme={"gray"}
            onClick={onEmailButtonClicked}
          >
            <MdEmail />
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
}
