import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface IStartCardProps {
  heading: string;
  text: string;
  src: string;
}

export default function StartCard({ heading, text, src }: IStartCardProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Box
        w={"80"}
        h={"52"}
        rounded={"3xl"}
        boxShadow={"dark-lg"}
        position={"relative"}
        overflow="hidden"
        as={motion.div}
        onHoverStart={() => setShow(true)}
        onHoverEnd={() => setShow(false)}
        zIndex={1}
        cursor={"pointer"}
      >
        <Center w="full" h={"full"} zIndex={3} position={"relative"}>
          <Center
            w="full"
            h={"full"}
            bgColor={show ? "rgba(0,0,0,0.3)" : undefined}
            transition="0.5s"
            gap={10}
            position={"relative"}
            flexDir="column"
          >
            <Center
              w="full"
              bgColor={"rgba(0,0,0,0.5)"}
              p={3}
              as={motion.div}
              animate={{
                x: show ? 0 : -500,
                transition: { type: "linear" },
              }}
              color="white"
              textShadow={"#000 1px 0 10px"}
            >
              <Heading>{heading}</Heading>
            </Center>
            <Center
              w={"full"}
              as={motion.div}
              animate={{
                x: show ? 0 : 500,
                transition: { type: "linear" },
              }}
              color="white"
              textShadow={"#000 1px 0 10px"}
            >
              <Text>{text}</Text>
            </Center>
          </Center>
        </Center>
        <Box
          transform={"auto"}
          transition={"0.5s"}
          w="full"
          h="full"
          position={"absolute"}
          top="0"
          scale={show ? 1.1 : 1}
          zIndex={2}
        >
          <Image
            src={src}
            fill={true}
            alt="thumbnail"
            style={{
              objectFit: "cover",
            }}
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPce/h4PQAHVALI8GDtfQAAAABJRU5ErkJggg=="
          />
        </Box>
      </Box>
    </>
  );
}
