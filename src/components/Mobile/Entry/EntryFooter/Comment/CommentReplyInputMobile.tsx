import {
  Avatar,
  Button,
  Center,
  HStack,
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
import { Dispatch, SetStateAction, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { FiCornerDownRight } from "react-icons/fi";
import { userIcons } from "./CommentInputMobile";
import { dbService } from "@/firebase/firebase";
import { isRecaptchaAtom } from "@/utils/atoms";
import { useRecoilValue } from "recoil";
import CheckRecaptchaModal from "@/components/common/CheckRecaptchaModal";
import { useColorTheme } from "@/hooks/useColorTheme";

interface IReplyCommentInputProps {
  setIsReply: Dispatch<SetStateAction<boolean>>;
  commentId: string;
  refetchReplyFn: () => void;
}

export default function CommentReplyInputMobile({
  setIsReply,
  commentId,
  refetchReplyFn,
}: IReplyCommentInputProps) {
  //state
  const isRecap = useRecoilValue(isRecaptchaAtom);
  const [userIcon, setUserIcon] = useState<any>(userIcons[0]);
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  //util
  const { colorTheme } = useColorTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("#fff", "#2D3748");
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
    await addDoc(collection(dbService, "replyComments"), {
      commentId: commentId,
      avatar: userIcon.string,
      nickname: nickname,
      password: password,
      comment: comment,
      createdAt: Date.now(),
      edited: false,
    });
    toast({
      title: "답글작성 완료!",
      position: "top",
      isClosable: true,
    });
    setIsReply(false);
    refetchReplyFn();
  };

  // const onAvatarClicked = () => {
  //   setUserIcon(userIcons[Math.floor(Math.random() * userIcons.length)]);
  // };

  return (
    <>
      <Center w="full" h="auto">
        <Center w={"24"} fontSize={"4xl"}>
          <FiCornerDownRight />
        </Center>
        <VStack
          w="2xl"
          rounded={"2xl"}
          boxShadow={"dark-lg"}
          alignItems={"flex-start"}
          gap={2}
          bgColor={bgColor}
          p={5}
        >
          <VStack width={"full"}>
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
          <VStack w={"full"} gap={3}>
            <Textarea
              height={"40"}
              variant={"filled"}
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
            />
            <HStack w={"full"} justifyContent={"flex-end"}>
              <Button
                onClick={() => setIsReply(false)}
                colorScheme={colorTheme}
                variant={"ghost"}
              >
                취소
              </Button>
              <Button onClick={onAddButtonClicked} colorScheme={colorTheme}>
                답글 작성
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Center>
      <CheckRecaptchaModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
