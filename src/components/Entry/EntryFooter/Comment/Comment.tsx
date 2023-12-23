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
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCommentSlash, FaReply } from "react-icons/fa";
import CommentReply from "./CommenReply";
import CommentDeleteModal from "./CommentDeleteModal";
import { userIcons } from "../CommentInput";
import CommentPopover from "./CommentPopover";
import CommentReplyInput from "./CommentReplyInput";
import { dateFormatterMobile } from "@/utils/utilFn";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "@/firebase/firebase";
import { useRecoilValue } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";
import { fetchReplyComments } from "@/firebase/firebaseUtil";
import CommentToolTip from "./CommentToolTip";
import { IReplyComment } from "@/firebase/firebaseTypes";

interface ICommentProps {
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
  commentId: string;
  edited: boolean;
}

export default function Comment({
  nickname,
  password,
  comment,
  createdAt,
  avatar,
  commentId,
  edited,
}: ICommentProps) {
  //state
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [icon, setIcon] = useState<JSX.Element>();
  const [option, setOption] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const [replyComments, setReplyComments] = useState<IReplyComment[] | null>(
    null
  );

  //util
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = useColorModeValue("#fff", "#2D3748");
  const date = dateFormatterMobile(createdAt);

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
  };

  const getReplyComments = async (commentId: string) => {
    const fetchData = await fetchReplyComments(commentId);
    setReplyComments(fetchData);
  };

  useEffect(() => {
    getReplyComments(commentId);
  }, [commentId]);

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
        w={"3xl"}
        h={"auto"}
        rounded={"2xl"}
        boxShadow={"dark-lg"}
        p={"10"}
        alignItems={"flex-start"}
        gap={3}
        as={motion.div}
        onHoverStart={() => {
          setOption(true);
        }}
        onHoverEnd={() => {
          setOption(false);
        }}
        bgColor={bgColor}
      >
        <HStack w={"full"} justifyContent={"space-between"}>
          <HStack alignItems={"center"} gap={4}>
            <Avatar icon={icon} />
            <VStack alignItems={"flex-start"}>
              <Heading fontSize={"2xl"}>{nickname}</Heading>
              <HStack>
                <Text fontSize={"xs"}>
                  {date}
                  {edited ? " (수정됨)" : null}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack gap={2} opacity={option ? 1 : 0} transition={"0.5s"}>
            <CommentPopover password={password} setIsEdit={setIsEdit} />
            <CommentToolTip
              label="삭제"
              ariaLabel="delete"
              clickFn={onOpen}
              icon={<FaCommentSlash />}
            />
            <CommentToolTip
              label="답글"
              ariaLabel="reply"
              clickFn={() => setIsReply(true)}
              icon={<FaReply />}
            />
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

      {isReply && (
        <CommentReplyInput setIsReply={setIsReply} commentId={commentId} />
      )}
      <Center w="full" h={"auto"} flexDir={"column"} gap={10}>
        {replyComments?.map((reply) => (
          <CommentReply
            key={"REPLY" + reply.id!}
            id={reply.id!}
            nickname={reply.nickname!}
            password={reply.password!}
            avatar={reply.avatar!}
            comment={reply.comment!}
            createdAt={reply.createdAt!}
            edited={reply.edited!}
          />
        ))}
      </Center>
      <CommentDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        commentId={commentId}
        password={password}
      />
    </>
  );
}
