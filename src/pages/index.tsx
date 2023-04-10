import { NextSeo } from "next-seo";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MainScroll from "@/components/Home/MainScroll";

export default function Home() {
  const [desktopView] = useMediaQuery("(min-width: 768px)", {
    ssr: true,
    fallback: false,
  });
  const [MainPageMobile, setMainPageMobile] =
    useState<React.ComponentType | null>(null);

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
              url: "/op.png",
              width: 285,
              height: 167,
              alt: "image",
            },
          ],
        }}
      />

      {desktopView ? <MainScroll /> : MainPageMobile && <MainPageMobile />}
    </>
  );
}
