"use client"
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { SunDimIcon, MoonIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export function ToggleMode() {
    const { setTheme, theme } = useTheme()
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {(theme === "dark" ? (
                <SunDimIcon className='border dark:border-white/40 border-black/40 rounded-full md:p-1 md:h-9 md:w-9 p-3 h-12 w-13 dark:bg-black bg-white text-black dark:text-white transition-colors' />
            ) : (
                <MoonIcon className='border dark:border-white/40 border-black/40 rounded-full md:p-1.5 md:h-9 md:w-9 p-3 h-12 w-13 dark:bg-black bg-white text-black dark:text-white transition-colors' />
            ))
            }
        </motion.button>
    )
}

export function ToggleModeSm() {
    const { setTheme, theme } = useTheme()
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {(theme === "dark" ? (
                <SunDimIcon className='border dark:border-white/40 border-black/40 rounded-full md:p-1 md:h-9 md:w-9 p-1.5 h-9 w-9 dark:bg-black bg-white text-black dark:text-white transition-colors' />
            ) : (
                <MoonIcon className='border dark:border-white/40 border-black/40 rounded-full md:p-1.5 md:h-9 md:w-9 p-2 h-9 w-9 dark:bg-black bg-white text-black dark:text-white transition-colors' />
            ))
            }
        </motion.button>
    )
}
