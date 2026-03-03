"use client"
import React, { useState } from 'react'
import * as Dialog from "@radix-ui/react-dialog"
import { Building2, BriefcaseBusiness, Calendar, DollarSign, Edit, Trash2, MapPin, LinkIcon, FileText, CheckCircle2, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { format } from 'date-fns'

interface Job {
    id: string
    userId: string
    company: string | null
    role: string | null
    location: string | null
    jobPostDate: Date | null
    applyBy: Date | null
    jobLink: string | null
    jobId: string | null
    cvVersion: string | null
    status: string | null
    appliedOn: Date | null
    type: string | null
    referralInfo: string | null
    package: string | null
    interviewDate: Date | null
    createdAt: Date
    updatedAt: Date
}

const statusColors: Record<string, string> = {
    Saved: "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-300",
    Applied: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    Interviewing: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    Offer: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    Rejected: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
}

export default function JobCard({ job, onDelete, onEdit }: { job: Job, onDelete: (id: string) => void, onEdit: (job: Job) => void }) {
    const [open, setOpen] = useState(false)
    const colorClass = statusColors[job.status || "Saved"] || statusColors["Saved"]

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        onDelete(job.id)
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        onEdit(job)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-gray-500" />
                                {job.company || "Not provided"}
                            </h3>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <BriefcaseBusiness className="w-4 h-4 text-gray-500" />
                                {job.role || "Not provided"}
                            </p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${colorClass}`}>
                            {job.status || "Saved"}
                        </span>
                    </div>

                    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                        {job.applyBy && (
                            <span className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-md">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(job.applyBy), "MMM d, yyyy")}
                            </span>
                        )}
                        {job.package && (
                            <span className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-md text-xs font-semibold">
                                <DollarSign className="w-3.5 h-3.5" />
                                {job.package}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-end pt-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={handleEdit}
                            className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </Dialog.Trigger>

            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] p-4">
                                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8 w-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {job.company || "Company Not provided"}
                                            </Dialog.Title>
                                            <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                                                {job.role || "Role Not provided"}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${colorClass}`}>
                                            {job.status || "Saved"}
                                        </span>
                                    </div>

                                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                        <DetailRow icon={<MapPin className="w-4.5 h-4.5" />} label="Location" value={job.location} />
                                        <DetailRow icon={<Calendar className="w-4.5 h-4.5" />} label="Job Post Date" value={job.jobPostDate ? format(new Date(job.jobPostDate), "PPP") : null} />
                                        <DetailRow icon={<Calendar className="w-4.5 h-4.5" />} label="Apply By" value={job.applyBy ? format(new Date(job.applyBy), "PPP") : null} />
                                        <DetailRow icon={<LinkIcon className="w-4.5 h-4.5" />} label="Job Link" value={job.jobLink ? <a href={job.jobLink} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline">Link</a> : null} />
                                        <DetailRow icon={<FileText className="w-4.5 h-4.5" />} label="Job ID" value={job.jobId} />
                                        <DetailRow icon={<FileText className="w-4.5 h-4.5" />} label="CV Version" value={job.cvVersion} />
                                        <DetailRow icon={<Calendar className="w-4.5 h-4.5" />} label="Applied On" value={job.appliedOn ? format(new Date(job.appliedOn), "PPP") : null} />
                                        <DetailRow icon={<BriefcaseBusiness className="w-4.5 h-4.5" />} label="Type" value={job.type} />
                                        <DetailRow icon={<Info className="w-4.5 h-4.5" />} label="Referral Info" value={job.referralInfo} />
                                        <DetailRow icon={<DollarSign className="w-4.5 h-4.5" />} label="Package (CTC)" value={job.package} />
                                        <DetailRow icon={<Calendar className="w-4.5 h-4.5" />} label="Interview Date" value={job.interviewDate ? format(new Date(job.interviewDate), "PPP") : null} />
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-gray-200 dark:border-zinc-800 flex justify-between gap-3">
                                        <div className="flex gap-2">
                                            <Dialog.Close asChild>
                                                <button onClick={() => onDelete(job.id)} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" /> Delete
                                                </button>
                                            </Dialog.Close>
                                            <Dialog.Close asChild>
                                                <button onClick={() => onEdit(job)} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" /> Edit
                                                </button>
                                            </Dialog.Close>
                                        </div>
                                        <Dialog.Close asChild>
                                            <button type="button" className="px-5 py-2 text-sm font-medium border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-inherit bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors">
                                                Close
                                            </button>
                                        </Dialog.Close>
                                    </div>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    )
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode | null | undefined }) {
    return (
        <div className="flex items-start gap-4">
            <div className="p-2 bg-gray-50 dark:bg-zinc-800/50 rounded-lg text-gray-500 dark:text-gray-400 shrink-0">
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
                <div className="mt-0.5 text-sm font-medium text-gray-900 dark:text-gray-200 break-words">
                    {value ? value : <span className="text-gray-400 italic font-normal">Not provided</span>}
                </div>
            </div>
        </div>
    )
}
