import { useColorTheme } from "@/hooks/useColorTheme";
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { isRecaptchaAtom } from "@/utils/atoms";
import CommentRecaptcha from "../Entry/EntryFooter/Comment/CommentReCAPTCHA";

interface ICheckRecaptchaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckRecaptchaModal = ({
  isOpen,
  onClose,
}: ICheckRecaptchaModalProps) => {
  //state
  const [isRecap, setIsRecap] = useRecoilState(isRecaptchaAtom);

  //util
  const { colorTheme } = useColorTheme();

  const handleRecaptchaChange = () => {
    setIsRecap(true);
  };

  return (
    <>
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>캡챠 인증</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            한번 통과하면 생략됩니다.
            <Center mt={10}>
              <CommentRecaptcha onChange={handleRecaptchaChange} />
            </Center>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button colorScheme={colorTheme} onClick={onClose} variant="ghost">
              취소
            </Button>
            <Button
              colorScheme={colorTheme}
              onClick={onClose}
              isDisabled={!isRecap}
            >
              계속
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckRecaptchaModal;
