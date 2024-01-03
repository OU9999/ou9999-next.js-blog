import { Box, useColorModeValue } from "@chakra-ui/react";
import CommentInputMobile from "./Comment/CommentInputMobile";
import CommentsMobile from "./CommentsMobile";
import { useEffect, useState } from "react";
import { IComment } from "@/firebase/firebaseTypes";
import { fetchComments } from "@/firebase/firebaseUtil";

interface ICommentBoxMobileProps {
  docId: string;
}

const CommentBoxMobile = ({ docId }: ICommentBoxMobileProps) => {
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
    <Box
      w={"full"}
      height={"auto"}
      position="relative"
      zIndex={5}
      bgColor={bgColor}
    >
      <CommentInputMobile docId={docId} refetchFn={getComments} />
      <CommentsMobile comments={comments!} refetchFn={getComments} />
    </Box>
  );
};

export default CommentBoxMobile;
