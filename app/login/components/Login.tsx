"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Eye, EyeClosed, Mail, LockKeyhole } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isForgotOpen, setIsForgotOpen] = useState(false)
    const [forgotEmail, setForgotEmail] = useState("")
    const [forgotStatus, setForgotStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [forgotMessage, setForgotMessage] = useState<string>("")
    const forgotEmailRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!isForgotOpen) return
        const t = window.setTimeout(() => forgotEmailRef.current?.focus(), 50)
        return () => window.clearTimeout(t)
    }, [isForgotOpen])

    useEffect(() => {
        if (!isForgotOpen) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeForgot()
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isForgotOpen])

    const submitForgotPassword = async () => {
        const email = forgotEmail.trim()
        if (!email) {
            setForgotStatus("error")
            setForgotMessage("Please enter your email.")
            return
        }

        setForgotStatus("loading")
        setForgotMessage("")
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })

            if (!res.ok) {
                throw new Error("Request failed")
            }

            setForgotStatus("success")
            setForgotMessage("If an account exists, you’ll receive a reset link shortly.")
        } catch {
            setForgotStatus("error")
            setForgotMessage("Something went wrong. Please try again.")
        }
    }

    const openForgot = () => {
        setIsForgotOpen(true)
        setForgotStatus("idle")
        setForgotMessage("")
    }

    const closeForgot = () => {
        setIsForgotOpen(false)
        setForgotStatus("idle")
        setForgotMessage("")
    }

    return (
        <>
        <form className='flex flex-col gap-5'>
                {/* Email Input */}
                <div className='relative group'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                        <Mail className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                    </div>
                    <input 
                        type="email" 
                        id='email' 
                        name='email' 
                        required 
                        placeholder='Email address' 
                        className='w-full h-12 pl-12 pr-4 bg-gray-100 dark:bg-zinc-950/40 border border-gray-300 dark:border-zinc-800 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    />
                </div>

                {/* Password Input */}
                <div className='relative group'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                        <LockKeyhole className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                    </div>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        id='password' 
                        name='password' 
                        required 
                        placeholder='Password' 
                        className='w-full h-12 pl-12 pr-12 bg-gray-100 dark:bg-zinc-950/40 border border-gray-300 dark:border-zinc-800 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    >
                        {showPassword ? <EyeClosed className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                    </button>
                </div>

                {/* Forgot Password */}
                <div className='flex justify-end -mt-2'>
                    <button 
                        type="button"
                        onClick={openForgot}
                        className='text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors'
                    >
                        Forgot password?
                    </button>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full h-12 rounded-lg bg-linear-to-r from-blue-400 to-pink-300 hover:from-blue-500 hover:to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
                >
                    Sign In
                </motion.button>
            </form>
            <AnimatePresence>
            {isForgotOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className='fixed inset-0 z-60 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-sm px-4'
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) closeForgot()
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className='w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-2xl p-6'
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className='mb-4'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Reset your password</h3>
                            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>Enter your email and we’ll send a reset link.</p>
                        </div>

                        <div className='relative group'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                                <Mail className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                            </div>
                            <input
                                type='email'
                                ref={forgotEmailRef}
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') submitForgotPassword()
                                }}
                                placeholder='Email address'
                                className='w-full h-12 pl-12 pr-4 bg-gray-100 dark:bg-zinc-950/40 border border-gray-300 dark:border-zinc-800 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                            />
                        </div>

                        {forgotMessage && (
                            <p className={'mt-2 text-xs ' + (forgotStatus === 'error' ? 'text-red-600' : 'text-gray-600 dark:text-gray-400')}>
                                {forgotMessage}
                            </p>
                        )}

                        <div className='mt-5 flex gap-3 justify-end'>
                            <button
                                type='button'
                                onClick={closeForgot}
                                className='px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors'
                            >
                                Cancel
                            </button>
                            <motion.button
                                type='button'
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={submitForgotPassword}
                                disabled={forgotStatus === 'loading'}
                                className={'px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-blue-400 to-pink-300 hover:from-blue-500 hover:to-pink-400 transition-colors ' + (forgotStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : '')}
                            >
                                {forgotStatus === 'loading' ? 'Sending…' : 'Send reset link'}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </>
    )
}

export default Login
