'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useTheme } from 'next-themes';
import { ModeToggle } from './Menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme('light')

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    }

    const links = [
        { name: 'Notes', path: '/notes' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contacts' },
    ];

    return (

    
    <header className={cn("fixed top-0 w-full z-30 py-6 backdrop-blur-sm bg-white/75 dark:bg-black/75")}>
    
        <nav className='mx-auto flex w-full max-w-3xl items-center justify-between px-6'>


            <ul className='hidden sm:flex items-center justify-evenly gap-8 font-medium'>
                <li>
                    <Link href='/' className='text-[1.2rem] font-bold text-foreground block'>SuboDev</Link>
                </li>
                {
                    links.map((link) => (
                        <li key={link.name} className='sm:flex text-[0.875rem] font-normal '>
                            <Link href={link.path} className='transition hover:text-primary'>{link.name}</Link>
                        </li>
                    ))
                }
            </ul>

            <ul className='sm:hidden flex items-center p-4'>
                {/* Hamburger menu icon */}
                <li>

                    <button className={cn("p-2 rounded-lg hover:bg-gray-100 transition-colors", theme === 'dark' && "hover:bg-black/30" )} onClick={handleMenuToggle}>
                        {/* Hamburger icon SVG */}
                        <span className={cn("block w-6 h-px mb-1 bg-foreground")}></span>
                        <span className={cn("block w-6 h-px mb-1 bg-foreground")}></span>
                        <span className={cn("block w-6 h-px mb-1 bg-foreground")}></span>
                    </button>
                </li>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className='absolute top-20 left-0 w-full h-[2xl] bg-background shadow-lg rounded-lg p-4 z-20 text-center'>
                        <ul className='flex flex-col gap-2'>
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.path} className='block text-[0.875rem] font-normal hover:text-primary'>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </ul>
                        
            <div className='flex justify-between items-center gap-5 text-[0.875rem] font-light'>
                <ModeToggle setTheme={setTheme} className=""/>
                <Button variant="outline" className='text-[0.8rem]'>Sign In</Button>
            </div>
        </nav>


    </header>
  );
};

export default Header;