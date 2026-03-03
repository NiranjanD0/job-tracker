"use client"

import React, { useState } from 'react'
import JobCard from './JobCard'
import { Search, Filter, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import { deleteJobAction } from '@/app/actions/job'
import { AnimatePresence, motion } from 'motion/react'

export default function JobBoard({ initialJobs }: { initialJobs: any[] }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [deadlineFilter, setDeadlineFilter] = useState("All")
    const [interviewFilter, setInterviewFilter] = useState("All")

    const filteredJobs = initialJobs.filter(job => {
        // Basic Search
        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase()
            const matchCompany = job.company?.toLowerCase().includes(lowerQ)
            const matchRole = job.role?.toLowerCase().includes(lowerQ)
            if (!matchCompany && !matchRole) return false
        }

        // Status Filter
        if (statusFilter !== "All" && job.status !== statusFilter) {
            return false
        }

        // Advanced: Deadline Filter
        if (deadlineFilter !== "All") {
            if (!job.applyBy) return false
            const daysToDeadline = (new Date(job.applyBy).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
            if (deadlineFilter === "3days" && (daysToDeadline > 3 || daysToDeadline < 0)) return false
            if (deadlineFilter === "7days" && (daysToDeadline > 7 || daysToDeadline < 0)) return false
        }

        // Advanced: Interview Scheduled
        if (interviewFilter !== "All") {
            const hasInterview = !!job.interviewDate
            if (interviewFilter === "Yes" && !hasInterview) return false
            if (interviewFilter === "No" && hasInterview) return false
        }

        return true
    })

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this job?")) {
            await deleteJobAction(id)
        }
    }

    const handleEdit = (job: any) => {
        // For editing, we ideally display the form. Here we can redirect or show an edit modal.
        // For simplicity, a future EditJobDialog could intercept this.
        alert("Edit functionality will open the Edit Modal filled with data.")
    }

    return (
        <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by company or role..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none appearance-none min-w-[160px]"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Saved">Saved</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors border ${showAdvanced ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/30' : 'bg-gray-50 dark:bg-zinc-950/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="hidden sm:inline">Advanced</span>
                        {showAdvanced ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                    </button>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                    {showAdvanced && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Deadline</label>
                                    <select
                                        value={deadlineFilter}
                                        onChange={(e) => setDeadlineFilter(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    >
                                        <option value="All">Any Time</option>
                                        <option value="3days">Expiring in 3 Days</option>
                                        <option value="7days">Expiring in 7 Days</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Interview Scheduled</label>
                                    <select
                                        value={interviewFilter}
                                        onChange={(e) => setInterviewFilter(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    >
                                        <option value="All">Any Status</option>
                                        <option value="Yes">Has Interview</option>
                                        <option value="No">No Interview</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Jobs Grid */}
            {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} onDelete={handleDelete} onEdit={handleEdit} />
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-12 text-center shadow-sm">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 mb-4">
                        <Filter className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">No jobs found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">
                        Try adjusting your filters or adding a new application to see them here.
                    </p>
                </div>
            )}
        </div>
    )
}
