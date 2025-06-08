"use client";

import { motion } from "framer-motion";
import NoteCard from "../components/NoteCard";
import notesData from "../data/notes"; // Renamed from 'notes' to 'notesData' for consistency with prompt

export default function NotesPage() {
  const staggerContainer = {
    hidden: { opacity: 1 }, // Parent container is visible, children will animate
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time delay between children animations
        delayChildren: 0.3,   // Delay before starting the first child animation (after page title potentially)
      },
    },
  };

  // Note: The Card component (used by NoteCard) already has its own 
  // initial={{ opacity: 0, y: 20 }} and animate={{ opacity: 1, y: 0 }} props.
  // These will be triggered by the parent's staggerChildren effect.

  return (
    <div className="mt-32 sm:mt-36 px-6 py-8 max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        className="text-4xl font-bold sm:text-5xl text-foreground mb-12" // Increased bottom margin
      >
        Notes
      </motion.h1>

      {notesData && notesData.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" // Grid layout with adjusted gap
        >
          {notesData.map((note) => (
            <NoteCard key={note.id} note={note} />
            // NoteCard uses Card, which is a motion.div.
            // Its existing initial/animate props will be triggered by staggerChildren.
          ))}
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }} // Adjusted delay to 0.2s as per prompt example
          className="text-lg text-muted-foreground"
        >
          No notes available yet. Check back soon!
        </motion.p>
      )}
    </div>
  );
}
