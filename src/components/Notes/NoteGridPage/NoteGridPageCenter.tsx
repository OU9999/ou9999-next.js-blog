import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

interface INoteGridPageCenterProps {
  currentPage: number;
  totalPages: number;
}
const NoteGridPageCenter = ({
  currentPage,
  totalPages,
}: INoteGridPageCenterProps) => {
  const boxBgColor = useColorModeValue(
    "rgba(243,246,254,1)",
    "rgba(45,55,72,1)"
  );

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={{ sm: "md", md: "lg" }}
      w={"44"}
      h={"12"}
      rounded={"lg"}
      p={3}
      textAlign={"center"}
      fontWeight={"bold"}
      boxShadow={"md"}
      bgColor={boxBgColor}
    >
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
    </Flex>
  );
};

export default NoteGridPageCenter;
