"use client";

import { motion } from 'framer-motion';
import GradientHeading from './ui/GradientHeading';

// Added layoutId to the destructured props
export default function Card({ title, children, className, layoutId }) { 
  return (
    <motion.div
      // Conditionally spread layoutId prop
      {...(layoutId && { layoutId })} 
      className={`p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg hover:shadow-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // Preserving the existing transition logic from the previous version read
      transition={{ 
        opacity: { duration: 0.5, ease: "easeInOut" },
        y: { duration: 0.5, ease: "easeInOut" },
        scale: { duration: 0.2, ease: "easeInOut" } 
      }}
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{title}</h3>
      <div className="text-slate-600 dark:text-slate-300">{children}</div>
    </motion.div>
  );
}
