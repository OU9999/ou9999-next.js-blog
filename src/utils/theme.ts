import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
  disableTransitionOnChange: false,
};

const theme = extendTheme({
  config,
  colors: {
    purple: {
      light: "#7F5AD5",
      dark: "#C7A8F7",
    },
    teal: {
      light: "#319795",
      dark: "#81E6D9",
    },
    cyan: {
      light: "#00B5D8",
      dark: "#9DECF9",
    },
  },
  fonts: {
    heading: "Noto Sans KR, sans-serif",
    body: "Noto Sans KR, sans-serif",
  },
  styles: {
    global: {
      body: {
        transitionProperty: "all",
        transitionDuration: "normal",
      },
    },
  },
});

export default theme;
