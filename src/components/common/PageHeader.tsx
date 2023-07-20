import { colorThemeAtom } from "@/utils/atoms";
import { returnColors } from "@/utils/utilFn";
import { Center, Heading, Box, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface IPageHeaderProps {
  title?: string;
  subText?: string;
  bgImg?: string;
}

export default function PageHeader({
  title,
  subText,
  bgImg,
}: IPageHeaderProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
  }, [colorTheme]);

  return (
    <>
      <Box
        w="100vw"
        h="40vh"
        maxH={"400px"}
        position={"absolute"}
        zIndex={-1}
        backgroundRepeat="no-repeat"
        backgroundAttachment={"fixed"}
        backgroundSize="cover"
        backgroundPosition={"center center"}
        backgroundImage={bgImg}
      />
      <Box
        w="100vw"
        h="40vh"
        maxH={"400px"}
        position={"absolute"}
        zIndex={1}
        top={-2}
        background={
          "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
        }
        backgroundSize="10px 10px"
        opacity={0.3}
      />
      <Center h={"40vh"} maxH={"400px"} color="white" zIndex={2}>
        <VStack gap={4}>
          <Heading textShadow={`3px 3px ${lightColor}`} fontSize={"7xl"}>
            {title}
          </Heading>
          {subText && (
            <>
              <Text
                textShadow={"#000 1px 0 10px"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {subText}
              </Text>
            </>
          )}
        </VStack>
      </Center>
    </>
  );
}
