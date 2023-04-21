import { colorThemeAtom } from "@/utils/atoms";
import {
  Box,
  Center,
  Divider,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { returnColors } from "@/utils/utilFn";
import { useState } from "react";
import { INextPrev } from "../../EntryFooterMobile";
import LeftBoxMobile from "./LeftBoxMobile";
import RightBoxMobile from "./RightBoxMobile";
import OtherPostProfileMobile from "./OtherPostProfileMobile";

export interface IBoxProps {
  relativeColor: string;
  bgColor: string;
  title: string;
  id: string;
}

interface IOtherPostProps {
  next: INextPrev | null;
  prev: INextPrev | null;
}

export default function OtherPostMobile({ next, prev }: IOtherPostProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const mdBgColor = useColorModeValue("#F9F8FA", "rgba(45,55,72,1)");
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const relativeColor = useColorModeValue(lightColor, darkColor);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
    setDarkColor(dc);
  }, [colorTheme]);

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
                  title={prev.title}
                  id={prev.id}
                />
              )}
            </Box>
            <Box w="full">
              {next && (
                <RightBoxMobile
                  relativeColor={relativeColor}
                  bgColor={mdBgColor}
                  title={next.title}
                  id={next.id}
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
