'use client';

import { motion } from 'framer-motion';

const PageLoadReveal = ({ onAnimationComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 w-screen h-screen bg-black z-[100]" // Using Tailwind
      initial={{ clipPath: 'circle(150% at 50% 50%)' }}
      animate={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 1.0, delay: 0.3, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }}
    />
  );
};

export default PageLoadReveal;
