import { colorThemeAtom } from "@/utils/atoms";
import { returnColors } from "@/utils/utilFn";
import { Center, Heading, VStack, Box, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";
import LoadingGrid from "./LoadingGrid";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dbService } from "@/utils/firebase";

const NoteCategorySelector = dynamic(() => import("./NoteCategorySelector"), {
  ssr: false,
});

const NoteGridPage = dynamic(() => import("./NoteGridPage"), {
  loading: () => <LoadingGrid />,
  ssr: false,
});

interface INotesMainPageProps {
  category: string;
}

export default function NotesMainPage({ category }: INotesMainPageProps) {
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [size, setSize] = useState(0);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
  }, [colorTheme]);

  const getSize = async (category: string) => {
    let q;
    if (category === "ALL") {
      q = query(collection(dbService, "notes"), orderBy("createdAt", "desc"));
    } else {
      q = query(
        collection(dbService, "notes"),
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );
    }
    const snapshot = await getDocs(q);
    const snapsize = snapshot.size;
    setSize(snapsize);
  };

  useEffect(() => {
    getSize(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

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
