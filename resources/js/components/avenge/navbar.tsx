import React from 'react'

export const NavbarHome = () => {
    return (
        <nav className='flex fixed top-0 min-w-screen justify-between p-4 z-[100]'>

            <div className="flex font-kemco text-white p-6 gap-3">
                <a href="#">Home</a>
                <a href="#">Character</a>
                <a href="#">Gameplay</a>
                <a href="#">Events</a>
            </div>

            <div className="flex items-center justify-center">
                <a className="btn-pixelated">Play For Free</a>
            </div>
        </nav>
    )
}
