"use client"
import React, { useState, useActionState, useEffect } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "motion/react"
import { X, Plus, Building2, MapPin, BriefcaseBusiness, Calendar, LinkIcon, FileText, CheckCircle2 } from "lucide-react"
import { addJobAction } from "@/app/actions/job"

export default function AddJobDialog() {
    const [open, setOpen] = useState(false)
    const [state, formAction, isPending] = useActionState(addJobAction, null)

    useEffect(() => {
        if (state?.success) {
            setOpen(false)
        }
    }, [state])

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className="flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-all hover:shadow-lg">
                    <Plus className="w-5 h-5" />
                    <span>Add Job</span>
                </button>
            </Dialog.Trigger>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] p-4"
                            >
                                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto w-full">
                                    <div className="flex justify-between items-center mb-6">
                                        <Dialog.Title className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            Track New Application
                                        </Dialog.Title>
                                        <Dialog.Close asChild>
                                            <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </Dialog.Close>
                                    </div>

                                    <form action={formAction} className="space-y-6">
                                        {state?.error && (
                                            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                                                {state.error}
                                            </div>
                                        )}

                                        {/* Core Details */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"><Building2 className="w-4 h-4" />Company Name</label>
                                                <input name="company" type="text" placeholder="e.g. Google" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"><BriefcaseBusiness className="w-4 h-4" />Role / Title</label>
                                                <input name="role" type="text" placeholder="e.g. Frontend Engineer" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Status</label>
                                                <select name="status" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none appearance-none">
                                                    <option value="Saved">Saved</option>
                                                    <option value="Applied">Applied</option>
                                                    <option value="Interviewing">Interviewing</option>
                                                    <option value="Offer">Offer</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"><MapPin className="w-4 h-4" />Location / Remote</label>
                                                <input name="location" type="text" placeholder="e.g. San Francisco or Remote" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                        </div>

                                        <div className="w-full border-t border-gray-200 dark:border-zinc-800" />

                                        {/* Links & IDs */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2 col-span-1 sm:col-span-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"><LinkIcon className="w-4 h-4" />Job Link</label>
                                                <input name="jobLink" type="url" placeholder="https://..." className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"><FileText className="w-4 h-4" />Job ID (Optional)</label>
                                                <input name="jobId" type="text" placeholder="e.g. REQ-1234" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"><FileText className="w-4 h-4" />CV Version</label>
                                                <input name="cvVersion" type="text" placeholder="e.g. Resume_v2.pdf" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                        </div>

                                        <div className="w-full border-t border-gray-200 dark:border-zinc-800" />

                                        {/* Dates & Extras */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"><Calendar className="w-4 h-4" />Applied On</label>
                                                <input name="appliedOn" type="date" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"><Calendar className="w-4 h-4" />Apply By / Deadline</label>
                                                <input name="applyBy" type="date" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"><Calendar className="w-4 h-4" />Interview Date</label>
                                                <input name="interviewDate" type="date" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Package (CTC)</label>
                                                <input name="package" type="text" placeholder="e.g. $120k - $150k" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                            <div className="space-y-2 sm:col-span-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Referral Info</label>
                                                <input name="referralInfo" type="text" placeholder="e.g. Referred by John Doe" className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end gap-3">
                                            <Dialog.Close asChild>
                                                <button type="button" className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors">
                                                    Cancel
                                                </button>
                                            </Dialog.Close>
                                            <button
                                                type="submit"
                                                disabled={isPending}
                                                className={"px-6 py-2.5 text-sm font-medium text-white bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-md transition-all " + (isPending ? "opacity-70 cursor-wait" : "")}
                                            >
                                                {isPending ? "Saving..." : "Save Job Application"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    )
}
