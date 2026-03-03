import React from 'react'
import DashNav from './components/DashNav'
import DashboardMetrics from './components/DashboardMetrics'
import Sidebar from './components/Sidebar'
import JobBoard from './components/JobBoard'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/login')
    }

    const jobs = await prisma.job.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' }
    })

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a]">
            <DashNav />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-8">
                <main className="flex-1 w-full min-w-0">
                    <DashboardMetrics jobs={jobs} />
                    <JobBoard initialJobs={jobs} />
                </main>
                <div className="w-full xl:w-80 shrink-0">
                    <Sidebar jobs={jobs} />
                </div>
            </div>
        </div>
    )
}
