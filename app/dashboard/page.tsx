"use client"
import React from 'react'
import { redirect } from 'next/navigation'
import DashNav from './components/dashnav'
import { useSession } from 'next-auth/react'

const page = () => {
    const { data: session, status } = useSession()
    
    if (status === "authenticated") {
        return (
            <div className='h-screen w-screen flex justify-center items-center bg-[#e5e5e6] dark:bg-[#0a0a0a]'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white'></div>
                    <p className='text-black dark:text-white'>Loading...</p>
                </div>
            </div>
        )
    }
    
    if (!session) redirect('/auth')
    
    return (
        <div>
            <DashNav />
            <div className='h-screen w-screen text-black flex justify-center items-center bg-[#e5e5e6] dark:bg-[#0a0a0a] dark:text-white'>
                this is dashboard
            </div>
        </div>
    )
}

export default page
