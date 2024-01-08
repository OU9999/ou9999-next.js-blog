import { colorThemeAtom, isRecaptchaAtom } from "@/utils/atoms";
import { dbService } from "@/firebase/firebase";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  FaLock,
  FaRegComments,
  FaUser,
  FaUserAstronaut,
  FaUserGraduate,
  FaUserInjured,
  FaUserMd,
  FaUserNinja,
  FaUserSecret,
  FaUserTie,
} from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { useColorTheme } from "@/hooks/useColorTheme";
import CheckRecaptchaModal from "@/components/common/CheckRecaptchaModal";

interface ICommentInputProps {
  docId: string;
  refetchFn: () => void;
}

export const userIcons = [
  {
    string: "normal",
    icon: <FaUser fontSize={"1.7rem"} />,
  },
  {
    string: "ninja",
    icon: <FaUserNinja fontSize={"1.7rem"} />,
  },
  {
    string: "secret",
    icon: <FaUserSecret fontSize={"1.7rem"} />,
  },
  {
    string: "tie",
    icon: <FaUserTie fontSize={"1.7rem"} />,
  },
  {
    string: "md",
    icon: <FaUserMd fontSize={"1.7rem"} />,
  },
  {
    string: "graduate",
    icon: <FaUserGraduate fontSize={"1.7rem"} />,
  },
  {
    string: "injured",
    icon: <FaUserInjured fontSize={"1.7rem"} />,
  },
  {
    string: "astronaut",
    icon: <FaUserAstronaut fontSize={"1.7rem"} />,
  },
];

export default function CommentInputMobile({
  docId,
  refetchFn,
}: ICommentInputProps) {
  //state
  const isRecap = useRecoilValue(isRecaptchaAtom);
  const [userIcon, setUserIcon] = useState<any>(userIcons[0]);
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  //util
  const { colorTheme } = useColorTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputBgColor = useColorModeValue("#fff", "#2D3748");
  const toast = useToast();

  const onAddButtonClicked = async () => {
    if (!isRecap) {
      onOpen();
      return;
    }

    if (nickname === "" || password === "" || comment === "") {
      toast({
        title: "빈칸이 있습니다.",
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (nickname.length > 10) {
      toast({
        title: `닉네임이 너무 깁니다..( ${nickname.length} / 10 )`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (comment.length > 500) {
      toast({
        title: `댓글이 너무 깁니다..( ${comment.length} / 500 )`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    await addDoc(collection(dbService, "comments"), {
      docId: docId,
      avatar: userIcon.string,
      nickname: nickname,
      password: password,
      comment: comment,
      createdAt: Date.now(),
      edited: false,
    });
    toast({
      title: "댓글작성 완료!",
      position: "top",
      isClosable: true,
    });
    setNickname("");
    setPassword("");
    setComment("");
    refetchFn();
  };

  return (
    <>
      <Divider mt={"24"} border={"5px solid"} />
      <Box w={"full"} pb={"24"} overflow={"hidden"}>
        <Center w={"full"}>
          <VStack w={"full"} px={2}>
            <Box fontSize={"7xl"} my={"10"}>
              <FaRegComments />
            </Box>
            <VStack
              alignItems={"flex-start"}
              w={"full"}
              h={"sm"}
              rounded={"2xl"}
              boxShadow={"dark-lg"}
              boxSizing="border-box"
              position={"relative"}
              p={5}
              gap={3}
              bgColor={inputBgColor}
            >
              <VStack w="full">
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaUser color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="닉네임"
                    variant="filled"
                    value={nickname}
                    onChange={(e) => setNickname(e.currentTarget.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="비밀번호"
                    variant="filled"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </InputGroup>
              </VStack>

              <Textarea
                alignItems={"flex-start"}
                placeholder="댓글 작성란..."
                height={"30vh"}
                variant={"filled"}
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
              />
              <Flex width={"full"} justifyContent={"flex-end"}>
                <Button colorScheme={colorTheme} onClick={onAddButtonClicked}>
                  댓글 작성
                </Button>
              </Flex>
            </VStack>
          </VStack>
        </Center>
      </Box>
      <CheckRecaptchaModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
