import React, { useState } from 'react'

export const NavbarHome = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='flex fixed top-0 w-full justify-between items-center px-6 py-4 z-[100]'>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex font-kemco text-white gap-6 drop-shadow-md">
                <a href="#" className="hover:text-yellow-400 transition-colors">Home</a>
                <a href="#" className="hover:text-yellow-400 transition-colors">Character</a>
                <a href="#" className="hover:text-yellow-400 transition-colors">Gameplay</a>
                <a href="#" className="hover:text-yellow-400 transition-colors">Events</a>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
                className="md:hidden text-white z-[110] focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg className="w-8 h-8 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Fullscreen Menu */}
            {isOpen && (
                <div className="absolute top-0 left-0 w-full h-screen bg-black/95 flex flex-col items-center justify-center gap-8 font-kemco text-white z-[105] md:hidden">
                    <a href="#" onClick={() => setIsOpen(false)} className="text-3xl hover:text-yellow-400 transition-colors">Home</a>
                    <a href="#" onClick={() => setIsOpen(false)} className="text-3xl hover:text-yellow-400 transition-colors">Character</a>
                    <a href="#" onClick={() => setIsOpen(false)} className="text-3xl hover:text-yellow-400 transition-colors">Gameplay</a>
                    <a href="#" onClick={() => setIsOpen(false)} className="text-3xl hover:text-yellow-400 transition-colors">Events</a>
                </div>
            )}

            {/* CTA Button */}
            <div className="flex items-center justify-center z-[110]">
                <a className="btn-pixelated text-xs sm:text-sm md:text-base px-2 py-1 sm:px-4 sm:py-2">Play For Free</a>
            </div>
        </nav>
    )
}
