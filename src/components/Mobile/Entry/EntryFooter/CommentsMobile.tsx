import { Center } from "@chakra-ui/react";
import CommentMobile from "./CommentMobile";
import { IComment } from "@/firebase/firebaseTypes";

interface ICommentsProps {
  comments: IComment[];
  refetchFn: () => void;
}

export default function CommentsMobile({
  comments,
  refetchFn,
}: ICommentsProps) {
  return (
    <>
      <Center w="full" h={"auto"} flexDir={"column"} gap={4} px={2}>
        {comments?.map((comment) => (
          <CommentMobile
            key={"COMMENTMOBILE" + comment.id}
            commentId={comment.id!}
            nickname={comment.nickname!}
            password={comment.password!}
            avatar={comment.avatar!}
            comment={comment.comment!}
            createdAt={comment.createdAt!}
            edited={comment.edited!}
            refetchFn={refetchFn}
          />
        ))}
      </Center>
    </>
  );
}
