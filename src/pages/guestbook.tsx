import GBComments from "@/components/GuestBook/GBComments";
import GBInput from "@/components/GuestBook/GBInput";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

export default function GuestBook() {
  return (
    <>
      <NextSeo
        title="GuestBook | OU9999"
        description="OU9999 First Blog | GuestBook!"
        openGraph={{
          type: "website",
          url: "no",
          title: "OU9999",
          description: "OU9999 First Blog! | GuestBook!",
          images: [
            {
              url: "/op.png",
              width: 285,
              height: 167,
              alt: "image",
            },
          ],
        }}
      />
      <VStack h="auto" justifyContent={"flex-start"} position={"relative"}>
        <Box
          w="100vw"
          h="60vh"
          position={"absolute"}
          zIndex={-1}
          backgroundRepeat="no-repeat"
          backgroundAttachment={"fixed"}
          backgroundSize="cover"
          backgroundPosition={"center center"}
          backgroundImage="https://firebasestorage.googleapis.com/v0/b/ou9999-first-blog.appspot.com/o/icons%2Fjerry.gif?alt=media&token=b7813d8a-f932-46ee-a480-dca70707d3c6"
        />
        <Box
          w="100vw"
          h="60vh"
          position={"absolute"}
          zIndex={1}
          top={-2}
          background={
            "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
          }
          backgroundSize="10px 10px"
          opacity={0.3}
        />

        <Center minH={"60vh"} color="white" zIndex={2}>
          <VStack gap={4}>
            <Heading textShadow={"#000 1px 0 10px"} fontSize={"7xl"}>
              Guest Book
            </Heading>
            <Text
              textShadow={"#000 1px 0 10px"}
              fontSize={"2xl"}
              fontWeight={"bold"}
            >
              시간 내서 블로그에 방문해주셔서 감사해요~ 익명 작성 가능합니다!
            </Text>
          </VStack>
        </Center>
        {/* comments */}
        <Box w={"full"} height={"auto"} zIndex={2} pt={"32"}>
          <GBInput />
          <GBComments />
        </Box>
      </VStack>
    </>
  );
}
