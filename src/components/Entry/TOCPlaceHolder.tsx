import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { returnLinkTitle } from "@/utils/utilFn";
import { motion, useScroll } from "framer-motion";
import { tocAniVariants } from "./TOC";

interface ITocProps {
  md: string;
}

interface Item {
  title?: string;
  link?: string;
  count?: number;
}

export default function TOCPlaceHolder({ md }: ITocProps) {
  //state
  const [tocAni, setTocAni] = useState(false);

  //util
  const { scrollY } = useScroll();
  const tocRef = useRef<HTMLDivElement>(null);

  const titles = md.split(`\n`).filter((t: string) => t.includes("# "));

  const result: Item[] = titles
    .filter((str: string) => str[0] === "#")
    .map((item: string) => {
      let count = item.match(/#/g)?.length;
      if (count) {
        count = count * 10;
      }

      return {
        title: item.split("# ")[1].replace(/`/g, "").trim(),
        count,
        link: returnLinkTitle(item.split("# ")[1].replace(/`/g, "").trim()),
      };
    });

  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() >= 250) {
        setTocAni(true);
      } else {
        setTocAni(false);
      }
    });
  }, [scrollY]);

  return (
    <>
      <Box
        as={motion.div}
        variants={tocAniVariants}
        animate={"hello"}
        initial={{
          opacity: 0,
        }}
        custom={tocAni}
        w="220px"
        ref={tocRef}
      >
        <Box borderLeft={"3px solid gray"} px={1}>
          <Box h="auto">
            {result.map((item) => {
              if (item?.count && item.count <= 30 && item?.title) {
                return (
                  <Link href={`#${item.link}`} key={item.link}>
                    <Text
                      transition={"0.3s"}
                      color={"gray"}
                      marginLeft={`${item.count}px`}
                      overflow={"hidden"}
                      fontSize={"md"}
                    >
                      {item.title}
                    </Text>
                  </Link>
                );
              }
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}
