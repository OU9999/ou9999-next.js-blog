import { NextSeo } from "next-seo";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MainScroll from "@/components/Home/MainScroll";
import { fetchNotesArr } from "@/utils/firebaseUtil";
import { INotesArr } from "@/utils/firebaseTypes";

interface IHomeProps {
  notesArr: INotesArr[];
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
      <NextSeo
        title="OU9999's First Blog"
        description="OU9999 First Blog!"
        openGraph={{
          type: "website",
          url: "no",
          title: "OU9999",
          description: "OU9999 First Blog!",
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
