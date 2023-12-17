import { Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Comment from "./Comment/Comment";
import { fetchComments } from "@/firebase/firebaseUtil";
import { IComment } from "@/firebase/firebaseTypes";

interface ICommentsProps {
  docId: string;
}

export default function Comments({ docId }: ICommentsProps) {
  const [comments, setComments] = useState<IComment[] | undefined>(undefined);

  const getComments = async (docId: string) => {
    const fetchData = await fetchComments(docId);
    setComments(fetchData);
  };

  useEffect(() => {
    getComments(docId);
  }, [docId]);

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
          />
        ))}
      </Center>
    </>
  );
}
