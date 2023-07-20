import GuestBookMainPage from "@/components/GuestBook/GuestBookMainPage";
import { useMediaQuery } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export default function GuestBook() {
  const [desktopView] = useMediaQuery("(min-width: 767px)", {
    ssr: true,
    fallback: false,
  });
  const [GuestBookMainPageMobile, setGuestBookMainPageMobile] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    import("@/components/Mobile/GuestBook/GuestBookMainPageMobile").then(
      (module) => {
        setGuestBookMainPageMobile(() => module.default);
      }
    );
  }, []);

  return (
    <>
      <NextSeo
        title="GuestBook | OU9999's First Blog"
        description="GuestBook! | OU9999's First Blog"
        openGraph={{
          type: "website",
          url: "no",
          title: "OU9999",
          description: "GuestBook! | OU9999's First Blog",
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
      {desktopView ? (
        <GuestBookMainPage />
      ) : (
        GuestBookMainPageMobile && <GuestBookMainPageMobile />
      )}
    </>
  );
}
