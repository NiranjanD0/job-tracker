import React from "react";
import { ChevronDown } from "lucide-react";
import { TextAnimate } from "./ui/text-animate";
import Threads from "./ui/Threads";

const Hero = () => {
    return (
        <div className="relative min-h-screen w-full mx-auto flex justify-center items-center overflow-hidden dark:bg-black bg-white">
            <div className="absolute inset-0 z-10 h-screen w-screen">
                <Threads
                    amplitude={1}
                    distance={0.2}
                />
            </div>

            <div className="flex items-center justify-center w-full flex-col px-4 mb-20 md:mb-0 z-20">
                <div className="mb-20">
                    <TextAnimate
                        animation="blurInUp"
                        by="character"
                        wrap="word"
                        once
                        duration={1}
                        as="h2"
                        className="bg-clip-text text-transparent text-center bg-linear-to-b from-blue-500 dark:from-blue-400 to-gray-400 dark:to-white text-5xl md:text-4xl lg:text-7xl font-geist py-2 md:py-7 relative z-20 font-bold tracking-tight">
                        {"Job hunting is chaotic.\nTracking it shouldn't be."}
                    </TextAnimate>
                    <TextAnimate
                        animation="blurInUp"
                        by="character"
                        once
                        duration={1}
                        delay={1}
                        className="md:max-w-2xl max-w-[310] mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center"
                    >
                        Keep every application, deadline, and update in one clean dashboard.
                    </TextAnimate>
                </div>
            </div>

            {/* Down Arrow */}
            <div className="absolute bottom-28 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
                <ChevronDown className="w-8 h-8 text-neutral-600 dark:text-neutral-400" />
            </div>
        </div>
    );
};

export default Hero;
