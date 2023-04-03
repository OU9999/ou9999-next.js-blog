import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

export default function LoadingCard() {
  return (
    <>
      <Box w="sm">
        <Card maxW="sm" minH={"sm"} boxShadow={"2xl"}>
          <CardBody>
            <Box overflow={"hidden"} borderRadius="lg">
              <Skeleton w="full" h="48" mb={"10"} />
            </Box>
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </CardBody>
          <Divider />
          <CardFooter>
            <Skeleton w="full" h="6" />
          </CardFooter>
        </Card>
      </Box>
    </>
  );
}
