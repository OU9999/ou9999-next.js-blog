import { Center } from "@chakra-ui/react";
import GBComment from "./GBComment";
import { IGuestBookComment } from "@/firebase/firebaseTypes";

interface IGBCommentsProps {
  comments: IGuestBookComment[] | null;
  refetchFn: () => void;
}

export default function GBComments({ comments, refetchFn }: IGBCommentsProps) {
  return (
    <>
      <Center
        w="full"
        h={"auto"}
        flexDir="column"
        gap={30}
        zIndex={6}
        position="relative"
        pb={"28"}
      >
        {comments?.map((comment) => (
          <GBComment
            key={"GBCOMMENT" + comment.id!}
            commentId={comment.id!}
            nickname={comment.nickname!}
            password={comment.password!}
            avatar={comment.avatar!}
            comment={comment.comment!}
            createdAt={comment.createdAt!}
            edited={comment.edited!}
            userIconPic={comment.userIconPic!}
            guestBookImg={comment.guestBookImg!}
            refetchFn={refetchFn}
          />
        ))}
      </Center>
    </>
  );
}
