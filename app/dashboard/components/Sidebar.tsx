import React from 'react'
import { Calendar, Clock, AlertCircle } from 'lucide-react'
import { format, differenceInDays, isPast, isToday, isTomorrow, addDays } from 'date-fns'

export default function Sidebar({ jobs }: { jobs: any[] }) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Upcoming Deadlines (within 3 days, not rejected)
    const upcomingDeadlines = jobs.filter(j => {
        if (!j.applyBy || j.status === 'Rejected') return false
        const deadline = new Date(j.applyBy)
        deadline.setHours(0, 0, 0, 0)
        const diff = differenceInDays(deadline, today)
        return diff >= 0 && diff <= 3
    }).sort((a, b) => new Date(a.applyBy).getTime() - new Date(b.applyBy).getTime())

    // Upcoming Interviews (within 7 days)
    const upcomingInterviews = jobs.filter(j => {
        if (!j.interviewDate) return false
        const interview = new Date(j.interviewDate)
        interview.setHours(0, 0, 0, 0)
        const diff = differenceInDays(interview, today)
        return diff >= 0 && diff <= 7
    }).sort((a, b) => new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime())

    const getDaysText = (date: Date) => {
        if (isToday(date)) return "Today"
        if (isTomorrow(date)) return "Tomorrow"
        return `In ${differenceInDays(date, today)} days`
    }

    return (
        <aside className="w-full flex-shrink-0 lg:w-80 space-y-6">

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Upcoming Deadlines
                </h3>
                {upcomingDeadlines.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingDeadlines.map(job => (
                            <div key={job.id} className="flex justify-between items-center group">
                                <div className="space-y-0.5 max-w-[70%]">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{job.company}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{job.role}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
                                        {getDaysText(new Date(job.applyBy))}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">No upcoming deadlines within 3 days.</p>
                )}
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    Upcoming Interviews
                </h3>
                {upcomingInterviews.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingInterviews.map(job => (
                            <div key={job.id} className="flex justify-between items-center group">
                                <div className="space-y-0.5 max-w-[70%]">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{job.company}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{job.role}</p>
                                    <p className="text-[10px] text-purple-600 dark:text-purple-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {format(new Date(job.interviewDate), "MMM d")}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded">
                                        {getDaysText(new Date(job.interviewDate))}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">No upcoming interviews this week.</p>
                )}
            </div>

        </aside>
    )
}
