"use client";

import { motion } from "framer-motion";
import Sparkle from "../components/Sparkle"; // Import Sparkle
import ContactForm from "../components/ContactForm"; // Import ContactForm

// Sample sparkle configurations - adjust positions, sizes, colors as desired
const sparkles = [
  { id: 1, top: "10%", left: "15%", size: 10, color: "#FFD700" }, // Gold
  { id: 2, top: "20%", left: "80%", size: 14, color: "#F0E68C" }, // Khaki
  { id: 3, top: "60%", left: "10%", size: 8,  color: "#FFFACD" }, // LemonChiffon
  { id: 4, top: "75%", left: "70%", size: 12, color: "#FFDEAD" }, // NavajoWhite
  { id: 5, top: "5%",  left: "50%", size: 9,  color: "#FFEBCD" }, // BlanchedAlmond
  { id: 6, top: "40%", left: "45%", size: 11, color: "#FAFAD2" }, // LightGoldenrodYellow
  { id: 7, top: "85%", left: "25%", size: 7,  color: "#EEE8AA" }, // PaleGoldenrod
];

export default function ContactPage() {
  return (
    <div className="relative max-w-3xl mx-auto px-6 py-12 sm:py-16 lg:py-20 mt-32 sm:mt-36"> 
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        className="text-4xl font-bold sm:text-5xl text-foreground mb-6 text-center relative z-10" 
      >
        Get in Touch
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        className="text-lg text-muted-foreground mb-12 text-center sm:text-xl relative z-10" 
      >
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing. Fill out the form below, or reach out via other channels!
      </motion.p>

      {/* Render Sparkles */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10"> 
        {sparkles.map(s => (
          <Sparkle
            key={s.id}
            size={s.size}
            color={s.color}
            style={{
              position: 'absolute',
              top: s.top,
              left: s.left,
            }}
          />
        ))}
      </div>

      {/* Animated ContactForm */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }} 
        className="relative z-10" 
      >
        <ContactForm />
      </motion.div>
      
      {/* Original placeholders for additional sparkles, if any */}
      {/* Sparkles effect might be added here or around the form later */}
    </div>
  );
}
