import {
  Avatar,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiCornerDownRight } from "react-icons/fi";
import { dateFormatter } from "@/utils/utilFn";
import { userIcons } from "./CommentInputMobile";
import { dbService } from "@/firebase/firebase";
import { colorThemeAtom } from "@/utils/atoms";
import { useRecoilValue } from "recoil";

interface IReplyCommentProps {
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
  id: string;
  edited: boolean;
  refetchReplyFn: () => void;
}

export default function CommentReplyMobile({
  nickname,
  password,
  avatar,
  comment,
  createdAt,
  id,
  edited,
  refetchReplyFn,
}: IReplyCommentProps) {
  //state
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [icon, setIcon] = useState<JSX.Element>();
  const [option, setOption] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment);

  //util
  const bgColor = useColorModeValue("#fff", "#2D3748");
  const date = dateFormatter(createdAt);
  const toast = useToast();

  const onUpdateButtonClick = async () => {
    const commentsRef = doc(dbService, "replyComments", id);
    await updateDoc(commentsRef, {
      comment: newComment,
      edited: true,
    });
    toast({
      title: "수정 완료!",
      position: "top",
      isClosable: true,
    });
    setIsEdit(false);
    refetchReplyFn();
  };

  const onDeleteClick = async () => {
    const newPassword = prompt("확인용 비밀번호를 입력해주세요.", "");
    if (newPassword !== password) {
      toast({
        title: "비밀번호가 틀립니다",
        position: "top",
        isClosable: true,
        status: "error",
      });
      return;
    }

    const commentsRef = doc(dbService, "replyComments", id);
    await deleteDoc(commentsRef);
    toast({
      title: "삭제 완료!",
      position: "top",
      isClosable: true,
    });
    refetchReplyFn();
  };

  const onEditClick = async () => {
    const newPassword = prompt("확인용 비밀번호를 입력해주세요.", "");
    if (newPassword !== password) {
      toast({
        title: "비밀번호가 틀립니다",
        position: "top",
        isClosable: true,
        status: "error",
      });
      return;
    }

    setIsEdit(true);
  };

  const avatarTest = (avatar: string) => {
    // eslint-disable-next-line array-callback-return
    userIcons.map((userIcon) => {
      if (avatar === userIcon.string) return setIcon(userIcon.icon);
    });
  };

  useEffect(() => {
    avatarTest(avatar);
  }, [avatar]);

  return (
    <>
      <Center w="full" h="auto">
        <Center w={"24"} fontSize={"4xl"}>
          <FiCornerDownRight />
        </Center>
        <VStack
          w="2xl"
          rounded={"2xl"}
          boxShadow={"2xl"}
          p={5}
          alignItems={"flex-start"}
          gap={3}
          zIndex={11}
          bgColor={bgColor}
        >
          <HStack
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pos="relative"
          >
            <HStack justifyContent={"center"} alignItems={"center"} gap={2}>
              <Avatar icon={<FaUser fontSize={"1.2rem"} />} size={"sm"} />
              <VStack alignItems={"flex-start"} spacing={0}>
                <Heading fontSize={"xl"}>{nickname}</Heading>
                <HStack>
                  <Text fontSize={"xs"}>
                    {date}
                    {edited ? "(수정됨)" : null}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack spacing={0} gap={2} pos={"absolute"} right={0} top={0}>
              <Text fontSize={"sm"} color={"gray"} onClick={onEditClick}>
                수정
              </Text>
              <Text fontSize={"sm"} color={"gray"} onClick={onDeleteClick}>
                삭제
              </Text>
            </HStack>
          </HStack>
          {isEdit ? (
            <VStack w={"full"} gap={3}>
              <Textarea
                height={"40"}
                variant={"filled"}
                value={newComment}
                onChange={(e) => setNewComment(e.currentTarget.value)}
              />
              <HStack w={"full"} justifyContent={"flex-end"}>
                <Button colorScheme={colorTheme} variant={"ghost"}>
                  취소
                </Button>
                <Button colorScheme={colorTheme} onClick={onUpdateButtonClick}>
                  수정
                </Button>
              </HStack>
            </VStack>
          ) : (
            <Text>{comment}</Text>
          )}
        </VStack>
      </Center>
    </>
  );
}
