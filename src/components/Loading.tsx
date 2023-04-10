import { Center, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Loading() {
  const bgColor = useColorModeValue("black", "white");
  const color = useColorModeValue("white", "black");
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return showLoading ? (
    <Center w="100vw" h="100vh" zIndex={"popover"} position={"fixed"}>
      <Center
        pos={"absolute"}
        top={10}
        right={10}
        bgColor={bgColor}
        padding={3}
        rounded={10}
      >
        <Spinner top={10} right={10} size={"md"} color={color} />
      </Center>
    </Center>
  ) : null;
}
