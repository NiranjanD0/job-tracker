import React from 'react'
import { Briefcase, Calendar, CheckCircle, Percent } from 'lucide-react'

export default function DashboardMetrics({ jobs }: { jobs: any[] }) {
    const totalJobs = jobs.length
    const interviews = jobs.filter(j => j.status === 'Interviewing').length
    const offers = jobs.filter(j => j.status === 'Offer').length

    // Response Rate: (interviews + offers) / total jobs * 100
    const responseRate = totalJobs > 0 ? Math.round(((interviews + offers) / totalJobs) * 100) : 0

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-full">
            <StatCard icon={<Briefcase />} label="Total Jobs" value={totalJobs} color="text-blue-600 dark:text-blue-400" bg="bg-blue-50 dark:bg-blue-900/20" />
            <StatCard icon={<Calendar />} label="Interviews" value={interviews} color="text-purple-600 dark:text-purple-400" bg="bg-purple-50 dark:bg-purple-900/20" />
            <StatCard icon={<CheckCircle />} label="Offers" value={offers} color="text-green-600 dark:text-green-400" bg="bg-green-50 dark:bg-green-900/20" />
            <StatCard icon={<Percent />} label="Response Rate" value={`${responseRate}%`} color="text-orange-600 dark:text-orange-400" bg="bg-orange-50 dark:bg-orange-900/20" />
        </div>
    )
}

function StatCard({ icon, label, value, color, bg }: any) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col justify-center sm:flex-row sm:justify-start items-center sm:items-center gap-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all">
            <div className={`p-3.5 rounded-xl ${bg} ${color}`}>
                {React.cloneElement(icon, { className: 'w-6 h-6' })}
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{value}</p>
            </div>
        </div>
    )
}
