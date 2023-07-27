import NotesMainPage from "@/components/Notes/NoteMainPage";
import { dbService } from "@/utils/firebase";
import { useMediaQuery } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export interface INotes {
  id: string;
  category: string;
  createdAt: number;
  title: string;
  md: string;
  thumbnailUrl: string;
  description: string;
}

export interface ICategorys {
  id: string;
  category: string;
  createdAt: number;
  size: number;
}

interface INotesCategoryProps {
  params: {
    category: string;
  };
  category: string;
  categoryArr: ICategorys[];
  notesArr: INotes[];
  snapsize: number;
}

interface INoteMainPageMobileProps {
  category: string;
  notesArr: INotes[];
  categoryArr: ICategorys[];
  snapsize: number;
}

export const getStaticPaths = async () => {
  const q = query(
    collection(dbService, "categorys"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  const categoryArr: any = snapshot.docs.map((c) => ({
    category: c.data().category,
  }));

  const paths = [
    ...categoryArr.map((c: any) => ({
      params: { category: c.category },
    })),
    { params: { category: "ALL" } },
  ];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { category } = params;

  //notes
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
  const notesArr: any = snapshot.docs.map((note) => ({
    id: note.id + "",
    title: note.data().title,
    category: note.data().category,
    createdAt: note.data().createdAt,
    thumbnailUrl: note.data().thumbnailUrl,
    description: note.data().description,
  }));

  // category
  const cQ = query(
    collection(dbService, "categorys"),
    orderBy("createdAt", "asc")
  );
  const cSnapshot = await getDocs(cQ);
  const cArr: any = cSnapshot.docs.map((category) => ({
    id: category.id + "",
    ...category.data(),
  }));

  // categorySizes
  const categorySizePromises = cArr.map(async (c: any) => {
    const categorySnapshot = await getDocs(
      query(collection(dbService, "notes"), where("category", "==", c.category))
    );
    return {
      id: c.id,
      category: c.category,
      size: categorySnapshot.size,
      createdAt: c.createdAt,
    };
  });

  //all
  const allQ = query(
    collection(dbService, "notes"),
    orderBy("createdAt", "desc")
  );
  const allSnapshot = await getDocs(allQ);
  const allSnapsize = allSnapshot.size;
  const allCategory = {
    id: "1",
    category: "ALL",
    size: allSnapsize,
    createdAt: 1,
  };

  const categoryArr = await Promise.all([allCategory, ...categorySizePromises]);

  return {
    props: {
      category,
      notesArr,
      snapsize,
      categoryArr,
    },
  };
};

export default function NotesCategory({
  snapsize,
  category,
  categoryArr,
  notesArr,
}: INotesCategoryProps) {
  const [desktopView] = useMediaQuery("(min-width: 767px)", {
    ssr: true,
    fallback: false,
  });
  const [NoteMainPageMobile, setNoteMainPageMobile] =
    useState<React.ComponentType<INoteMainPageMobileProps> | null>(null);

  useEffect(() => {
    import("@/components/Mobile/Notes/NoteMainPageMobile").then((module) => {
      setNoteMainPageMobile(() => module.default);
    });
  }, []);

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
              url: "/op.webp",
              width: 285,
              height: 167,
              alt: "image",
            },
          ],
        }}
      />
      {desktopView ? (
        <NotesMainPage
          category={category}
          notesArr={notesArr}
          categoryArr={categoryArr}
          snapsize={snapsize}
        />
      ) : (
        NoteMainPageMobile && (
          <NoteMainPageMobile
            category={category}
            notesArr={notesArr}
            categoryArr={categoryArr}
            snapsize={snapsize}
          />
        )
      )}
    </>
  );
}
