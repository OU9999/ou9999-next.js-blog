import GuestBookMainPage from "@/components/GuestBook/GuestBookMainPage";
import GuestBookMainPageMobile from "@/components/Mobile/GuestBook/GuestBookMainPageMobile";
import { useMediaQuery } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

export default function GuestBook() {
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
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
      {mobileView ? <GuestBookMainPageMobile /> : <GuestBookMainPage />}
    </>
  );
}
