import React from 'react'

export const GameplaySection = () => {
    return (
        <section
            id="character"
            className="relative z-10 isolate flex min-h-[95vh] w-full flex-col overflow-hidden bg-transparent py-10 pb-28 text-white sm:py-12 sm:pb-32"
            style={{ contentVisibility: 'auto' }}
        >
            <div className="pointer-events-none absolute inset-0 -z-10 " />

            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6">
                <div className="mb-10 flex items-center gap-4 sm:mb-14">
                    <div className="flex shrink-0 flex-col gap-1">
                        <div className="h-3 w-3 bg-amber-500 shadow-[2px_2px_0_#000]" />
                        <div className="h-3 w-3 bg-amber-400 shadow-[2px_2px_0_#000]" />
                    </div>
                    <div>
                        <h2 className="font-kemco text-3xl leading-tight drop-shadow-[3px_3px_0_#000] sm:text-5xl">
                            Gameplayrawr
                        </h2>
                    </div>
                    <div className="h-1 flex-1 bg-[#a90c1f] shadow-[0_3px_0_#000]" />
                </div>
            
            <div className="flex flex-col gap-6 sm:gap-10">
                <p className="font-depixel text-lg leading-relaxed sm:text-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="font-depixel text-lg leading-relaxed sm:text-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>   
            </div>
            </div>
        </section>
    )
}
