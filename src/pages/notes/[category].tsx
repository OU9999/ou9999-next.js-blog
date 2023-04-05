import NoteMainPageMobile from "@/components/Mobile/Notes/NoteMainPageMobile";
import NotesMainPage from "@/components/Notes/NoteMainPage";
import { dbService } from "@/utils/firebase";
import { useMediaQuery } from "@chakra-ui/react";
import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export interface INotes {
  id: string;
  category: string;
  createdAt: number;
  title: string;
  md: string;
  thumbnailUrl: string;
}

export interface ICategorys {
  id: string;
  category: string;
  createdAt: number;
}

export const allCategory: ICategorys = {
  id: "1",
  category: "ALL",
  createdAt: 1,
};

interface INotesCategoryProps {
  params: {
    category: string;
  };
  category: string;
  notes: INotes[];
}

export const getServerSideProps = async ({ params }: any) => {
  const { category } = params;
  // let q;
  // if (category === "ALL") {
  //   q = query(collection(dbService, "notes"), orderBy("createdAt", "desc"));
  // } else {
  //   q = query(
  //     collection(dbService, "notes"),
  //     where("category", "==", category),
  //     orderBy("createdAt", "desc")
  //   );
  // }

  // const snapshot = await getDocs(q);
  // const notesArr = snapshot.docs.map((note) => ({
  //   id: note.id + "",
  //   ...note.data(),
  // }));
  return {
    props: { category },
  };
};

export default function NotesCategory({ category }: INotesCategoryProps) {
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  return (
    <>
      <NextSeo
        title="Notes | OU9999's First Blog"
        description="Notes! | OU9999's First Blog"
        openGraph={{
          type: "website",
          url: "no",
          title: "OU9999",
          description: "Notes! | OU9999's First Blog",
          images: [
            {
              url: "/op.png",
              width: 285,
              height: 167,
              alt: "image",
            },
          ],
        }}
      />
      {mobileView ? (
        <NoteMainPageMobile category={category} />
      ) : (
        <NotesMainPage category={category} />
      )}
    </>
  );
}
