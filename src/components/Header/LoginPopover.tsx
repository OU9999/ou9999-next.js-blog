import { isLoginAtom } from "@/utils/atoms";
import { authService } from "@/firebase/firebase";
import {
  Avatar,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiFirebase } from "react-icons/si";
import { useSetRecoilState } from "recoil";

export default function LoginPopover() {
  const { onClose, isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  const setIsLogin = useSetRecoilState(isLoginAtom);

  const onLogOutClick = () => {
    authService.signOut();
    toast({
      title: "로그아웃!",
      position: "top",
      isClosable: true,
    });
  };

  return (
    <>
      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onClose={onClose}
        closeOnBlur={false}
        returnFocusOnClose={false}
      >
        <PopoverTrigger>
          <Avatar
            zIndex={99}
            size="md"
            name="OU9999"
            src={`/assets/imgs/icon/profile.webp`}
            cursor="pointer"
            onClick={onToggle}
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            marginTop={6}
            boxShadow={"dark-lg"}
            zIndex={"popover"}
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <VStack>
                <Avatar
                  size="2xl"
                  name="Ryan Florence"
                  src={`/assets/imgs/icon/profile.webp`}
                  cursor="pointer"
                />
                <VStack spacing={-1}>
                  <Text fontWeight={"bold"} fontSize={"2xl"}>
                    오유진
                  </Text>
                  <HStack
                    spacing={0.5}
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    <FaGithub />
                    <Text color={"gray"}>OU9999</Text>
                  </HStack>
                </VStack>
              </VStack>
            </PopoverBody>
            <PopoverFooter
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <HStack>
                <Link
                  href="https://console.firebase.google.com/u/0/project/ou9999-first-blog/overview?hl=ko"
                  target="_blank"
                >
                  <Button
                    colorScheme={"twitter"}
                    leftIcon={<SiFirebase />}
                    variant={"outline"}
                  >
                    Firebase
                  </Button>
                </Link>

                <Button colorScheme={"twitter"} onClick={() => onLogOutClick()}>
                  Logout
                </Button>
              </HStack>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}
