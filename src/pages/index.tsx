import { NextSeo } from "next-seo";
import MainScroll from "@/components/Home/MainScroll";

export default function Home() {
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

      <MainScroll />
    </>
  );
}
