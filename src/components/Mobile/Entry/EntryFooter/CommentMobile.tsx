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
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { dateFormatterMobile } from "@/utils/utilFn";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { dbService } from "@/firebase/firebase";
import { userIcons } from "./Comment/CommentInputMobile";
import CommentReplyInputMobile from "./Comment/CommentReplyInputMobile";
import CommentReplyMobile from "./Comment/CommentReplyMobile";
import { colorThemeAtom } from "@/utils/atoms";
import { useRecoilValue } from "recoil";
import { IReplyComment } from "@/firebase/firebaseTypes";
import { fetchReplyComments } from "@/firebase/firebaseUtil";

interface ICommentProps {
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
  commentId: string;
  edited: boolean;
  refetchFn: () => void;
}

export default function CommentMobile({
  nickname,
  password,
  comment,
  createdAt,
  avatar,
  commentId,
  edited,
  refetchFn,
}: ICommentProps) {
  //state
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [icon, setIcon] = useState<JSX.Element>();
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const [replyComments, setReplyComments] = useState<IReplyComment[] | null>(
    null
  );

  //util
  const toast = useToast();
  const bgColor = useColorModeValue("#fff", "#2D3748");
  const date = dateFormatterMobile(createdAt);

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

    const commentsRef = doc(dbService, "comments", commentId);
    await deleteDoc(commentsRef);
    toast({
      title: "삭제 완료!",
      position: "top",
      isClosable: true,
    });
    refetchFn();
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

  const onUpdateButtonClick = async () => {
    if (newComment.length > 500) {
      toast({
        title: `댓글이 너무 깁니다..( ${newComment.length} / 500 )`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    const commentsRef = doc(dbService, "comments", commentId!);
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
    refetchFn();
  };

  const getReplyComments = async () => {
    const fetchData = await fetchReplyComments(commentId);
    setReplyComments(fetchData);
  };

  useEffect(() => {
    getReplyComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <VStack
        position={"relative"}
        w={"full"}
        h={"auto"}
        rounded={"2xl"}
        boxShadow={"2xl"}
        alignItems={"flex-start"}
        px={4}
        pt={4}
        pb={5}
        gap={3}
        zIndex={10}
        bgColor={bgColor}
      >
        <HStack
          w={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <HStack justifyContent={"center"} alignItems={"center"} gap={2}>
            <Avatar icon={<FaUser fontSize={"1.2rem"} />} size={"sm"} />
            <VStack alignItems={"flex-start"} spacing={0}>
              <Heading fontSize={"xl"}>{nickname}</Heading>
              <HStack>
                <Text fontSize={"xs"}>
                  {date}
                  {edited ? " (수정됨)" : null}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack spacing={0} gap={2}>
            <Text fontSize={"sm"} color={"gray"} onClick={onEditClick}>
              수정
            </Text>
            <Text fontSize={"sm"} color={"gray"} onClick={onDeleteClick}>
              삭제
            </Text>
            <Text
              fontSize={"sm"}
              color={"gray"}
              onClick={() => setIsReply(true)}
            >
              답글
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
              <Button
                onClick={() => setIsEdit(false)}
                colorScheme={colorTheme}
                variant={"ghost"}
              >
                취소
              </Button>
              <Button
                onClick={() => onUpdateButtonClick()}
                colorScheme={colorTheme}
              >
                수정
              </Button>
            </HStack>
          </VStack>
        ) : (
          <Text wordBreak={"break-all"}>{comment}</Text>
        )}
      </VStack>

      {isReply ? (
        <CommentReplyInputMobile
          setIsReply={setIsReply}
          commentId={commentId}
          refetchReplyFn={getReplyComments}
        />
      ) : null}
      <Center w="full" h={"auto"} flexDir={"column"} gap={4}>
        {replyComments?.map((reply) => (
          <CommentReplyMobile
            key={"REPLYM" + reply.id!}
            id={reply.id!}
            nickname={reply.nickname!}
            password={reply.password!}
            avatar={reply.avatar!}
            comment={reply.comment!}
            createdAt={reply.createdAt!}
            edited={reply.edited!}
            refetchReplyFn={getReplyComments}
          />
        ))}
      </Center>
    </>
  );
}
