import { Box, Switch, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Variants, motion, useAnimation } from "framer-motion";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

const iconVariants: Variants = {
  clicked: {
    opacity: [0, 1],
    scale: [0, 100],
    transition: {
      duration: 1,
    },
  },
  init: {
    opacity: [0, 1],
    scale: [0, 100],
    transition: {
      duration: 1,
    },
  },
};

export default function ModeSwitch() {
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaSun, BsMoonStarsFill);
  const iconAnimate = useAnimation();

  const onChangeSwitchClicked = () => {
    toggleColorMode();
    iconAnimate.start("clicked");
  };

  return (
    <Switch
      pos={"relative"}
      onChange={onChangeSwitchClicked}
      isChecked={Icon === BsMoonStarsFill}
    >
      {Icon === FaSun && (
        <Box
          color={"#ecc94b"}
          pos={"absolute"}
          top={"3.5px"}
          left={"3.5px"}
          fontSize={"xs"}
          as={motion.div}
          layoutId="colorIcon"
          variants={iconVariants}
          initial="init"
          animate={iconAnimate}
        >
          <Icon />
        </Box>
      )}
      {Icon === BsMoonStarsFill && (
        <Box
          color={"#b7791f"}
          pos={"absolute"}
          top={"3.5px"}
          right={"11.6px"}
          fontSize={"xs"}
          as={motion.div}
          layoutId="colorIcon"
          variants={iconVariants}
          initial="init"
          animate={iconAnimate}
        >
          <Icon />
        </Box>
      )}
    </Switch>
  );
}
