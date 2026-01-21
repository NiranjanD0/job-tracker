import React from 'react'
import { BackgroundLines } from './ui/background-lines'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
    return (
        <div className='fixed h-screen w-full mx-auto flex justify-center items-center overflow-hidden dark:bg-black bg-white relative'>
            <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
                <h2 className="bg-clip-text text-transparent text-center bg-linear-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                    Job hunting is chaotic.<br />Tracking it shouldn't be.
                </h2>
                <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                    Keep every application, deadline, and update in one clean dashboard.
                </p>
            </BackgroundLines>
            
            {/* Down Arrow */}
            <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
                <ChevronDown className='w-8 h-8 text-neutral-600 dark:text-neutral-400' />
            </div>
        </div>
    )
}

export default Hero
