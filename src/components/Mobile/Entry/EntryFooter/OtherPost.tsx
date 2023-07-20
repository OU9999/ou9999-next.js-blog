import { returnUrlTitle } from "@/utils/utilFn";
import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { BsDot } from "react-icons/bs";

interface IOtherPostProps {
  title: string;
  docId: string;
}
export default function OtherPost({ title, docId }: IOtherPostProps) {
  const urlTitle = returnUrlTitle(title);
  return (
    <>
      <Link href={`/entry/${urlTitle}/${docId}`}>
        <HStack spacing={0}>
          <BsDot />
          <Text as="u" color={"white"} noOfLines={1}>
            {title}
          </Text>
        </HStack>
      </Link>
    </>
  );
}
