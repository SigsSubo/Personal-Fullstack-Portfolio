import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <div className="mt-32 sm:mt-36 px-6 py-8 max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 1.9 }}
        className="text-4xl font-bold sm:text-5xl text-foreground mb-10"
      >
        Projects
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 2.0 }}
        className="text-lg text-muted-foreground mb-6"
      >
        Here are some of the projects I've been working on.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 2.1 }}
        className="text-muted-foreground"
      >
        Detailed project descriptions will be added soon.
      </motion.p>
    </div>
  );
}
