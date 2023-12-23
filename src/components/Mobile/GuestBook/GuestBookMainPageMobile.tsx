import { Box, VStack } from "@chakra-ui/react";
import GBInputMobile from "./GBInputMobile";
import GBCommentsMobile from "./GBCommentsMobile";
import { IGuestBookComment } from "@/firebase/firebaseTypes";
import { useEffect, useState } from "react";
import { fetchGuestBookComments } from "@/firebase/firebaseUtil";

export default function GuestBookMainPageMobile() {
  const [comments, setComments] = useState<IGuestBookComment[] | null>(null);

  const getGuestBookComments = async () => {
    const data = await fetchGuestBookComments();
    setComments(data);
  };

  useEffect(() => {
    getGuestBookComments();
  }, []);

  return (
    <>
      <VStack
        w="100vw"
        h="auto"
        justifyContent={"flex-start"}
        position={"relative"}
        overflow={"hidden"}
      >
        {/* comments */}
        <Box w={"full"} height={"auto"} zIndex={2}>
          <GBInputMobile refetchFn={getGuestBookComments} />
          <GBCommentsMobile
            comments={comments}
            refetchFn={getGuestBookComments}
          />
        </Box>
      </VStack>
    </>
  );
}
