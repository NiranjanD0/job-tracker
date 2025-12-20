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
        <div className='bg-white/80'>
            <nav className="fixed w-screen flex justify-center items-center border-b h-20">
                {/* svg */}
            </nav>
            <main className="h-screen border flex justify-center items-center">
                <div className="w-90 md:w-120 border">
                    <Tabs.Root defaultValue="tab1" orientation="horizontal" className='w-[80%]'>
                        <Tabs.List className='border'>
                            <Tabs.Trigger value='signin'>
                                Log In
                            </Tabs.Trigger>
                            <Tabs.Trigger value='signup'>
                                Sign Up
                            </Tabs.Trigger>
                        </Tabs.List>
                    </Tabs.Root>
                </div>
            </main>
        </div>
    )
}

export default auth