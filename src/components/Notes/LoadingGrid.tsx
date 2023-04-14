import { Grid } from "@chakra-ui/react";
import LoadingCard from "./LoadingCard";

export default function LoadingGrid() {
  return (
    <>
      <Grid
        templateColumns={"repeat(3, 1fr)"}
        px={10}
        columnGap={8}
        rowGap={16}
        pb={20}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </Grid>
    </>
  );
}
