import { dbService, storageService } from "@/utils/firebase";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { useRef, useState } from "react";
import {
  FaLock,
  FaRegComments,
  FaUser,
  FaUserAstronaut,
  FaUserGraduate,
  FaUserInjured,
  FaUserMd,
  FaUserNinja,
  FaUserSecret,
  FaUserTie,
} from "react-icons/fa";
import { HiPhoto } from "react-icons/hi2";
import { useRecoilValue } from "recoil";
import { colorThemeAtom } from "@/utils/atoms";

export const userIcons = [
  {
    string: "normal",
    icon: <FaUser fontSize={"1.7rem"} />,
  },
  {
    string: "ninja",
    icon: <FaUserNinja fontSize={"1.7rem"} />,
  },
  {
    string: "secret",
    icon: <FaUserSecret fontSize={"1.7rem"} />,
  },
  {
    string: "tie",
    icon: <FaUserTie fontSize={"1.7rem"} />,
  },
  {
    string: "md",
    icon: <FaUserMd fontSize={"1.7rem"} />,
  },
  {
    string: "graduate",
    icon: <FaUserGraduate fontSize={"1.7rem"} />,
  },
  {
    string: "injured",
    icon: <FaUserInjured fontSize={"1.7rem"} />,
  },
  {
    string: "astronaut",
    icon: <FaUserAstronaut fontSize={"1.7rem"} />,
  },
];

export default function GBInputMobile() {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [userIcon, setUserIcon] = useState<any>(userIcons[0]);
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [userIconPic, setUserIconPic] = useState<string | undefined>(undefined);
  const [guestBookImg, setGuestBookImg] = useState<string | undefined>(
    undefined
  );

  const bgColor = useColorModeValue("white", "#1A202C");
  const inputBgColor = useColorModeValue("#fff", "#2D3748");
  const toast = useToast();
  const userIconPicInput = useRef<HTMLInputElement>(null);
  const guestBookImgInput = useRef<HTMLInputElement>(null);

  const onUserIconPicButtonClicked = (e: any) => {
    userIconPicInput?.current?.click();
  };
  const onGuestBookImgButtonClicked = (e: any) => {
    guestBookImgInput?.current?.click();
  };

  const onUserIconPicFileChange = ({
    currentTarget: { files },
  }: React.FormEvent<HTMLInputElement>) => {
    if (files) {
      const uploadFile = files![0];
      const reader = new FileReader();
      reader.onloadend = (finishEvent) => {
        setUserIconPic(finishEvent.target?.result as string);
      };
      reader.readAsDataURL(uploadFile);
    }
    console.log(files);
  };

  const onGuestBookImgFileChange = ({
    currentTarget: { files },
  }: React.FormEvent<HTMLInputElement>) => {
    if (files) {
      const uploadFile = files![0];
      const reader = new FileReader();
      reader.onloadend = (finishEvent) => {
        setGuestBookImg(finishEvent.target?.result as string);
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  const onClearGuestBookImgButtonClicked = (e: any) => {
    setGuestBookImg(undefined);
  };

  const onAddButtonClicked = async () => {
    if (nickname === "" || password === "" || comment === "") {
      toast({
        title: "빈칸이 있습니다.",
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (nickname.length > 10) {
      toast({
        title: `닉네임이 너무 깁니다..( ${nickname.length} / 10 )`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (comment.length > 500) {
      toast({
        title: `방명록이 너무 깁니다..( ${comment.length} / 500 )`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const userIconPicRef = ref(storageService, `guestBooks/icons/${uuidv4()}`);
    const guestBookImgRef = ref(storageService, `guestBooks/imgs/${uuidv4()}`);
    let getUserIconPicUrl = "";
    let getGuestBookImgUrl = "";

    if (userIconPic) {
      const response = await uploadString(
        userIconPicRef,
        userIconPic as string,
        "data_url"
      );
      getUserIconPicUrl = await getDownloadURL(response.ref);
    }

    if (guestBookImg) {
      const response = await uploadString(
        guestBookImgRef,
        guestBookImg as string,
        "data_url"
      );
      getGuestBookImgUrl = await getDownloadURL(response.ref);
    }

    await addDoc(collection(dbService, "guestBooks"), {
      avatar: userIcon.string,
      nickname: nickname,
      password: password,
      comment: comment,
      createdAt: Date.now(),
      edited: false,
      userIconPic: getUserIconPicUrl,
      guestBookImg: getGuestBookImgUrl,
    });
    setUserIcon(userIcons[0]);
    setNickname("");
    setPassword("");
    setComment("");
    setUserIconPic(undefined);
    setGuestBookImg(undefined);
    toast({
      title: "방명록 작성 완료!",
      position: "top",
      isClosable: true,
    });
  };

  return (
    <>
      <Box bgColor={bgColor} w={"full"} mt={"5"} mb={"20"}>
        <Center w={"full"}>
          <VStack w={"full"} px={2}>
            <Box fontSize={"7xl"} my={"10"}>
              <FaRegComments />
            </Box>
            <VStack
              alignItems={"flex-start"}
              w={"full"}
              h={"md"}
              rounded={"2xl"}
              boxShadow={"dark-lg"}
              boxSizing="border-box"
              position={"relative"}
              p={5}
              gap={3}
              bgColor={inputBgColor}
            >
              <HStack width={"100%"} p={5} gap={3}>
                {userIconPic ? (
                  <Box>
                    <Avatar
                      src={userIconPic}
                      cursor={"pointer"}
                      onClick={onUserIconPicButtonClicked}
                    />
                  </Box>
                ) : (
                  <Avatar
                    icon={userIcon.icon}
                    onClick={onUserIconPicButtonClicked}
                    cursor={"pointer"}
                  />
                )}
                <input
                  type="file"
                  onChange={onUserIconPicFileChange}
                  accept="image/*"
                  ref={userIconPicInput}
                  style={{ display: "none" }}
                />

                <HStack>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaUser color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="닉네임"
                      variant="filled"
                      value={nickname}
                      onChange={(e) => setNickname(e.currentTarget.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaLock color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      placeholder="비밀번호"
                      variant="filled"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </InputGroup>
                </HStack>
              </HStack>
              <Textarea
                alignItems={"flex-start"}
                placeholder="방명록 작성란..."
                height={"30vh"}
                variant={"filled"}
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
              />

              <Flex width={"full"} justifyContent={"flex-end"}>
                <HStack w={"50%"} gap={4}>
                  <HStack>
                    <Box>
                      <IconButton
                        aria-label="ImgUpload"
                        onClick={onGuestBookImgButtonClicked}
                      >
                        <HiPhoto />
                      </IconButton>
                      <input
                        type="file"
                        onChange={onGuestBookImgFileChange}
                        accept="image/*"
                        ref={guestBookImgInput}
                        style={{ display: "none" }}
                      />
                    </Box>
                  </HStack>
                  {guestBookImg ? (
                    <HStack alignItems={"center"}>
                      <Box h={"10"} w={"10"}>
                        <Image src={guestBookImg} alt="guestBookImg" />
                      </Box>
                      <Button
                        size={"sm"}
                        onClick={onClearGuestBookImgButtonClicked}
                      >
                        삭제
                      </Button>
                    </HStack>
                  ) : null}
                </HStack>
                <Flex w={"50%"} justifyContent={"flex-end"} gap={3}>
                  <Button colorScheme={colorTheme} onClick={onAddButtonClicked}>
                    방명록 작성
                  </Button>
                </Flex>
              </Flex>
            </VStack>
          </VStack>
        </Center>
      </Box>
    </>
  );
}
