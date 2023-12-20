import { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { returnColors } from "@/utils/utilFn";
import { colorThemeAtom } from "@/utils/atoms";
import { useColorModeValue } from "@chakra-ui/react";

interface IColorThemeHookReturn {
  colorTheme: string;
  setColorTheme: SetterOrUpdater<string>;
  lightColor: string;
  darkColor: string;
  relativeColor: string;
}

export const useColorTheme = (): IColorThemeHookReturn => {
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeAtom);
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const relativeColor = useColorModeValue(lightColor, darkColor);

  useEffect(() => {
    const [lc, dc, hbc] = returnColors(colorTheme);
    setLightColor(lc);
    setDarkColor(hbc);
  }, [colorTheme]);

  return { colorTheme, setColorTheme, lightColor, darkColor, relativeColor };
};
