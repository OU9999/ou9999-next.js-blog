import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCommentSlash } from "react-icons/fa";
import GBCommentDeleteModal from "./GBCommentDeleteModal";
import GBCommentPopover from "./GBCommentPopover";
import { userIcons } from "./GBInput";
import { dateFormatterMobile } from "@/utils/utilFn";
import { doc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import Image from "next/image";

interface ICommentProps {
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
  commentId: string;
  edited: boolean;
  userIconPic: string;
  guestBookImg: string;
  refetchFn: () => void;
}

export default function GBComment({
  nickname,
  password,
  comment,
  createdAt,
  avatar,
  commentId,
  edited,
  userIconPic,
  guestBookImg,
  refetchFn,
}: ICommentProps) {
  //state
  const [icon, setIcon] = useState<JSX.Element>();
  const [option, setOption] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const [newGuestBookImg, setNewGuestBookImg] = useState<string | undefined>(
    guestBookImg
  );

  //util
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = useColorModeValue("#fff", "#2D3748");
  const date = dateFormatterMobile(createdAt);
  // const guestBookImgInput = useRef<HTMLInputElement>(null);

  const onUpdateButtonClick = async () => {
    if (newComment.length > 500) {
      toast({
        title: `방명록이 너무 깁니다..( ${newComment.length} / 500 )`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    const commentsRef = doc(dbService, "guestBooks", commentId!);
    const guestBookImgRef = ref(storageService, `guestBooks/imgs/${uuidv4()}`);
    let getGuestBookImgUrl = "";

    if (newGuestBookImg) {
      if (newGuestBookImg.includes("https:")) {
        await updateDoc(commentsRef, {
          comment: newComment,
          edited: true,
          guestBookImg: newGuestBookImg,
        });
        refetchFn();
        toast({
          title: "수정 완료!",
          position: "top",
          isClosable: true,
        });
        setIsEdit(false);
        return;
      }
      const response = await uploadString(
        guestBookImgRef,
        newGuestBookImg as string,
        "data_url"
      );
      getGuestBookImgUrl = await getDownloadURL(response.ref);
    }

    await updateDoc(commentsRef, {
      comment: newComment,
      guestBookImg: getGuestBookImgUrl,
      edited: true,
    });
    refetchFn();
    toast({
      title: "수정 완료!",
      position: "top",
      isClosable: true,
    });
    setIsEdit(false);
  };

  const onClearButtonClicked = () => {
    setNewGuestBookImg(undefined);
  };

  const avatarTest = (avatar: string) => {
    // eslint-disable-next-line array-callback-return
    userIcons.map((userIcon) => {
      if (avatar === userIcon.string) return setIcon(userIcon.icon);
    });
  };

  useEffect(() => {
    avatarTest(avatar);
  }, [avatar]);

  // const onGuestBookImgButtonClicked = (e: any) => {
  //   guestBookImgInput?.current?.click();
  // };

  // const onGuestBookImgFileChange = ({
  //   currentTarget: { files },
  // }: React.FormEvent<HTMLInputElement>) => {
  //   if (files) {
  //     const uploadFile = files![0];
  //     const reader = new FileReader();
  //     reader.onloadend = (finishEvent) => {
  //       setNewGuestBookImg(finishEvent.target?.result as string);
  //     };
  //     reader.readAsDataURL(uploadFile);
  //   }
  // };

  return (
    <>
      <VStack
        position={"relative"}
        w="3xl"
        rounded={"2xl"}
        boxShadow={"dark-lg"}
        p={"10"}
        alignItems={"flex-start"}
        gap={3}
        as={motion.div}
        onHoverStart={() => {
          setOption(true);
        }}
        onHoverEnd={() => {
          setOption(false);
        }}
        bgColor={bgColor}
      >
        <HStack w={"full"} justifyContent={"space-between"}>
          <HStack alignItems={"center"} gap={4}>
            {userIconPic !== "" ? (
              <Avatar overflow={"hidden"}>
                <Image
                  src={userIconPic}
                  fill={true}
                  alt="userIconPic"
                  quality={10}
                  style={{
                    objectFit: "cover",
                  }}
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
                />
              </Avatar>
            ) : (
              <Avatar icon={icon} />
            )}
            {/* <Avatar icon={icon} /> */}
            <VStack alignItems={"flex-start"}>
              <Heading fontSize={"2xl"}>{nickname}</Heading>
              <HStack>
                <Text fontSize={"xs"}>
                  {date}
                  {edited ? " (수정됨)" : null}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack gap={2} opacity={option ? 1 : 0} transition={"0.5s"}>
            <GBCommentPopover
              password={password}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
            />
            <Tooltip label="삭제" aria-label="delete" placement="top">
              <IconButton
                fontSize={"xl"}
                aria-label="delete"
                variant="ghost"
                onClick={onOpen}
              >
                <FaCommentSlash />
              </IconButton>
            </Tooltip>
          </HStack>
        </HStack>
        {isEdit ? (
          <VStack w={"full"} gap={3}>
            <Textarea
              height={"40"}
              variant={"filled"}
              value={newComment}
              onChange={(e) => setNewComment(e.currentTarget.value)}
            />
            <Flex w={"full"} gap={5} alignItems={"center"}>
              {/* <Box>
                <Button size={"sm"} onClick={onGuestBookImgButtonClicked}>
                  <FaImage />
                </Button>
                <input
                  type="file"
                  onChange={onGuestBookImgFileChange}
                  accept="image/*"
                  ref={guestBookImgInput}
                  style={{ display: "none" }}
                />
              </Box> */}
              <Box w={"50%"}>
                {newGuestBookImg ? (
                  <HStack>
                    <Box h={"10"} w={"10"}>
                      <Image
                        src={newGuestBookImg}
                        alt="newGBImg"
                        fill={true}
                        quality={10}
                        style={{
                          objectFit: "cover",
                        }}
                        placeholder="blur"
                        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
                      />
                    </Box>
                    <Button size={"sm"} onClick={onClearButtonClicked}>
                      삭제
                    </Button>
                  </HStack>
                ) : null}
              </Box>
              <Flex
                w={"50%"}
                gap={3}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Button
                  onClick={() => setIsEdit(false)}
                  colorScheme="twitter"
                  variant={"ghost"}
                >
                  취소
                </Button>
                <Button colorScheme="twitter" onClick={onUpdateButtonClick}>
                  수정
                </Button>
              </Flex>
            </Flex>
          </VStack>
        ) : (
          <VStack w="full" alignItems={"flex-start"} gap={3}>
            <Text wordBreak={"break-all"} textAlign={"center"}>
              {comment}
            </Text>
            <Box w="full" h="auto" rounded={"md"} overflow={"hidden"}>
              {guestBookImg !== "" ? (
                <Image
                  src={guestBookImg}
                  alt="GBImg"
                  width={800}
                  height={800}
                  style={{
                    objectFit: "cover",
                  }}
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
                />
              ) : null}
            </Box>
          </VStack>
        )}
      </VStack>

      <GBCommentDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        commentId={commentId}
        password={password}
        refetchFn={refetchFn}
      />
    </>
  );
}
