import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaImage, FaUser } from "react-icons/fa";
import { dateFormatter } from "@/utils/utilFn";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "@/utils/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { userIcons } from "./GBInputMobile";
import { useRecoilValue } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";

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
}

export default function GBCommentMobile({
  nickname,
  password,
  comment,
  createdAt,
  avatar,
  commentId,
  edited,
  userIconPic,
  guestBookImg,
}: ICommentProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [icon, setIcon] = useState<JSX.Element>();
  const [isEdit, setIsEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const [newGuestBookImg, setNewGuestBookImg] = useState<string | undefined>(
    guestBookImg
  );

  const toast = useToast();
  const bgColor = useColorModeValue("#fff", "#2D3748");
  const date = dateFormatter(createdAt);
  const guestBookImgInput = useRef<HTMLInputElement>(null);

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
    toast({
      title: "수정 완료!",
      position: "top",
      isClosable: true,
    });
    setIsEdit(false);
  };

  const onDeleteClick = async () => {
    const newPassword = prompt("확인용 비밀번호를 입력해주세요.", "");
    if (newPassword === password) {
      const commentsRef = doc(dbService, "guestBooks", commentId);
      await deleteDoc(commentsRef);
      toast({
        title: "삭제 완료!",
        position: "top",
        isClosable: true,
      });
    } else if (newPassword === "") {
    } else {
      toast({
        title: "비밀번호가 틀립니다",
        position: "top",
        isClosable: true,
        status: "error",
      });
    }
  };

  const onEditClick = async () => {
    const newPassword = prompt("확인용 비밀번호를 입력해주세요.", "");
    if (newPassword === password) {
      setIsEdit(true);
    } else if (newPassword === "") {
    } else {
      toast({
        title: "비밀번호가 틀립니다",
        position: "top",
        isClosable: true,
        status: "error",
      });
    }
  };

  const onGuestBookImgButtonClicked = (e: any) => {
    guestBookImgInput?.current?.click();
  };

  const onGuestBookImgFileChange = ({
    currentTarget: { files },
  }: React.FormEvent<HTMLInputElement>) => {
    if (files) {
      const uploadFile = files![0];
      const reader = new FileReader();
      reader.onloadend = (finishEvent) => {
        setNewGuestBookImg(finishEvent.target?.result as string);
      };
      reader.readAsDataURL(uploadFile);
    }
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

  return (
    <>
      <VStack
        position={"relative"}
        w={"full"}
        h={"auto"}
        rounded={"2xl"}
        boxShadow={"dark-lg"}
        alignItems={"flex-start"}
        px={4}
        pt={4}
        pb={5}
        gap={3}
        bgColor={bgColor}
      >
        <HStack
          w={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <HStack justifyContent={"center"} alignItems={"center"} gap={2}>
            {userIconPic === "" ? (
              <Avatar icon={<FaUser fontSize={"1.2rem"} />} size={"sm"} />
            ) : (
              <Avatar src={userIconPic} size={"sm"} />
            )}

            <VStack alignItems={"flex-start"} spacing={0}>
              <Heading fontSize={"xl"}>{nickname}</Heading>
              <HStack>
                <Text fontSize={"xs"}>
                  {date}
                  {edited ? "(수정됨)" : null}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack spacing={0} gap={2}>
            <Text fontSize={"sm"} color={"gray"} onClick={onEditClick}>
              수정
            </Text>
            <Text fontSize={"sm"} color={"gray"} onClick={onDeleteClick}>
              삭제
            </Text>
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
              <Box>
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
              </Box>
              <Box w={"50%"}>
                {newGuestBookImg ? (
                  <HStack>
                    <Box h={"10"} w={"10"}>
                      <Image src={newGuestBookImg} alt="newGBImg" />
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
                  colorScheme={colorTheme}
                  variant={"ghost"}
                >
                  취소
                </Button>
                <Button colorScheme={colorTheme} onClick={onUpdateButtonClick}>
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
            {guestBookImg !== "" ? (
              <Image src={guestBookImg} h="auto" rounded={"3xl"} alt="GBIMG" />
            ) : null}
          </VStack>
        )}
      </VStack>
    </>
  );
}
