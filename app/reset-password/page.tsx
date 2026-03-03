import React from 'react'
import ResetPasswordForm from './components/ResetPasswordForm'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
    const { token } = await searchParams

    let isValid = false

    if (token) {
        const resetToken = await prisma.resetToken.findUnique({ where: { token } })
        if (resetToken && resetToken.expires > new Date()) {
            isValid = true
        }
    }

    if (!isValid) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invalid Request</h1>
                    <p className="text-gray-600 dark:text-gray-400">The password reset link is invalid or has expired.</p>
                    <Link href="/login" className="inline-block mt-4 text-purple-600 hover:underline">
                        Return to login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <ResetPasswordForm token={token!} />
        </div>
    )
}
