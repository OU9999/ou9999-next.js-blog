import DeleteModal from "@/components/Entry/DeleteModal";
import { isLoginAtom } from "@/utils/atoms";
import { dateFormatter, selectBasicThumbnail } from "@/utils/utilFn";
import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { BiTimeFive } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { IDetail } from "@/utils/firebaseTypes";

interface IEntryHeaderMobileProps {
  detail: IDetail;
  docId: string;
}

export default function EntryHeaderMobile({
  detail,
  docId,
}: IEntryHeaderMobileProps) {
  const isLogin = useRecoilValue(isLoginAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const date = dateFormatter(detail.createdAt!);

  return (
    <>
      <Box w="100vw" h={"30vh"} position={"absolute"} zIndex={-1}>
        <Image
          alt="mainImg"
          src={selectBasicThumbnail(detail.category!)}
          fill={true}
          style={{
            objectFit: "cover",
          }}
          priority
          // placeholder="blur"
          // blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
        />
      </Box>
      <Box
        w="100vw"
        h="30vh"
        position={"absolute"}
        zIndex={32}
        top={-2}
        background={
          "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
        }
        backgroundSize="10px 10px"
        opacity={0.3}
      />
      <Center
        minH={"30vh"}
        width="full"
        color="white"
        zIndex={33}
        position={"relative"}
      >
        <VStack gap={5} w="full" bgColor={"rgba(0,0,0,0.3)"} py={5}>
          <Heading textShadow={"#000 1px 0 10px"} fontSize={"xl"} px={10}>
            {detail?.title}
          </Heading>
          <HStack gap={10}>
            <HStack justifyContent={"center"} alignItems={"center"} spacing={1}>
              <Box fontSize={"sm"}>
                <GoThreeBars />
              </Box>
              <Text
                textShadow={"#000 1px 0 10px"}
                fontSize={"sm"}
                fontWeight={"bold"}
              >
                {detail?.category}
              </Text>
            </HStack>
            <HStack justifyContent={"center"} alignItems={"center"} spacing={1}>
              <Box fontSize={"sm"}>
                <BiTimeFive />
              </Box>
              <Text
                textShadow={"#000 1px 0 10px"}
                fontSize={"sm"}
                fontWeight={"bold"}
              >
                {date}
              </Text>
            </HStack>
          </HStack>

          {isLogin ? (
            <HStack
              position={"absolute"}
              bottom={4}
              right={4}
              gap={2}
              color="white"
              fontWeight={"bold"}
            >
              <Box
                onClick={onOpen}
                cursor={"pointer"}
                _hover={{
                  borderBottom: "1px solid",
                }}
              >
                <Text fontSize={"sm"}>삭제</Text>
              </Box>
            </HStack>
          ) : null}
        </VStack>
      </Center>

      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        id={docId}
        thumbnailUrl={detail?.thumbnailUrl!}
      />
    </>
  );
}
