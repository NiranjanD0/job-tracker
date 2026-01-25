"use client"
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Authenticated, UnAuthenticated } from './AuthGuard'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { LogInIcon, MenuSquareIcon, LayoutDashboardIcon, X } from 'lucide-react'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'
import { RainbowButton } from './ui/rainbow-button'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])
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
            <nav className='z-50 fixed bg-white/50 dark:bg-black/50 w-screen flex justify-center items-center h-15 backdrop-blur-md'>
                <div className='flex justify-between items-center md:w-[60%] w-[90%]'>
                    <div>
                        <Link href="/">
                            <img src="/icons/logo.svg" alt="" className="h-12 dark:invert" />
                        </Link>
                    </div>
                    <div className='hidden md:flex justify-center gap-3'>
                        <RainbowButton variant="outline">
                            <Authenticated>
                                <Link href="/dashboard" className='text-sm font-semibold dark:text-white text-black rounded-md w-40 text-center flex items-center justify-center gap-2 transition-colors duration-300'>
                                    <LogInIcon />
                                    Get Started
                                </Link>
                            </Authenticated>
                            <UnAuthenticated>
                                <Link href="/login" className='text-sm font-semibold dark:text-white text-black rounded-md w-40 text-center flex items-center justify-center gap-2 transition-colors duration-300'>
                                    <LogInIcon />
                                    Get Started
                                </Link>
                            </UnAuthenticated>
                        </RainbowButton>
                        {/* ChangeSchemeMode */}
                        <AnimatedThemeToggler className="text-black dark:text-white" />
                    </div>

                    {/* Menu */}

                    <button className='md:hidden flex'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <X className='text-black dark:text-white' />
                        ) : (
                            <MenuSquareIcon className='text-black dark:text-white' />
                        )}
                    </button>
                </div>

                {/* MobileView */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            ref={menuRef}
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: -10
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0
                            }}
                            transition={{ duration: 0.2 }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: -10
                            }}
                            className='absolute top-full left-0 right-0 md:hidden bg-white/50 dark:bg-black/50 backdrop-blur-md border-t border-white/20 dark:border-white/10 w-screen flex flex-col justify-center items-center py-4 gap-3'
                        >
                            <RainbowButton variant="outline">
                                <Authenticated>
                                    <Link href="/dashboard" className='text-sm font-semibold dark:text-white text-black rounded-md w-40 text-center flex items-center justify-center gap-2 transition-colors duration-300'>
                                        <LogInIcon />
                                        Get Started
                                    </Link>
                                </Authenticated>
                                <UnAuthenticated>
                                    <Link href="/login" className='text-sm font-semibold dark:text-white text-black rounded-md w-40 text-center flex items-center justify-center gap-2 transition-colors duration-300'>
                                        <LogInIcon />
                                        Get Started
                                    </Link>
                                </UnAuthenticated>
                            </RainbowButton>
                            <div className='py-2'>
                                <AnimatedThemeToggler className="text-black dark:text-white" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav >
        </>
    )
}

export default Navbar
