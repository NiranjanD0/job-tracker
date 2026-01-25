"use client"

import React from 'react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MenuSquareIcon, LogOutIcon, X } from 'lucide-react'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { signOut } from 'next-auth/react'

const DashNav = () => {
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

    return (
        <nav className='z-10 fixed bg-white/50 dark:bg-black/50 backdrop-blur-md w-screen flex justify-center items-center h-15 transition-colors md:px-5 px-3'>
            <div className='flex justify-between items-center w-screen'>
                <div>
                    <Link href="/">
                        <img src="/icons/logo.svg" alt="" className="h-12 dark:invert" />
                    </Link>
                </div>
                <div className='hidden md:flex justify-center gap-3'>
                    <AnimatedThemeToggler className="text-black dark:text-white" />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => signOut()}>
                        <LogOutIcon className='dark:text-white text-black transition-colors' />
                    </motion.button>
                    {/* ChangeSchemeMode */}
                </div>
            </div>
            {/* Menu */}

            <button
                className='md:hidden flex'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? (
                    <X className='text-black dark:text-white' />
                ) : (
                    <MenuSquareIcon className='text-black dark:text-white' />
                )}
            </button>
            {/* MobileView */}

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            y: -10,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        transition={{ duration: 0.2 }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            y: -10,
                        }}
                        className='absolute top-full left-0 right-0 md:hidden bg-white/50 dark:bg-black/50 backdrop-blur-md border-t border-white/20 dark:border-white/10 w-screen flex flex-col justify-center items-center py-4 gap-3'
                    >
                        <div className='py-2'>
                            <AnimatedThemeToggler className="text-black dark:text-white" />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setIsMenuOpen(false)
                                signOut()
                            }}
                            className='flex items-center justify-center gap-2 text-sm font-semibold dark:text-white text-black rounded-md w-40 text-center transition-colors duration-300'
                        >
                            <LogOutIcon className='h-5 w-5' />
                            Sign out
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    )
}

export default DashNav
