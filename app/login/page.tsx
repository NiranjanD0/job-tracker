"use client"

import React from 'react'
import Link from 'next/link'
import { signIn, useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import * as Tabs from "@radix-ui/react-tabs"
import { Github, ArrowLeft } from 'lucide-react'
import Login from './components/Login'
import Signup from './components/Signup'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { motion } from 'motion/react'
import { ShineBorder } from '@/components/ui/shine-border'
import { Meteors } from '@/components/ui/meteors'

const AuthPage = () => {
    const { data: session, status } = useSession()
    const [activeTab, setActiveTab] = React.useState('login')
    const [tabListWidth, setTabListWidth] = React.useState<number>(0)
    const tabListRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const el = tabListRef.current
        if (!el) return

        const ro = new ResizeObserver(() => {
            setTabListWidth(el.getBoundingClientRect().width)
        })
        ro.observe(el)
        setTabListWidth(el.getBoundingClientRect().width)
        return () => ro.disconnect()
    }, [])

    if (status === "loading") {
        return (
            <div className='h-screen w-screen flex justify-center items-center bg-white dark:bg-black'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600'></div>
            </div>
        )
    }

    if (session) {
        redirect('/dashboard')
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-950 dark:via-black dark:to-zinc-950 duration-300'>
            {/* Header */}
            <Meteors number={30} />
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/50 dark:bg-black/40 border-b border-gray-200 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity w-32">
                            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Back to Home</span>
                        </Link>
                        <div className="flex-1 flex justify-center">
                            <img src="/icons/logo.svg" alt="Job Tracker" className="h-8 dark:invert" />
                        </div>
                        <div className="w-32 flex justify-end">
                            <AnimatedThemeToggler className="text-black dark:text-white" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex justify-center items-center min-h-screen pt-16 px-4">
                <ShineBorder />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="relative rounded-2xl">
                        <div className="relative bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 p-8">
                            {/* Logo and Title */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {activeTab === 'login' ? 'Login' : 'Create Account'}
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {activeTab === 'login'
                                        ? 'Let’s get you back to tracking'
                                        : 'Start organizing your job search today'
                                    }
                                </p>
                            </div>

                            {/* Tabs */}
                            <Tabs.Root defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
                                {/* Tab List */}
                                <Tabs.List ref={tabListRef} className="relative grid grid-cols-2 gap-2 p-1 bg-gray-100/80 dark:bg-white/5 rounded-lg mb-6 overflow-hidden border border-transparent dark:border-white/10">
                                    <motion.div
                                        className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/2)] bg-white dark:bg-white/10 rounded-md shadow-sm"
                                        initial={false}
                                        animate={{
                                            x: activeTab === "login" ? 0 : Math.max(0, (tabListWidth - 8) / 2),
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 35,
                                        }}
                                    />

                                    <Tabs.Trigger
                                        value="login"
                                        className="relative z-10 px-4 py-2.5 text-sm font-medium data-[state=active]:text-purple-600 data-[state=active]:dark:text-white text-gray-600 dark:text-zinc-300"
                                    >
                                        Login
                                    </Tabs.Trigger>

                                    <Tabs.Trigger
                                        value="signup"
                                        className="relative z-10 px-4 py-2.5 text-sm font-medium data-[state=active]:text-purple-600 data-[state=active]:dark:text-white text-gray-600 dark:text-zinc-300"
                                    >
                                        Sign Up
                                    </Tabs.Trigger>
                                </Tabs.List>


                                {/* Tab Content */}
                                <Tabs.Content value="login" className="mt-6">
                                    <motion.div
                                        key="tab-login"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        <Login />
                                    </motion.div>
                                </Tabs.Content>
                                <Tabs.Content value="signup" className="mt-6">
                                    <motion.div
                                        key="tab-signup"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        <Signup />
                                    </motion.div>
                                </Tabs.Content>
                            </Tabs.Root>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white/80 dark:bg-zinc-950/70 text-gray-500 dark:text-zinc-400">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => signIn("google")}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                                >
                                    <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => signIn("github")}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                                >
                                    <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                                </motion.button>
                            </div>

                            {/* Footer Text */}
                            <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
                                By continuing, you agree to our{' '}
                                <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

export default AuthPage