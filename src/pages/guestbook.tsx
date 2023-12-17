import GuestBookMainPage from "@/components/GuestBook/GuestBookMainPage";
import BlogSEO from "@/components/common/BlogSEO";
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
      <BlogSEO title="GuestBook" description="GuestBook!" image="/op.webp" />
      {desktopView ? (
        <GuestBookMainPage />
      ) : (
        GuestBookMainPageMobile && <GuestBookMainPageMobile />
      )}
    </>
  );
}
