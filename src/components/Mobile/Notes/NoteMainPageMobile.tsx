import { Divider, VStack } from "@chakra-ui/react";
import NoteCategorySelectorMobile from "./NoteCategorySelectorMobile";
import dynamic from "next/dynamic";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import LoadingGridMobile from "./LoadingGridMobile";
import { dbService } from "@/utils/firebase";
import { useEffect, useState } from "react";

interface INotesMainPageProps {
  category: string;
}

const NoteGridMobile = dynamic(() => import("./NoteGridMobile"), {
  loading: () => <LoadingGridMobile />,
  ssr: false,
});

export default function NoteMainPageMobile({ category }: INotesMainPageProps) {
  const [size, setSize] = useState(0);
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
    <>
      <VStack
        w="100vw"
        h="auto"
        justifyContent={"flex-start"}
        position={"relative"}
        overflow={"hidden"}
      >
        <VStack position={"relative"} w="full">
          <NoteCategorySelectorMobile category={category} />
          <VStack px={10} gap={10} w="full">
            <NoteGridMobile category={category} size={size} />
          </VStack>
          <Divider py={3} />
        </VStack>
      </VStack>
    </>
  );
}
