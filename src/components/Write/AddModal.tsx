import { dbService, storageService } from "@/firebase/firebase";
import { ICategory } from "@/firebase/firebaseTypes";
import { fetchCategory } from "@/firebase/firebaseUtil";
import { useColorTheme } from "@/hooks/useColorTheme";
import { returnDescription } from "@/utils/utilFn";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaImage } from "react-icons/fa";

interface IAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  bgColor: string;
  title: string;
  md: string;
  thumbnailUrl?: string;
  defaultCategory?: string;
  docId?: string;
  isEdit?: boolean;
}

export default function AddModal({
  isOpen,
  onClose,
  bgColor,
  title,
  md,
  thumbnailUrl,
  defaultCategory,
  docId,
  isEdit,
}: IAddModalProps) {
  //state
  const [thumbnail, setThumbnail] = useState<string | undefined>(thumbnailUrl);
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    defaultCategory
  );

  //util
  const { colorTheme, relativeColor } = useColorTheme();
  const router = useRouter();
  const thumbnailInput = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const description = returnDescription(md);

  const getCategorys = async () => {
    const data = await fetchCategory("snapshot");
    setCategorys(data);
  };

  useEffect(() => {
    getCategorys();
  }, []);

  const onThumbnailButtonClicked = (e: any) => {
    thumbnailInput?.current?.click();
  };

  const onClearThumbnailButtonClicked = (e: any) => {
    setThumbnail(undefined);
  };

  const onNewCategoryButtonClicked = async () => {
    let errorState = false;
    // eslint-disable-next-line array-callback-return
    categorys.map((category) => {
      if (category.category === newCategory) {
        toast({
          title: "이미 있는 카테고리입니다.",
          position: "top",
          isClosable: true,
          status: "error",
        });
        errorState = true;
      }
    });

    if (errorState) {
    } else {
      await addDoc(collection(dbService, "categorys"), {
        category: newCategory,
        createdAt: Date.now(),
      });
    }
    setNewCategory("");
  };

  const onFileChange = ({
    currentTarget: { files },
  }: React.FormEvent<HTMLInputElement>) => {
    if (files) {
      const uploadFile = files![0];
      const reader = new FileReader();
      reader.onloadend = (finishEvent) => {
        setThumbnail(finishEvent.target?.result as string);
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  const onAddButtonClick = async () => {
    if (selectedCategory === undefined || selectedCategory === "") {
      toast({
        title: "카테고리를 설정해주세요!",
        position: "top",
        isClosable: true,
        status: "error",
      });
      return;
    }
    const thumbnailRef = ref(storageService, `notes/${uuidv4()}`);
    let getThumbnailUrl = "";
    if (thumbnail) {
      const response = await uploadString(
        thumbnailRef,
        thumbnail as string,
        "data_url"
      );
      getThumbnailUrl = await getDownloadURL(response.ref);
    }
    await addDoc(collection(dbService, "notes"), {
      md: md,
      title: title,
      category: selectedCategory,
      createdAt: Date.now(),
      thumbnailUrl: getThumbnailUrl,
      description: description,
    });
    setThumbnail(undefined);
    setSelectedCategory(undefined);
    onClose();
    router.push(`/notes/${selectedCategory}/1`);
    toast({
      title: "노트작성 완료!",
      position: "top",
      isClosable: true,
    });
  };

  const onUpdateButtonClick = async (docId: string) => {
    const notesRef = doc(dbService, "notes", docId);
    const thumbnailRef = ref(storageService, `notes/${uuidv4()}`);
    let getThumbnailUrl = "";
    if (thumbnail) {
      if (thumbnail.includes("https:")) {
        await updateDoc(notesRef, {
          md: md,
          title: title,
          category: selectedCategory,
          description: description,
        });
        onClose();
        toast({
          title: "노트 업데이트 완료!",
          position: "top",
          isClosable: true,
        });
        router.push(`/notes/${selectedCategory}/1`);
        return;
      }
      const response = await uploadString(
        thumbnailRef,
        thumbnail as string,
        "data_url"
      );
      getThumbnailUrl = await getDownloadURL(response.ref);
    }
    await updateDoc(notesRef, {
      md: md,
      title: title,
      category: selectedCategory,
      thumbnailUrl: getThumbnailUrl,
      description: description,
    });
    toast({
      title: "노트 업데이트 완료!",
      position: "top",
      isClosable: true,
    });
    router.push(`/notes/${selectedCategory}/1`);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>노트 미리보기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack width={"full"}>
              {thumbnail && (
                <>
                  <HStack width={"full"} justifyContent={"flex-end"}>
                    <Box>
                      <Link
                        color={relativeColor}
                        onClick={onThumbnailButtonClicked}
                      >
                        재업로드
                      </Link>
                      <input
                        type="file"
                        onChange={onFileChange}
                        accept="image/*"
                        ref={thumbnailInput}
                        style={{ display: "none" }}
                      />
                    </Box>
                    <Link
                      color={relativeColor}
                      onClick={onClearThumbnailButtonClicked}
                    >
                      제거
                    </Link>
                  </HStack>
                </>
              )}

              <Flex
                flexDir={"column"}
                width="full"
                height={"48"}
                bgColor={bgColor}
                justifyContent="center"
                alignItems={"center"}
                gap={3}
                bgImage={thumbnail ? thumbnail : undefined}
                bgSize={"cover"}
              >
                {!thumbnail ? (
                  <>
                    <Box fontSize={"5xl"}>
                      <FaImage />
                    </Box>
                    <Box>
                      <Button
                        colorScheme={colorTheme}
                        onClick={onThumbnailButtonClicked}
                      >
                        썸네일 업로드
                      </Button>
                      <input
                        type="file"
                        onChange={onFileChange}
                        accept="image/*"
                        ref={thumbnailInput}
                        style={{ display: "none" }}
                      />
                    </Box>
                  </>
                ) : undefined}
              </Flex>
              <Text width={"full"} fontWeight="bold" fontSize={"2xl"}>
                {title}
              </Text>
              <Text
                width={"full"}
                border="1px solid"
                noOfLines={4}
                bgColor={bgColor}
                px={4}
                py={2}
                rounded="lg"
              >
                {description}
              </Text>
              <Divider />
            </VStack>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    카테고리 선택
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack>
                    <HStack width={"full"}>
                      <InputGroup>
                        <Input
                          placeholder="새 카테고리 추가"
                          variant={"filled"}
                          type={"email"}
                          value={newCategory}
                          onChange={(e) =>
                            setNewCategory(e.currentTarget.value)
                          }
                        />
                      </InputGroup>
                      <IconButton
                        icon={<BiPlus />}
                        aria-label="add"
                        onClick={onNewCategoryButtonClicked}
                      />
                    </HStack>
                    <Select
                      placeholder="카테고리를 선택해주세요!"
                      defaultValue={defaultCategory}
                      onChange={(e) =>
                        setSelectedCategory(e.currentTarget.value)
                      }
                    >
                      {categorys.map((category) => (
                        <>
                          <option value={category.category}>
                            {category.category}
                          </option>
                        </>
                      ))}
                    </Select>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={colorTheme}
              mr={3}
              onClick={onClose}
              variant="ghost"
            >
              취소
            </Button>
            {isEdit ? (
              <Button
                colorScheme={colorTheme}
                onClick={() => onUpdateButtonClick(docId!)}
              >
                업데이트
              </Button>
            ) : (
              <Button colorScheme={colorTheme} onClick={onAddButtonClick}>
                노트작성
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
