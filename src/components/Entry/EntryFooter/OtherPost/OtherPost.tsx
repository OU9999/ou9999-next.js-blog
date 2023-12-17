import { colorThemeAtom } from "@/utils/atoms";
import {
  Box,
  Center,
  Divider,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { returnColors } from "@/utils/utilFn";
import { useState } from "react";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import OtherPostProfile from "./OtherPostProfile";
import { INotesArr } from "@/firebase/firebaseTypes";

export interface IBoxProps {
  relativeColor: string;
  bgColor: string;
  title: string;
  id: string;
}

export interface IOtherPostProps {
  next: INotesArr | null;
  prev: INotesArr | null;
}

export default function OtherPost({ next, prev }: IOtherPostProps) {
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
