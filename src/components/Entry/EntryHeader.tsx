import DeleteModal from "@/components/Entry/DeleteModal";
import { isLoginAtom } from "@/utils/atoms";
import {
  dateFormatter,
  returnUrlTitle,
  selectBasicThumbnail,
} from "@/utils/utilFn";
import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { BiTimeFive } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { IEntryProps } from "@/pages/entry/[...slug]";

export interface IDetail {
  category: string;
  createdAt: number;
  md: string;
  thumbnailUrl: string;
  title: string;
}

export default function EntryHeader({ detail, docId }: IEntryProps) {
  const isLogin = useRecoilValue(isLoginAtom);
  const date = dateFormatter(detail.createdAt!);
  const urlTitle = returnUrlTitle(detail.title!);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box w="100vw" h="50vh" position={"absolute"} zIndex={30}>
        <Image
          aria-label="thumbnail"
          src={selectBasicThumbnail(detail.category!)}
          fill={true}
          alt="thumbnail"
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
        h="50vh"
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
        minH={"50vh"}
        width="full"
        color="white"
        zIndex={33}
        position={"relative"}
      >
        <VStack gap={5}>
          <Heading textShadow={"#000 1px 0 10px"} fontSize={"5xl"} px={20}>
            {detail?.title}
          </Heading>
          <HStack gap={10}>
            <HStack justifyContent={"center"} alignItems={"center"} spacing={1}>
              <Box fontSize={"2xl"}>
                <GoThreeBars />
              </Box>
              <Text
                textShadow={"#000 1px 0 10px"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {detail?.category}
              </Text>
            </HStack>
            <HStack justifyContent={"center"} alignItems={"center"} spacing={1}>
              <Box fontSize={"2xl"}>
                <BiTimeFive />
              </Box>
              <Text
                textShadow={"#000 1px 0 10px"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {date}
              </Text>
            </HStack>
          </HStack>

          {isLogin ? (
            <HStack
              position={"absolute"}
              bottom={10}
              right={10}
              gap={3}
              color="white"
              fontWeight={"bold"}
            >
              <Link
                href={{
                  pathname: `/write/${urlTitle}/${docId}`,
                }}
              >
                <Box
                  cursor={"pointer"}
                  _hover={{
                    borderBottom: "1px solid",
                  }}
                >
                  <Text>수정</Text>
                </Box>
              </Link>
              <Box
                onClick={onOpen}
                cursor={"pointer"}
                _hover={{
                  borderBottom: "1px solid",
                }}
              >
                <Text>삭제</Text>
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
