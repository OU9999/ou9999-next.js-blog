import GuestBookMainPage from "@/components/GuestBook/GuestBookMainPage";
import BlogSEO from "@/components/common/BlogSEO";
import { useDevicehook } from "@/hooks/useDevicehook";
import { useEffect, useState } from "react";

export default function GuestBook() {
  //state
  const [GuestBookMainPageMobile, setGuestBookMainPageMobile] =
    useState<React.ComponentType | null>(null);

  //util
  const { isDesktopView } = useDevicehook();

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
      {isDesktopView ? (
        <GuestBookMainPage />
      ) : (
        GuestBookMainPageMobile && <GuestBookMainPageMobile />
      )}
    </>
  );
}
