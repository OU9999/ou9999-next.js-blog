import { colorThemeAtom } from "@/utils/atoms";
import { returnColors } from "@/utils/utilFn";
import { Text } from "@chakra-ui/react";
import { AnimationControls, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface IMainPageTextProps {
  text: string;
  mainTextAni: AnimationControls;
}

const mainTextVariants: Variants = {
  normal: { y: -100, opacity: 0 },
  start: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 200 },
  },
};

const colors = [
  //wb
  "#fff",
  "#000",
  //ptc
  "#7F5AD5",
  "#319795",
  "#00B5D8",
  //rgb
  "#E53E3E",
  "#DD6B20",
  "#D69E2E",
  "#38A169",
  "#3182CE",
  "#D53F8C",
];

export default function MainPageText({
  text,
  mainTextAni,
}: IMainPageTextProps) {
  const [Click, setClick] = useState<number>(0);
  const colorTheme = useRecoilValue(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [randomColor, setRandomColor] = useState("");

  const onClicked = () => {
    setClick((prev) => prev + 1);
  };

  useEffect(() => {
    setRandomColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [Click]);

  useEffect(() => {
    setClick(0);
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
  }, [colorTheme]);

  return (
    <>
      <Text
        fontSize={"9xl"}
        fontWeight={"extrabold"}
        textShadow={`${Click === 0 ? lightColor : randomColor} 1px 0 30px`}
        onClick={onClicked}
        as={motion.p}
        variants={mainTextVariants}
        initial={"normal"}
        animate={mainTextAni}
        cursor={"pointer"}
        whileHover={{
          scale: 1.1,
        }}
      >
        {text}
      </Text>
    </>
  );
}
