import { NextSeo } from "next-seo";

interface IBlogSEOProps {
  title: string;
  description: string;
  image: string;
  main?: boolean;
}

const BlogSEO = ({ title, description, image, main }: IBlogSEOProps) => {
  return (
    <NextSeo
      title={main ? title : `${title} | OU9999's First Blog`}
      description={main ? description : `${description} | OU9999's First Blog`}
      openGraph={{
        type: "website",
        url: "no",
        title: main ? title : `${title} | OU9999's First Blog`,
        description: main
          ? description
          : `${description} | OU9999's First Blog`,
        images: [
          {
            url: image,
            width: 285,
            height: 167,
            alt: "image",
          },
        ],
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  );
};

export default BlogSEO;
