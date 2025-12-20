"use client"
import React from 'react'
import { Authenticated, UnAuthenticated } from './auth-guard'
import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <nav className='fixed bg-white dark:bg-zinc-900 w-screen flex justify-center items-center h-12'>
                <div className='flex justify-between items-center md:w-[60%] w-[90%]'>
                    <div>
                        <Link href="/">
                            <img src="/icons/logo.svg" alt="" className='dark:invert' />
                        </Link>
                    </div>
                    <Authenticated>
                        <Link href="/dashboard" className='text-black dark:text-white bg-[#747488] dark:bg-zinc-700 px-2 py-1.5 rounded-4xl w-30 text-center'>
                            Dashboard
                        </Link>
                    </Authenticated>
                    <UnAuthenticated>
                        <Link href="/auth" className='text-black dark:text-white bg-[#747488] dark:bg-zinc-700 px-2 py-1.5 rounded-4xl w-40 text-center'>
                            LogIn / SignUp
                        </Link>
                    </UnAuthenticated>
                </div>
            </nav>
        </>
    )
}

export default Navbar
