import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

interface IHeaderButtonProps {
  bgColor: string;
  leftIcon: JSX.Element;
  onClose: () => void;
  link: string;
  text: string;
  notes?: boolean;
}

export default function HeaderButton({
  bgColor,
  leftIcon,
  onClose,
  link,
  text,
  notes,
}: IHeaderButtonProps) {
  const router = useRouter();
  const pathname = notes
    ? router.pathname === "/notes/[...slug]" ||
      router.pathname === "/entry/[...slug]"
    : null;
  return (
    <Box w="full" pos={"relative"}>
      <Link href={link} onClick={onClose}>
        <Button w="full" variant={"ghost"}>
          <HStack w="full">
            <Box>{leftIcon}</Box>
            <Text>{text}</Text>
          </HStack>
        </Button>
      </Link>
      {pathname ? (
        <Box
          w="1"
          h="full"
          pos="absolute"
          right={0}
          top={0}
          bgColor={bgColor}
        />
      ) : null}
      {router.pathname === link ? (
        <Box
          w="1"
          h="full"
          pos="absolute"
          right={0}
          top={0}
          bgColor={bgColor}
        />
      ) : null}
    </Box>
  );
}
