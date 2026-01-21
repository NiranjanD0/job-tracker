import React from 'react'
import { signIn, useSession } from "next-auth/react"
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { Eye, EyeClosed, Mail, LockKeyhole, User } from 'lucide-react';
import { motion } from 'motion/react';

const Signup = () => {
    return (
        <form action="" className='flex flex-col mb-[-20]'>
            <div className='bg-[#e5e5e6] dark:bg-zinc-900 flex border dark:border-white/20 rounded-md mb-5 transition-colors'>
                <div className='flex justify-center items-center'>
                    <User className='w-6 h-6 m-2 ml-3' />
                </div>
                <input type="text" id='fullname' name='fullname' required placeholder='Full Name' className='h-12 w-full px-1 focus:outline-0 bg-transparent' />
            </div>
            <div className='bg-[#e5e5e6] dark:bg-zinc-900 flex border dark:border-white/20 rounded-md mb-5 transition-colors'>
                <div className='flex justify-center items-center'>
                    <Mail className='w-6 h-6 m-2 ml-3' />
                </div>
                <input type="email" id='email' name='email' required placeholder='Email' className='h-12 w-full px-1 focus:outline-0 bg-transparent' />
            </div>
            <div className='bg-[#e5e5e6] dark:bg-zinc-900 flex border dark:border-white/20 rounded-md mb-5 transition-colors'>
                <PasswordToggleField.Root>
                    <LockKeyhole className='w-7 h-8 my-2 mx-3' />
                    <PasswordToggleField.Input className='h-12 w-full px-1 focus:outline-0 bg-transparent' placeholder='Password' />
                    <PasswordToggleField.Toggle>
                        <PasswordToggleField.Icon
                            visible={<Eye />}
                            hidden={<EyeClosed />}
                            className='w-6 h-6 m-2 flex justify-center items-center' />
                    </PasswordToggleField.Toggle>
                </PasswordToggleField.Root>
            </div>
            <div className='bg-[#e5e5e6] dark:bg-zinc-900 flex border dark:border-white/20 rounded-md mb-5 transition-colors'>
                <PasswordToggleField.Root>
                    <LockKeyhole className='w-7 h-8 my-2 mx-3' />
                    <PasswordToggleField.Input className='h-12 w-full px-1 focus:outline-0 bg-transparent' placeholder='Confirm Password' />
                    <PasswordToggleField.Toggle>
                        <PasswordToggleField.Icon
                            visible={<Eye />}
                            hidden={<EyeClosed />}
                            className='w-6 h-6 m-2 flex justify-center items-center' />
                    </PasswordToggleField.Toggle>
                </PasswordToggleField.Root>
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='border dark:border-white/20 h-13 rounded-md bg-[#e5e5e6] dark:bg-zinc-900 transition-colors font-semibold'
            >
                Create Account
            </motion.button>
        </form>
    )
}

export default Signup
