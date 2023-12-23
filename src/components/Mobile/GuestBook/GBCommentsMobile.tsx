import { Center } from "@chakra-ui/react";
import GBCommentMobile from "./GBCommentMobile";
import { IGuestBookComment } from "@/firebase/firebaseTypes";

interface IGBCommentsProps {
  comments: IGuestBookComment[] | null;
  refetchFn: () => void;
}

export default function GBCommentsMobile({
  comments,
  refetchFn,
}: IGBCommentsProps) {
  return (
    <>
      <Center
        w="full"
        h={"auto"}
        flexDir="column"
        gap={30}
        zIndex={6}
        position="relative"
        px={2}
        pb={"28"}
      >
        {comments?.map((comment) => (
          <GBCommentMobile
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
