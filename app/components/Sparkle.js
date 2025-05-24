"use client";

import { motion } from "framer-motion";

const defaultStarPath = "M0,-1 L0.25,-0.25 L1,0 L0.25,0.25 L0,1 L-0.25,0.25 L-1,0 L-0.25,-0.25 Z";

export default function Sparkle({
  size = 12,
  color = "#FFD700",
  animationDuration = 1.5, // Base duration, "float" might be slower
  animationType = "twinkle", // "twinkle" or "float"
  className,
  style,
  path = defaultStarPath,
}) {
  let selectedAnimationProps;

  if (animationType === "float") {
    selectedAnimationProps = {
      animate: { 
        opacity: [0.3, 0.8, 0.3], 
        y: ["0%", "-20%", "0%"], // Relative to its own size for subtle float
        scale: [0.9, 1.1, 0.9] 
      },
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: animationDuration * 2, // Slower for float
        ease: "linear", // Smoother for y movement
        delay: Math.random() * (animationDuration * 2),
      },
    };
  } else { // Default to "twinkle"
    selectedAnimationProps = {
      animate: { opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] },
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: animationDuration,
        ease: "easeInOut",
        delay: Math.random() * animationDuration,
      },
    };
  }

  return (
    <motion.div style={style} className={className}>
      <motion.svg
        width={size}
        height={size}
        viewBox="-1 -1 2 2"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.5 }} // Common initial state
        animate={selectedAnimationProps.animate}
        transition={selectedAnimationProps.transition}
      >
        <path d={path} />
      </motion.svg>
    </motion.div>
  );
}
