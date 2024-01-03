import { Box, useColorModeValue } from "@chakra-ui/react";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import { IComment } from "@/firebase/firebaseTypes";
import { fetchComments } from "@/firebase/firebaseUtil";

interface ICommentsBoxProps {
  docId: string;
}

const CommentsBox = ({ docId }: ICommentsBoxProps) => {
  //state
  const [comments, setComments] = useState<IComment[] | undefined>(undefined);

  //util
  const bgColor = useColorModeValue("white", "#1A202C");

  const getComments = async () => {
    const fetchData = await fetchComments(docId);
    setComments(fetchData);
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        w={"full"}
        height={"auto"}
        position="relative"
        zIndex={5}
        bgColor={bgColor}
      >
        <CommentInput docId={docId} refetchFn={getComments} />
        <Comments comments={comments!} refetchFn={getComments} />
      </Box>
    </>
  );
};

export default CommentsBox;
