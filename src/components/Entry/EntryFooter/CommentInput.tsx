import { colorThemeAtom } from "@/utils/atoms";
import { dbService } from "@/firebase/firebase";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
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

export default function CommentInput({ docId, refetchFn }: ICommentInputProps) {
  //state
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [userIcon, setUserIcon] = useState<any>(userIcons[0]);
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  //util
  const inputBgColor = useColorModeValue("#fff", "#2D3748");
  const toast = useToast();

  const onAvatarClicked = () => {
    setUserIcon(userIcons[Math.floor(Math.random() * userIcons.length)]);
  };

  const onAddButtonClicked = async () => {
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
      <Box w={"full"} pb={"24"}>
        <Center w={"full"}>
          <VStack w={"full"}>
            <Box fontSize={"9xl"} my={"10"}>
              <FaRegComments />
            </Box>
            <VStack
              alignItems={"flex-start"}
              w={"3xl"}
              h={"sm"}
              rounded={"2xl"}
              boxShadow={"dark-lg"}
              boxSizing="border-box"
              position={"relative"}
              p={5}
              gap={3}
              bgColor={inputBgColor}
            >
              <HStack width={"80%"} p={5} gap={3}>
                {userIcon && (
                  <Avatar
                    icon={userIcon.icon}
                    onClick={onAvatarClicked}
                    cursor={"pointer"}
                  />
                )}

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
              </HStack>
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
    </>
  );
}
