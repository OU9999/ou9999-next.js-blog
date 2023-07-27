import GBComments from "@/components/GuestBook/GBComments";
import GBInput from "@/components/GuestBook/GBInput";

import { Box, VStack } from "@chakra-ui/react";
import PageHeader from "../common/PageHeader";

export default function GuestBookMainPage() {
  return (
    <>
      <VStack h="auto" justifyContent={"flex-start"} position={"relative"}>
        <PageHeader
          title="Guest Book"
          bgImg="/assets/imgs/main/spiderverse.webp"
          subText="시간 내서 블로그에 방문해주셔서 감사해요~ 익명 작성 가능합니다!"
        />

        {/* comments */}
        <Box w={"full"} height={"auto"} zIndex={2} pt={"32"}>
          <GBInput />
          <GBComments />
        </Box>
      </VStack>
    </>
  );
}
