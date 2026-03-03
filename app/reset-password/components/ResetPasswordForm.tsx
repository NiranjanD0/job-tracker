"use client"

import React, { useState, useActionState } from 'react'
import { Eye, EyeClosed, LockKeyhole } from 'lucide-react'
import { motion } from 'motion/react'
import { resetPasswordAction } from '@/app/actions/reset-password'
import Link from 'next/link'

export default function ResetPasswordForm({ token }: { token: string }) {
    const [state, formAction, isPending] = useActionState(resetPasswordAction, null)
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")

    if (state?.success) {
        return (
            <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 text-center shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Password Reset Successful</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Your password has been changed successfully. You can now log in with your new password.</p>
                <Link href="/login" className="inline-block px-6 py-3 rounded-lg text-white font-semibold bg-linear-to-r from-blue-400 to-pink-300 hover:from-blue-500 hover:to-pink-400 transition-colors">
                    Go to Login
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Set New Password</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Enter your new password below.</p>
            </div>

            <form action={formAction} className="flex flex-col gap-5">
                <input type="hidden" name="token" value={token} />

                {state?.error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-200 dark:border-red-800">
                        {state.error}
                    </div>
                )}

                <div className='relative group'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                        <LockKeyhole className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        required
                        placeholder='New Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full h-12 pl-12 pr-12 bg-gray-100 dark:bg-zinc-950/40 border border-gray-300 dark:border-zinc-800 rounded-lg text-black dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all'
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400'
                    >
                        {showPassword ? <EyeClosed className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                    </button>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isPending}
                    className={'w-full h-12 rounded-lg text-white font-semibold transition-all duration-200 bg-linear-to-r from-blue-400 to-pink-300 ' + (isPending ? 'opacity-70' : 'hover:from-blue-500 hover:to-pink-400')}
                >
                    {isPending ? "Resetting..." : "Reset Password"}
                </motion.button>
            </form>
        </div>
    )
}
