import { Box, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { INotes } from "@/pages/notes/[category]";
import NoteCard from "./NoteCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: [0, 1],
    y: [-100, 0],
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 200,
    },
  },
};

interface INoteGridProps {
  notes: INotes[];
}

export default function NoteGrid({ notes }: INoteGridProps) {
  return (
    <>
      <Grid
        templateColumns={"repeat(3, 1fr)"}
        px={10}
        columnGap={8}
        rowGap={16}
        pb={20}
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {notes.map((note) => (
          <Box
            key={note.id}
            as={motion.div}
            variants={item}
            whileInView={"show"}
            viewport={{ once: true }}
          >
            <NoteCard
              key={note.id}
              link={note.id}
              title={note.title}
              md={note.md}
              category={note.category}
              createdAt={note.createdAt}
              thumbnailUrl={note.thumbnailUrl}
            />
            {/* <LoadingCard /> */}
          </Box>
        ))}
      </Grid>
    </>
  );
}
