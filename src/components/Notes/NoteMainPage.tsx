import { colorThemeAtom } from "@/utils/atoms";
import { returnColors } from "@/utils/utilFn";
import { Center, Heading, VStack, Box, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";
import LoadingGrid from "./LoadingGrid";

const NoteCategorySelector = dynamic(() => import("./NoteCategorySelector"), {
  ssr: false,
});

const NoteGridPage = dynamic(() => import("./NoteGridPage"), {
  loading: () => <LoadingGrid />,
  ssr: false,
});

interface INotesMainPageProps {
  category: string;
  size: number;
}

function NotesMainPageContent({ category, size }: INotesMainPageProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
  }, [colorTheme]);

  return (
    <VStack h="auto" justifyContent={"flex-start"} position={"relative"}>
      <Box
        w="100vw"
        h="40vh"
        position={"absolute"}
        zIndex={-1}
        backgroundRepeat="no-repeat"
        backgroundAttachment={"fixed"}
        backgroundSize="cover"
        backgroundPosition={"center center"}
        backgroundImage="/assets/imgs/main/miles.jpeg"
      />
      <Box
        w="100vw"
        h="40vh"
        position={"absolute"}
        zIndex={1}
        top={-2}
        background={
          "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
        }
        backgroundSize="10px 10px"
        opacity={0.3}
      />
      <Center minH={"40vh"} color="white" zIndex={2}>
        <Heading textShadow={`3px 3px ${lightColor}`} fontSize={"7xl"}>
          Notes
        </Heading>
      </Center>
      <VStack position={"relative"}>
        <NoteCategorySelector category={category} />
        <NoteGridPage category={category} size={size} />
        <Divider py={3} />
      </VStack>
    </VStack>
  );
}

export default function NotesMainPage({ category, size }: INotesMainPageProps) {
  return (
    <React.Suspense
      fallback={
        <Box
          w="100vw"
          h="40vh"
          position={"absolute"}
          zIndex={1}
          top={-2}
          background={
            "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
          }
          backgroundSize="10px 10px"
          opacity={0.3}
        />
      }
    >
      <NotesMainPageContent category={category} size={size} />
    </React.Suspense>
  );
}
