"use client"
import React from 'react'
import { redirect } from 'next/navigation'
import DashNav from './components/DashNav'
import { useSession } from 'next-auth/react'

const page = () => {
    const { data: session, status } = useSession()
    
    if (status === "loading") {
        return (
            <div className='h-screen w-screen flex justify-center items-center bg-[#e5e5e6] dark:bg-[#0a0a0a]'>
                <div className='flex flex-col items-center gap-4'>
                    <div className="loader text-white"></div>
                    <p className='text-black dark:text-white'>Loading Dashboard...</p>
                </div>
            </div>
        )
    }
    else if (status === "unauthenticated") redirect('/login')
    
    return (
        <div>
            <DashNav />
            <div className='h-screen w-screen text-black flex justify-center items-center bg-[#e5e5e6] dark:bg-[#0a0a0a] dark:text-white'>
                This is dashboard
            </div>
        </div>
    )
}

export default page
