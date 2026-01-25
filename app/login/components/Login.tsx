"use client"
import React, { useState } from 'react'
import { Eye, EyeClosed, Mail, LockKeyhole } from 'lucide-react'
import { motion } from 'motion/react'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
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

                {/* Forgot Password */}
                <div className='flex justify-end -mt-2'>
                    <button 
                        type="button"
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
                    className='w-full h-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
                >
                    Sign In
                </motion.button>
            </form>
    )
}

export default Login
