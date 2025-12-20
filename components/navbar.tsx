"use client"
import React from 'react'
import { Authenticated, UnAuthenticated } from './auth-guard'

const Navbar = () => {
    return (
        <>
            <div className='border'>This Dont need authentication</div>
            <Authenticated>
                <div>this need authentication. /dashbord etx etx</div>
            </Authenticated>
            <UnAuthenticated>
                This will only appear when not logged in
            </UnAuthenticated>
        </>
    )
}

export default Navbar
