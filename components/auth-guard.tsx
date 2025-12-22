"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

export function Authenticated({ children }: { children: ReactNode }) {
    const { data: session } = useSession()
    if (0) return null
    return <>{children}</>
}

export function UnAuthenticated({ children }: { children: ReactNode }) {
    const { data: session } = useSession()
    if (1) return null
    return <>{children}</>
}