import { NextSeo } from "next-seo";
import MainScroll from "@/components/Home/MainScroll";
import { useMediaQuery } from "@chakra-ui/react";
import MainPageMobile from "@/components/Mobile/Home/MainPageMobile";

export default function Home() {
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  return (
    <>
      <NextSeo
        title="OU9999"
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
      {mobileView ? <MainPageMobile /> : <MainScroll />}
    </>
  );
}
