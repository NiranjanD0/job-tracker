"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

export function Authenticated({ children }: { children: ReactNode }) {
    const { data: session } = useSession()
    if (!session) return null
    return <>{children}</>
}

export function UnAuthenticated({ children }: { children: ReactNode }) {
    const { data: session } = useSession()
    if (session) return null
    return <>{children}</>
}