import React from 'react'

export default function MarqueeSeparator() {
    return (
        <div className="relative overflow-hidden whitespace-nowrap w-full bg-amber-500 py-5 border-y-4 border-black z-50 flex">
            <div className="font-kemco text-xl text-black flex animate-marquee whitespace-nowrap min-w-max">
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="mx-4">
                        AVENGE THE VILLAGE <span className="mx-4">•</span> IGNITE THE RESISTANCE <span className="mx-4">•</span>
                    </span>
                ))}
            </div>
        </div>
    )
}
