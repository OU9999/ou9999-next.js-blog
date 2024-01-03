import { Center } from "@chakra-ui/react";
import Comment from "./Comment/Comment";
import { IComment } from "@/firebase/firebaseTypes";

interface ICommentsProps {
  comments: IComment[];
  refetchFn: () => void;
}

export default function Comments({ comments, refetchFn }: ICommentsProps) {
  return (
    <>
      <Center w="full" h={"auto"} flexDir={"column"} gap={10}>
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
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
