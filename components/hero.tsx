import React from 'react'
import FloatingLines from './ui/FloatingLines'

const Hero = () => {
    return (
        <div className='fixed max-h-screen w-full mx-auto flex justify-center items-center dark:bg-black bg-white overflow-hidden'>
            <FloatingLines
                enabledWaves={["top", "middle", "bottom"]}
                lineCount={5}
                lineDistance={5}
                bendRadius={5}
                bendStrength={-0.5}
                interactive={true}
                parallax={true}
            />
        </div>
    )
}

export default Hero
