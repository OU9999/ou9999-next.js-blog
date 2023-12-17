import { Box, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NoteCard from "./NoteCard";
import { INotesArr } from "@/firebase/firebaseTypes";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const item = {
  hidden: { opacity: 0 },
  show: (idx: number) => {
    return {
      opacity: [0, 1],
      y: [-100, 0],
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 200,
        delay: 0.05 * idx,
      },
    };
  },
};

interface INoteGridProps {
  notes: INotesArr[];
  count: number;
}

export default function NoteGrid({ notes, count }: INoteGridProps) {
  return (
    <>
      <Grid
        templateColumns={{
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        px={10}
        columnGap={8}
        rowGap={16}
        pb={20}
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {notes &&
          notes.slice(0, count).map((note, idx: number) => (
            <>
              <Box
                key={note.id}
                as={motion.div}
                initial={{
                  opacity: 0,
                  y: -100,
                }}
                variants={item}
                whileInView={"show"}
                custom={idx}
                viewport={{ once: true }}
              >
                <NoteCard
                  key={"noteCard" + note.id!}
                  link={note.id!}
                  title={note.title!}
                  description={note.description!}
                  category={note.category!}
                  createdAt={note.createdAt!}
                  thumbnailUrl={note.thumbnailUrl!}
                />
              </Box>
            </>
          ))}
      </Grid>
    </>
  );
}
