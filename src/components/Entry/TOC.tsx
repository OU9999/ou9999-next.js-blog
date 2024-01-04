import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserve } from "./IO";
import { returnLinkTitle } from "@/utils/utilFn";
import { useColorTheme } from "@/hooks/useColorTheme";
import { Variants, motion, useScroll } from "framer-motion";

interface ITocProps {
  md: string;
}

interface Item {
  title?: string;
  link?: string;
  count?: number;
}

export const tocAniVariants: Variants = {
  hello: (inView: boolean) => {
    return {
      opacity: inView ? 1 : 0,
    };
  },
};

export default function Toc({ md }: ITocProps) {
  //state
  const [activeId, setActiveId] = useState("");
  const [tocAni, setTocAni] = useState(false);

  //util
  const tocRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { relativeColor } = useColorTheme();

  useIntersectionObserve(setActiveId, md);

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
                      color={activeId === item.link ? relativeColor : "gray"}
                      marginLeft={`${item.count}px`}
                      overflow={"hidden"}
                      fontSize={activeId === item.link ? "lg" : "md"}
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
