"use client"
import React from 'react'
import { redirect } from 'next/navigation'
import DashNav from './components/dashnav'
import { useSession } from 'next-auth/react'

const page = () => {
    const { data: session } = useSession()
    if (!session) redirect('/auth')
    else return (
        <div>
            <DashNav />
            <div className='h-screen w-screen text-black flex justify-center items-center bg-[#e5e5e6] dark:bg-[#0a0a0a] dark:text-white'>
                this is dashboard
            </div>
        </div>
    )
}

export default page
