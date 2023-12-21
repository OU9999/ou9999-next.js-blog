import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

type ButtonType = "prev" | "next";

interface INoteGridPageButtonProps {
  type: ButtonType;
  icon: JSX.Element;
  text: string;
  category: string;
  pageParam: number;
  isDisabled: boolean;
}

const NoteGridPageButton = ({
  type,
  icon,
  text,
  category,
  pageParam,
  isDisabled,
}: INoteGridPageButtonProps) => {
  const isNext = type === "next" ? true : false;
  const boxBgColor = useColorModeValue(
    "rgba(243,246,254,1)",
    "rgba(45,55,72,1)"
  );

  return (
    <Link href={`/notes/${category}/${pageParam}`}>
      <Button
        flexDir={isNext ? "row-reverse" : "row"}
        justifyContent={"center"}
        fontSize={"lg"}
        w={{ sm: "10", md: "44" }}
        h={"12"}
        rounded={"lg"}
        p={3}
        textAlign={"center"}
        fontWeight={"bold"}
        boxShadow={"md"}
        bgColor={boxBgColor}
        isDisabled={isDisabled}
      >
        <Box pos={"relative"} top={"0.3px"}>
          {icon}
        </Box>
        <Text hideBelow={"md"}>{text}</Text>
      </Button>
    </Link>
  );
};

export default NoteGridPageButton;
