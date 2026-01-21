"use client"

// https://cdn.dribbble.com/userupload/15520665/file/original-1a8b6a1ce8844bc070407a901466ad0b.png?resize=1024x768&vertical=center
import React from 'react'
import Link from 'next/link'
import { signOut, useSession, signIn } from "next-auth/react"
import { redirect } from 'next/navigation'
import * as Tabs from "@radix-ui/react-tabs"
import { Github, LogIn, UserPlus, ArrowLeftCircle } from 'lucide-react'
import Login from './components/Login'
import Signup from './components/Signup'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { AnimatePresence, motion } from 'motion/react'

const auth = () => {
    const { data: session } = useSession()
    if (!session) {
        return (
            <>
                <div className='bg-[#e5e5e6] dark:bg-zinc-900'>
                    <nav className="absolute w-screen flex justify-center items-center h-20 md:mt-1 text-black dark:text-white ">
                        <img src="/icons/logo.svg" alt="Job Tracker" className="h-18 md:h-20 dark:invert z-10 pb-5" />
                    </nav>
                    <main className="h-screen flex justify-center items-center text-black dark:text-white">
                        <div className="absolute w-90 md:w-120 border border-black/20 rounded-xl flex flex-col justify-center items-center bg-white dark:bg-black py-10 gap-5">
                            <Link href='/'>
                                <ArrowLeftCircle className='absolute left-4 top-4 h-8 w-8' />
                            </Link>
                            <div className='absolute right-4 top-4'>
                                <AnimatedThemeToggler className="text-black dark:text-white" />
                            </div>
                            <Tabs.Root defaultValue="login" orientation="horizontal" className='md:w-[80%] w-[90%] flex justify-center items-center flex-col'>
                                <Tabs.Content value="login" className='w-full flex flex-col justify-center items-center mb-5'>
                                    <LogIn className='w-12 h-12 mb-5' />
                                    <span className='font-bold text-xl'>Login using your email</span>
                                </Tabs.Content>
                                <Tabs.Content value="signup" className='w-full flex flex-col justify-center items-center mb-5'>
                                    <UserPlus className='w-12 h-12 mb-5' />
                                    <span className='font-bold text-xl'>Sign up using your email</span>
                                </Tabs.Content>
                                <span className='text-sm text-center mb-8'>Organize job applications, stay on top of deadlines, and stop forgetting where you applied.</span>
                                <Tabs.List className='border border-black/20 rounded-md bg-[#e5e5e6] dark:bg-zinc-900 w-full h-13 flex justify-evenly items-center p-0.75 gap-1 '>
                                    <Tabs.Trigger value='login' className='data-[state=active]:bg-white dark:data-[state=active]:bg-black data-[state=active]:opacity-100 opacity-20 rounded-md h-full flex-1'>
                                        Login
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value='signup' className='data-[state=active]:bg-white dark:data-[state=active]:bg-black data-[state=active]:opacity-100 opacity-20 rounded-md h-full flex-1'>
                                        Sign up
                                    </Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content value="login" className='w-full py-10'><Login /></Tabs.Content>
                                <Tabs.Content value="signup" className='w-full'><Signup /></Tabs.Content>
                            </Tabs.Root>
                            <span className='opacity-40 text-sm'>Or login with</span>
                            <div className='flex w-[80%] h-11 gap-2'>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='flex-1 flex justify-center items-center border border-black/20 dark:border-white/10 rounded-md p-2.5'
                                    onClick={() => signIn("google")}
                                >
                                    <img src="/icons/google.svg" alt="" className='h-full' />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='flex-1 flex justify-center items-center border border-black/20 dark:border-white/10 rounded-md p-2.5'
                                    onClick={() => signIn("github")}
                                >
                                    <Github />
                                </motion.button>
                            </div>
                        </div>
                    </main >
                </div >
            </>
        )
    }
    else {
        redirect('/dashboard')
    }
}

export default auth