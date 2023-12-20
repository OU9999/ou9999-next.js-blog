import {
  Box,
  Center,
  Divider,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import OtherPostProfile from "./OtherPostProfile";
import { INote } from "@/firebase/firebaseTypes";
import { useColorTheme } from "@/hooks/useColorTheme";

export interface IBoxProps {
  relativeColor: string;
  bgColor: string;
  title: string;
  id: string;
}

export interface IOtherPostProps {
  next: INote | null;
  prev: INote | null;
}

export default function OtherPost({ next, prev }: IOtherPostProps) {
  const { relativeColor } = useColorTheme();
  const mdBgColor = useColorModeValue("#F9F8FA", "rgba(45,55,72,1)");

  return (
    <>
      <Center w="full" h={"auto"} pt={44}>
        <Center w="55vw" h="auto" flexDir={"column"}>
          <HStack w="full" h="auto" gap={14} pb={10}>
            <Box w="50%">
              {prev && (
                <LeftBox
                  relativeColor={relativeColor}
                  bgColor={mdBgColor}
                  title={prev.title!}
                  id={prev.id!}
                />
              )}
            </Box>
            <Box w="50%">
              {next && (
                <RightBox
                  relativeColor={relativeColor}
                  bgColor={mdBgColor}
                  title={next.title!}
                  id={next.id!}
                />
              )}
            </Box>
          </HStack>

          <OtherPostProfile />
          <Divider />
        </Center>
      </Center>
    </>
  );
}
