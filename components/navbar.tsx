"use client"
import React from 'react'
import { useState } from 'react'
import { Authenticated, UnAuthenticated } from './auth-guard'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { LogInIcon, MenuSquareIcon, LayoutDashboardIcon } from 'lucide-react'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuItems = [
        { label: 'Home', ariaLabel: 'Go to home page', link: '#' },
        { label: 'About', ariaLabel: 'Learn about us', link: '/' },
        { label: 'Services', ariaLabel: 'View our services', link: '/services' },
        { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
    ];

    const socialItems = [
        { label: 'Twitter', link: 'https://twitter.com' },
        { label: 'GitHub', link: 'https://github.com' },
        { label: 'LinkedIn', link: 'https://linkedin.com' }
    ];
    return (
        <>
            <nav className='z-10 fixed bg-white dark:bg-black w-screen flex justify-center items-center h-15 transition-colors'>
                <div className='flex justify-between items-center md:w-[60%] w-[90%]'>
                    <div>
                        <Link href="/">
                            <img src="/icons/logo.svg" alt="" className='dark:invert transition-colors' />
                        </Link>
                    </div>
                    <div className='hidden md:flex justify-center gap-3'>
                        <Authenticated>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Link href="/dashboard" className='text-sm font-semibold text-black dark:text-white bg-black/10 dark:bg-zinc-700 px-4 py-3 rounded-4xl text-center dark:border-white/40 border-black/40 transition-colors'>
                                    Dashboard
                                </Link>
                            </motion.button>
                        </Authenticated>
                        <UnAuthenticated>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Link href="/auth" className='text-sm font-semibold text-black dark:text-white bg-black/10 dark:bg-zinc-900 px-2 py-1.5 rounded-4xl w-40 text-center dark:border-white/40 border-black/40 flex items-center justify-center gap-2 transition-colors'>
                                    <LogInIcon />
                                    Get Started
                                </Link>
                            </motion.button>
                        </UnAuthenticated>
                        {/* ChangeSchemeMode */}
                        <AnimatedThemeToggler className="text-black dark:text-white" />
                    </div>

                    {/* Menu */}

                    <button className='md:hidden flex'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MenuSquareIcon className='invert dark:invert-0 transition-colors' />
                    </button>
                </div>

                {/* MobileView */}

                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            <motion.div
                                initial={{
                                    scale: 0,
                                    opacity: 0
                                }}
                                animate={{
                                    y: 70,
                                    scale: 1,
                                    opacity: 100
                                }}
                                transition={{ duration: 0.2 }}
                                exit={{
                                    opacity: 0,
                                    y: 0,
                                    scale: 0
                                }}
                                className='fixed translate-x-42'
                            >
                                <Authenticated>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}>
                                        <Link href="/dashboard">
                                            <LayoutDashboardIcon className='border dark:border-white/40 border-black/40 rounded-full p-3 h-12 w-13 dark:bg-black bg-white text-black dark:text-white transition-colors' />
                                        </Link>
                                    </motion.button>
                                </Authenticated>
                                <UnAuthenticated>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}>
                                        <Link href="/auth">
                                            <LogInIcon className='border dark:border-white/40 border-black/40 rounded-full p-3 h-12 w-13 dark:bg-black bg-white text-black dark:text-white transition-colors' />
                                        </Link>
                                    </motion.button>
                                </UnAuthenticated>
                            </motion.div>
                            <motion.div
                                initial={{
                                    scale: 0,
                                    opacity: 0
                                }}
                                animate={{
                                    y: 130,
                                    scale: 1,
                                    opacity: 100
                                }}
                                transition={{ duration: 0.2 }}
                                exit={{
                                    opacity: 0,
                                    y: 0,
                                    scale: 0
                                }}
                                className='fixed translate-x-42'
                            >
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}>
                                    <AnimatedThemeToggler className="text-black dark:text-white" />
                                </motion.button>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav >
        </>
    )
}

export default Navbar
