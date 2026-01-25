"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeClosed, Mail, LockKeyhole, User } from 'lucide-react'
import { motion } from 'motion/react'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const isMismatch = confirmPassword.length > 0 && password !== confirmPassword

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isMismatch) {
            return
        }
        // TODO: Implement actual signup submission
    }

    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                {/* Full Name Input */}
                <div className='relative group'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                        <User className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                    </div>
                    <input 
                        type="text" 
                        id='fullname' 
                        name='fullname' 
                        required 
                        placeholder='Full name' 
                        className='w-full h-12 pl-12 pr-4 bg-gray-100 dark:bg-zinc-950/40 border border-gray-300 dark:border-zinc-800 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                    />
                </div>

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
                        className='w-full h-12 pl-12 pr-4 bg-gray-100 dark:bg-zinc-950/40 border border-gray-300 dark:border-zinc-800 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full h-12 pl-12 pr-12 bg-gray-100 dark:bg-zinc-950/40 border border-gray-300 dark:border-zinc-800 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    >
                        {showPassword ? <EyeClosed className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                    </button>
                </div>

                {/* Confirm Password Input */}
                <div>
                <div className='relative group'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                        <LockKeyhole className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                    </div>
                    <input 
                        type={showConfirmPassword ? 'text' : 'password'}
                        id='confirmPassword' 
                        name='confirmPassword' 
                        required 
                        placeholder='Confirm password' 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        aria-invalid={isMismatch}
                        className={'w-full h-12 pl-12 pr-12 bg-gray-100 dark:bg-zinc-950/40 border rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none transition-all duration-200 ' + (isMismatch ? 'border-red-500 dark:border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 dark:border-zinc-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    >
                        {showConfirmPassword ? <EyeClosed className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                    </button>
                </div>
                <p className={'mt-1 text-xs text-red-600 ' + (isMismatch ? 'opacity-100' : 'opacity-0')}>
                    Passwords do not match
                </p>
                </div>

                {/* Terms and Conditions */}
                <div className='flex items-start gap-2 -mt-2'>
                    <input 
                        type="checkbox" 
                        id="terms" 
                        required
                        className='mt-1 w-4 h-4 accent-purple-600'
                    />
                    <label htmlFor="terms" className='text-sm text-gray-600 dark:text-gray-400'>
                        I agree to the{' '}
                        <Link href="/terms" target="_blank" rel="noopener noreferrer" className='text-purple-600 dark:text-purple-400 hover:underline'>
                            Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className='text-purple-600 dark:text-purple-400 hover:underline'>
                            Privacy Policy
                        </Link>
                    </label>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isMismatch}
                    className={'w-full h-12 rounded-lg bg-linear-to-r bg-linear-to-r from-blue-400 to-pink-300 hover:from-blue-500 hover:to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200' + (isMismatch ? 'opacity-60 cursor-not-allowed' : '')}
                >
                    Create Account
                </motion.button>
            </form>
    )
}

export default Signup
