import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { dbService } from "../../../../firebase/firebase";
import { colorThemeAtom } from "@/utils/atoms";
import { useRecoilValue } from "recoil";

interface ICommentDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  commentId: string;
  password: string;
  isReply?: boolean;
  refetchFn: () => void;
}

export default function CommentDeleteModal({
  isOpen,
  onClose,
  commentId,
  password,
  isReply,
  refetchFn,
}: ICommentDeleteModalProps) {
  //state
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [checkPassword, setCheckPassword] = useState("");

  //util
  const toast = useToast();

  const onDeleteClick = async () => {
    if (password !== checkPassword) {
      toast({
        title: "비밀번호가 틀립니다",
        position: "top",
        isClosable: true,
        status: "error",
      });
      return;
    }

    let commentsRef = null;
    if (isReply) {
      commentsRef = doc(dbService, "replyComments", commentId!);
    } else {
      commentsRef = doc(dbService, "comments", commentId!);
    }

    await deleteDoc(commentsRef);
    toast({
      title: "삭제 완료!",
      position: "top",
      isClosable: true,
    });
    onClose();
    refetchFn();
  };

  return (
    <>
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>댓글 삭제</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack alignItems={"flex-start"}>
              <Text>비밀번호 확인</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaLock color="gray.300" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="비밀번호"
                  variant="filled"
                  value={checkPassword}
                  onChange={(e) => setCheckPassword(e.currentTarget.value)}
                />
              </InputGroup>
            </VStack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button colorScheme={colorTheme} onClick={onClose} variant="ghost">
              취소
            </Button>
            <Button colorScheme={colorTheme} mr={3} onClick={onDeleteClick}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
