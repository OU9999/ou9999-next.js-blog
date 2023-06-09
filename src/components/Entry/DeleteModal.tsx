import { colorThemeAtom } from "@/utils/atoms";
import { dbService, storageService } from "@/utils/firebase";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  thumbnailUrl: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  id,
  thumbnailUrl,
}: ILoginModalProps) {
  const router = useRouter();
  const toast = useToast();
  const colorTheme = useRecoilValue(colorThemeAtom);

  const onDeleteClick = async () => {
    await deleteDoc(doc(dbService, "notes", id));
    if (thumbnailUrl !== "") {
      await deleteObject(ref(storageService, thumbnailUrl));
    }
    toast({
      title: "삭제 완료!",
      position: "top",
      isClosable: true,
    });
    onClose();
    router.push("/notes/ALL");
  };

  return (
    <>
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>노트 삭제</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>정말로 삭제하시겠습니까?</ModalBody>
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
