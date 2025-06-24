"use client";

import { motion } from 'framer-motion';
// MarkdownRenderer is no longer imported here

export default function NoteContentClient({ note, displayDate, mdxOutput }) { // Added mdxOutput prop
  return (
    <motion.div
      layoutId={`note-card-${note.id}`}
      className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
        {note.title}
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 sm:mb-8">
        {displayDate}
      </p>
      <div>
      {mdxOutput}
      </div>
 {/* Render the passed JSX */}
    </motion.div>
  );
}
