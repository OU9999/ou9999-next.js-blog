import { useColorTheme } from "@/hooks/useColorTheme";
import { Center, Heading, Box, Text, VStack } from "@chakra-ui/react";

interface IPageHeaderProps {
  title?: string;
  subText?: string;
  bgImg?: string;
}

export default function PageHeader({
  title,
  subText,
  bgImg,
}: IPageHeaderProps) {
  const { lightColor } = useColorTheme();

  return (
    <>
      <Box
        w="100vw"
        h="40vh"
        maxH={"400px"}
        position={"absolute"}
        zIndex={-1}
        backgroundRepeat="no-repeat"
        backgroundAttachment={"fixed"}
        backgroundSize="cover"
        backgroundPosition={"center center"}
        backgroundImage={bgImg}
      />
      <Box
        w="100vw"
        h="40vh"
        maxH={"400px"}
        position={"absolute"}
        zIndex={1}
        top={-2}
        background={
          "repeating-linear-gradient(0deg,#0e0d0e 25%,#0e0d0e 50%, #171819 50%,  #171819 75%)"
        }
        backgroundSize="10px 10px"
        opacity={0.3}
      />
      <Center h={"40vh"} maxH={"400px"} color="white" zIndex={2}>
        <VStack gap={4}>
          <Heading textShadow={`3px 3px ${lightColor}`} fontSize={"7xl"}>
            {title}
          </Heading>
          {subText && (
            <>
              <Text
                textShadow={"#000 1px 0 10px"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {subText}
              </Text>
            </>
          )}
        </VStack>
      </Center>
    </>
  );
}
