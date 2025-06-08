'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useTheme } from 'next-themes';
import { ModeToggle } from './Menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from 'lucide-react';
// import { Dancing_Script } from 'next/font/google';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme('light')
    // const dancingScript = Dancing_Script({
    //     subsets: ['latin'],
    //     weight: ['400', '500', '600', '700']
    // });

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    }

    const links = [
        { name: 'Notes', path: '/notes' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contacts' },
    ];

    return (

    
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay:1.3}}
      className={cn("fixed top-0 w-full z-30 py-6 backdrop-blur-sm bg-white/75 dark:bg-black/75 transition-colors duration-300 ease-in-out")}
    >
    
        <nav className='mx-auto flex w-full max-w-3xl items-center justify-between px-6'>


            <ul className='hidden sm:flex items-center justify-evenly gap-8 font-medium'>
                <li>
                  <motion.div
                    className="inline-block"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <Link href='/' className={cn('text-[1.6rem] font-bold text-foreground block')}>SD</Link>
                  </motion.div>
                </li>
                {
                    links.map((link) => (
                        <li key={link.name} className='sm:flex text-[0.875rem] font-normal '>
                          <motion.div
                            className="inline-block"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                          >
                            <Link href={link.path} className='transition hover:text-primary'>{link.name}</Link>
                          </motion.div>
                        </li>
                    ))
                }
            </ul>

            <ul className='sm:hidden flex items-center p-4'>
                {/* Hamburger menu icon */}
                <li>

                    <button className={cn("p-2 rounded-lg hover:bg-muted/50 transition-colors")} onClick={handleMenuToggle}>
                        {/* Hamburger icon SVG */}
                        <Menu size={28} className="text-foreground" />
                    </button>
                </li>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="mobile-menu"
                      initial={{ x: "100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "100%", opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="fixed top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center z-50"
                    >
                      <motion.button
                        onClick={() => setIsOpen(false)} // Use the existing setIsOpen function
                        className="absolute top-5 right-5 p-2 text-foreground hover:text-primary transition-colors" // Basic styling for position and appearance
                        aria-label="Close menu"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={32} /> {/* Lucide X icon */}
                      </motion.button>
                      <ul className="flex flex-col items-center gap-8">
                        {links.map((link, index) => (
                          <li key={link.name}>
                            <motion.div
                              className="block"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 + index * 0.1 }}
                              whileHover={{ y: -2 }}
                              // The existing transition for hover might be overridden or merged.
                              // If hover feels off, this would need adjustment,
                              // possibly by moving the hover transition into whileHover like:
                              // whileHover={{ y: -2, transition: { duration: 0.2, ease: "easeInOut" } }}
                              // For now, proceeding as per simpler interpretation.
                              onClick={() => setIsOpen(false)} // Close menu on click
                            >
                              <Link href={link.path} className='block text-3xl text-foreground hover:text-primary transition-colors py-2'>
                                {link.name}
                              </Link>

                            </motion.div>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

            </ul>
                        
            <div className='flex justify-between items-center gap-5 text-[0.875rem] font-light'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex"
                >
                  <ModeToggle setTheme={setTheme} className=""/>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" className='text-[0.8rem]'>Sign In</Button>
                </motion.div>
            </div>
        </nav>


    </motion.header>
  );
};

export default Header;