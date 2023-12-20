import {
  Box,
  Center,
  Divider,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import LeftBoxMobile from "./LeftBoxMobile";
import RightBoxMobile from "./RightBoxMobile";
import OtherPostProfileMobile from "./OtherPostProfileMobile";
import { IOtherPostProps } from "@/components/Entry/EntryFooter/OtherPost/OtherPost";
import { useColorTheme } from "@/hooks/useColorTheme";

export interface IBoxProps {
  relativeColor: string;
  bgColor: string;
  title: string;
  id: string;
}

export default function OtherPostMobile({ next, prev }: IOtherPostProps) {
  const { relativeColor } = useColorTheme();
  const mdBgColor = useColorModeValue("#F9F8FA", "rgba(45,55,72,1)");
  return (
    <>
      <Center w="full" h={"auto"} pt={44}>
        <Center w="full" h="auto" flexDir={"column"}>
          <VStack w="full" h="auto" pb={10} px={5} gap={2}>
            <Box w="full">
              {prev && (
                <LeftBoxMobile
                  relativeColor={relativeColor}
                  bgColor={mdBgColor}
                  title={prev.title!}
                  id={prev.id!}
                />
              )}
            </Box>
            <Box w="full">
              {next && (
                <RightBoxMobile
                  relativeColor={relativeColor}
                  bgColor={mdBgColor}
                  title={next.title!}
                  id={next.id!}
                />
              )}
            </Box>
          </VStack>
          <OtherPostProfileMobile />
          <Divider />
        </Center>
      </Center>
    </>
  );
}
