import React from 'react'
import { signIn, useSession } from "next-auth/react"
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { Eye, EyeClosed, Mail, LockKeyhole } from 'lucide-react';

const Login = () => {
    return (
        <form action="" className='flex flex-col mb-[-20]'>
            <div className='bg-[#e5e5e6] dark:bg-zinc-900 flex border dark:border-white/20 rounded-md mb-5'>
                <div className='flex justify-center items-center'>
                    <Mail className='w-6 h-6 m-2 ml-3' />
                </div>
                <input type="email" id='email' name='email' required placeholder='Email' className='h-12 w-full px-1 focus:outline-0' />
            </div>
            <div className='bg-[#e5e5e6] dark:bg-zinc-900 flex border dark:border-white/20 rounded-md mb-5'>
                <PasswordToggleField.Root>
                    <LockKeyhole className='w-7 h-8 my-2 mx-3'/>
                    <PasswordToggleField.Input className='h-12 w-full px-1 focus:outline-0' placeholder='Password'/>
                    <PasswordToggleField.Toggle>
                        <PasswordToggleField.Icon
                            visible={<Eye />}
                            hidden={<EyeClosed />}
                            className='w-6 h-6 m-2 flex justify-center items-center' />
                    </PasswordToggleField.Toggle>
                </PasswordToggleField.Root>
            </div>
            <div className='flex justify-end'>
                <button className='text-sm opacity-70 text-right mb-1'>Forgot Password?</button>
            </div>
            <button type='submit'
                className='border dark:border-white/20 h-13 rounded-md bg-[#e5e5e6] dark:bg-zinc-900'
            >Submit</button>
        </form>
    )
}

export default Login
