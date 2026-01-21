import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MenuSquareIcon, LogOutIcon } from 'lucide-react'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { signOut } from 'next-auth/react'

const DashNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <nav className='z-10 fixed bg-white/50 dark:bg-black/50 backdrop-blur-md w-screen flex justify-center items-center h-15 transition-colors md:px-5 px-3'>
            <div className='flex justify-between items-center w-screen'>
                <div>
                    <Link href="/">
                        <img src="/icons/logo.svg" alt="" className='dark:invert transition-colors' />
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

            <button className='md:hidden flex'
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MenuSquareIcon className='invert dark:invert-0 transition-colors' />
            </button>
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
                                y: 92,
                                scale: 1,
                                opacity: 100
                            }}
                            transition={{ duration: 0.2 }}
                            exit={{
                                opacity: 0,
                                y: 0,
                                scale: 0
                            }}
                            className='fixed translate-x-42 flex flex-col'
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <AnimatedThemeToggler className="text-black dark:text-white" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => signOut()}>
                                <LogOutIcon className='border dark:border-white/40 border-black/40 rounded-full p-3 h-12 w-13 dark:bg-black bg-white text-black dark:text-white transition-colors' />
                            </motion.button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav >
    )
}

export default DashNav
