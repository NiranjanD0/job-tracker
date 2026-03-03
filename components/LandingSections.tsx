"use client"
import React from 'react'
import { motion } from 'motion/react'
import { LayoutDashboard, TrendingUp, BarChart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const LandingSections = () => {
  return (
    <div className="w-full bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Problem Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The Job Search is Broken</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Applying to hundreds of jobs without organization leads to missed opportunities, forgotten interviews, and endless frustration. Spreadsheets are clunky, and standard trackers are too complex.
          </p>
        </motion.div>
        <div className="w-full aspect-video md:aspect-[21/9] bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center">
            <span className="text-gray-400 text-sm md:text-base">[ Screenshot/GIF of the messy spreadsheet vs clean dashboard ]</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-950 border-y border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need, nothing you don't</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Minimalist features focused on getting you hired.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Visual Dashboard", desc: "See your entire job pipeline at a glance.", icon: LayoutDashboard },
              { title: "Smart Tracking", desc: "Log interviews, assignments, and offers easily.", icon: TrendingUp },
              { title: "Actionable Insights", desc: "Understand your callback rates and success metrics.", icon: BarChart }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-black p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How it works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Three simple steps to gain full control over your job search journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
                {[
                    { num: "01", title: "Add Applications", desc: "Paste the job URL and we pull in the key details instantly." },
                    { num: "02", title: "Move Through Stages", desc: "Drag and drop applications from 'Applied' to 'Interviewing' to 'Offer'." },
                    { num: "03", title: "Land the Job", desc: "Stay on top of deadlines and follow-ups to close the deal." }
                ].map((step, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        className="flex gap-6"
                    >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-lg font-bold text-gray-400">
                            {step.num}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="w-full aspect-square md:aspect-[4/3] bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400 text-sm md:text-base">[ GIF of drag-and-drop board ]</span>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 mb-12">
        <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto bg-linear-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 p-12 md:p-16 rounded-3xl border border-gray-200 dark:border-zinc-800 text-center relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/50 dark:to-black/50 pointer-events-none"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Ready to organize your job hunt?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
                    Join thousands of job seekers who are landing offers faster with better tracking.
                </p>
                <Link 
                    href="/login" 
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gray-900 dark:bg-white dark:text-black rounded-full hover:scale-105 transition-transform gap-2 shadow-lg"
                >
                    Get Started for Free <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
      </section>
    </div>
  )
}

export default LandingSections
