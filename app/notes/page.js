import { motion } from "framer-motion";

export default function NotesPage() {
  return (
    <div className="mt-32 sm:mt-36 px-6 py-8 max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        className="text-4xl font-bold sm:text-5xl text-foreground mb-10"
      >
        Notes
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        className="text-lg text-muted-foreground mb-6"
      >
        A collection of my thoughts, findings, and quick notes.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
        className="text-muted-foreground"
      >
        More content coming soon.
      </motion.p>
    </div>
  );
}
