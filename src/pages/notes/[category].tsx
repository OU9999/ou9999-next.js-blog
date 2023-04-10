import NoteMainPageMobile from "@/components/Mobile/Notes/NoteMainPageMobile";
import NotesMainPage from "@/components/Notes/NoteMainPage";
import { useMediaQuery } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

export interface INotes {
  id: string;
  category: string;
  createdAt: number;
  title: string;
  md: string;
  thumbnailUrl: string;
}

export interface ICategorys {
  id: string;
  category: string;
  createdAt: number;
}

export const allCategory: ICategorys = {
  id: "1",
  category: "ALL",
  createdAt: 1,
};

interface INotesCategoryProps {
  params: {
    category: string;
  };
  category: string;
  notes: INotes[];
}

export const getServerSideProps = async ({ params }: any) => {
  const { category } = params;

  return {
    props: { category },
  };
};

export default function NotesCategory({ category }: INotesCategoryProps) {
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

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
              url: "/op.png",
              width: 285,
              height: 167,
              alt: "image",
            },
          ],
        }}
      />
      {mobileView ? (
        <NoteMainPageMobile category={category} />
      ) : (
        <NotesMainPage category={category} />
      )}
    </>
  );
}
