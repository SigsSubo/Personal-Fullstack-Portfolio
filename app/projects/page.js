"use client";

import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects"; // Corrected import name for data

export default function ProjectsPage() {
  const staggerContainer = {
    hidden: { opacity: 1 }, // Parent container is visible, children will animate
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time delay between children animations
        delayChildren: 0.3,   // Delay before starting the first child animation (after page title)
      },
    },
  };

  // Note: The ProjectCard (via its Card component) already has its own 
  // initial={{ opacity: 0, y: 20 }} and animate={{ opacity: 1, y: 0 }} props.
  // These will be triggered by the parent's staggerChildren effect.

  return (
    <div className="mt-32 sm:mt-36 px-6 py-8 max-w-5xl mx-auto"> {/* Consistent width and padding */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }} // Consistent title animation delay
        className="text-4xl font-bold sm:text-5xl text-foreground mb-12" // Consistent title margin
      >
        Projects
      </motion.h1>

      {projectsData && projectsData.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8" // Grid layout for projects
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
            // ProjectCard uses Card, which is a motion.div.
            // Its existing initial/animate props will be triggered by staggerChildren.
          ))}
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }} // Consistent empty state animation delay
          className="text-lg text-muted-foreground"
        >
          No projects available yet. Check back soon!
        </motion.p>
      )}
    </div>
  );
}
