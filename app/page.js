'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import hero from "./images/hero.png"

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-40 w-full px-6 sm:px-8 lg:px-12 mx-auto max-w-3xl">
        <div className="flex flex-col justify-center items-start py-4 md:py-0">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 1.5}}
            className='text-2xl sm:text-3xl md:text-4xl font-bold text-foreground'
          >
            Hey, I'm Subarna
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 1.7 }}
            className='mt-2 text-base sm:text-lg text-muted-foreground'
          >
            I love networking and system security.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 1.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="mt-4">Reach Out</Button>
          </motion.div>
        </div>
        <div className="md:flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 1.7 }}
          >

          <Image
            src={hero}
            alt="Hero Image"
            width={500}
            height={500}
            className="w-64 sm:w-80 md:w-[500px] rounded-lg shadow-lg"
          />

          </motion.div>
        </div>
      </div>
      {/* MAIN CONTENT */}
      <main className="mt-20 sm:mt-24 px-6 py-8 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay:0.9}}
          className="text-3xl sm:text-4xl text-foreground mb-6 font-bold"
        >
          SuboDev
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6}}
          className="text-base sm:text-lg text-muted-foreground mb-10"
        >
          Welcome to my personal space on the web. I write about technology,
          projects, and random thoughts.
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3}}
          className="text-xl sm:text-2xl font-semibold text-foreground mb-4"
        >
          Recent Posts
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
          className="text-muted-foreground"
        >
          No posts yet, check back soon!
        </motion.p>
      </main>
    </>
  );
}