import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useIntersectionObserve } from "./IO";
import { returnLinkTitle } from "@/utils/utilFn";
import { useColorTheme } from "@/hooks/useColorTheme";

interface ITocProps {
  md: string;
}

interface Item {
  title?: string;
  link?: string;
  count?: number;
}

export default function Toc({ md }: ITocProps) {
  const { relativeColor } = useColorTheme();
  const [activeId, setActiveId] = useState("");
  const tocRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <Box w="220px" ref={tocRef}>
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
