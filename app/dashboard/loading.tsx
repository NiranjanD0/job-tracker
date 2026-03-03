import React from 'react'
import DashNav from './components/DashNav'

export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a]">
            {/* We recreate the basic structure so the nav is still visible while loading */}
            <DashNav />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-8">

                <main className="flex-1 w-full min-w-0 space-y-8">
                    {/* Stats Skeleton */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <div className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-24 rounded-2xl"></div>
                        <div className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-24 rounded-2xl"></div>
                        <div className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-24 rounded-2xl"></div>
                        <div className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-24 rounded-2xl"></div>
                    </div>

                    {/* Filter Bar Skeleton */}
                    <div className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-20 rounded-2xl"></div>

                    {/* Job Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-36 rounded-xl"></div>
                        ))}
                    </div>
                </main>

                {/* Sidebar Skeleton */}
                <aside className="w-full xl:w-80 space-y-6 shrink-0">
                    <div className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-64 rounded-2xl"></div>
                    <div className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-48 rounded-2xl"></div>
                </aside>

            </div>
        </div>
    )
}
