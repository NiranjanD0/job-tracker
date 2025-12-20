"use client"

// https://cdn.dribbble.com/userupload/15520665/file/original-1a8b6a1ce8844bc070407a901466ad0b.png?resize=1024x768&vertical=center
import React from 'react'
import { signOut, useSession, signIn } from "next-auth/react"
import { LogIn, LogOut, UserPlus } from 'lucide-react'
import * as Tabs from "@radix-ui/react-tabs"
import Login from './components/login'
import Signup from './components/signup'

const auth = () => {
    return (
        <div className='bg-[#e5e5e6] dark:bg-white/'>
            <nav className="fixed w-screen flex justify-center items-center border-b h-20">
                {/* svg */}
            </nav>
            <main className="h-screen border flex justify-center items-center text-black">
                <div className="w-90 md:w-120 border border-black/20 rounded-xl flex flex-col justify-center items-center bg-white py-10 gap-5">
                    <Tabs.Root defaultValue="login" orientation="horizontal" className='w-[80%] flex justify-center items-center flex-col'>
                        <Tabs.List className='border border-black/20 rounded-sm bg-[#e2e3e4] w-full h-13 flex justify-evenly items-center p-0.75 gap-1'>
                            <Tabs.Trigger value='login' className='data-[state=active]:bg-white rounded-sm h-full flex-1'>
                                Log In
                            </Tabs.Trigger>
                            <Tabs.Trigger value='signup' className='data-[state=active]:bg-white rounded-sm h-full flex-1'>
                                Sign Up
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="login" className='w-full'><Login /></Tabs.Content>
                        <Tabs.Content value="signup" className='w-full'><Signup /></Tabs.Content>
                    </Tabs.Root>
                    <div className='flex w-[80%] h-10 gap-2'>
                        <button
                            className='flex-1 flex justify-center items-center border border-black/20 rounded-md p-2'
                        >
                            <img src="/icons/google.svg" alt="" className='h-full' /></button>
                        <button
                            className='flex-1 flex justify-center items-center border border-black/20 rounded-md p-2'
                        >
                            <img src="/icons/github.svg" alt="" className='h-full' /></button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default auth