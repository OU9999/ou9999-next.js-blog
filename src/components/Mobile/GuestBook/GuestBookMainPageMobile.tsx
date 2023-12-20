import { Box, VStack } from "@chakra-ui/react";
import GBInputMobile from "./GBInputMobile";
import GBCommentsMobile from "./GBCommentsMobile";

export default function GuestBookMainPageMobile() {
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
          <GBInputMobile />
          <GBCommentsMobile />
        </Box>
      </VStack>
    </>
  );
}
