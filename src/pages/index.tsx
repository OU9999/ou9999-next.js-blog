import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MainScroll from "@/components/Home/MainScroll";
import { fetchNotesArr } from "@/firebase/firebaseUtil";
import { INote } from "@/firebase/firebaseTypes";
import BlogSEO from "@/components/common/BlogSEO";

interface IHomeProps {
  notesArr: INote[];
}

export default function Home({ notesArr }: IHomeProps) {
  const [desktopView] = useMediaQuery("(min-width: 767px)", {
    ssr: true,
    fallback: false,
  });
  const [MainPageMobile, setMainPageMobile] =
    useState<React.ComponentType<IHomeProps> | null>(null);

  useEffect(() => {
    import("@/components/Mobile/Home/MainPageMobile").then((module) => {
      setMainPageMobile(() => module.default);
    });
  }, []);

  return (
    <>
      <BlogSEO
        title="OU9999's First Blog"
        description="OU9999 First Blog!"
        image="/op.webp"
        main
      />

      {desktopView ? (
        <MainScroll notesArr={notesArr!} />
      ) : (
        MainPageMobile && <MainPageMobile notesArr={notesArr} />
      )}
    </>
  );
}

export const getStaticProps = async () => {
  const { notesArr } = await fetchNotesArr("ALL");

  return {
    props: {
      notesArr,
    },
  };
};
