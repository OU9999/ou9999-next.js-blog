import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

interface IIntroduceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroduceModal({
  isOpen,
  onClose,
}: IIntroduceModalProps) {
  return (
    <>
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>🛠️ 제작중! 🛠️</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack gap={3}>
              <Text>
                자기소개 페이지는 아직 제작중입니다. 금방 멋지게 만들게요!!
              </Text>
              <Image
                alt="ddabbong"
                src={"/assets/imgs/icon/thumbs_up.gif"}
                width={400}
                height={300}
                style={{
                  objectFit: "cover",
                }}
                placeholder="blur"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
              />
            </VStack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button onClick={onClose}>알겠어요!</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
