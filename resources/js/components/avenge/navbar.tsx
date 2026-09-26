import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export const NavbarHome = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLButtonElement>(null)

    // Scroll detection with smoother transitions
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 12)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // GSAP Mobile Menu Animation - IMPROVED
    useEffect(() => {
        const menu = mobileMenuRef.current
        if (!menu) return

        if (isOpen) {
            // Animate menu container with backdrop blur
            gsap.fromTo(
                menu,
                { 
                    opacity: 0,
                    backdropFilter: 'blur(0px)'
                },
                {
                    opacity: 1,
                    backdropFilter: 'blur(4px)',
                    duration: 0.4,
                    ease: 'power2.out',
                }
            )

            // Animate menu items with stagger
            gsap.fromTo(
                menu.querySelectorAll('a'),
                { 
                    opacity: 0, 
                    y: 30,
                    rotation: -5
                },
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    duration: 0.5,
                    stagger: 0.12,
                    ease: 'back.out(1.2)',
                }
            )
        } else {
            gsap.to(menu, {
                opacity: 0,
                backdropFilter: 'blur(0px)',
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set(menu, { clearProps: 'all' })
                },
            })
        }
    }, [isOpen])

    // Hamburger icon animation
    useEffect(() => {
        if (hamburgerRef.current) {
            gsap.to(hamburgerRef.current, {
                rotation: isOpen ? 90 : 0,
                duration: 0.3,
                ease: 'power2.out'
            })
        }
    }, [isOpen])

    const closeMobileMenu = () => setIsOpen(false)

    return (
        <nav
            className={[
                'fixed top-0 z-[100] flex w-full items-center justify-between px-6 transition-all duration-300 ease-out',
                isScrolled
                    ? ' py-2 shadow-lg'
                    : 'bg-transparent py-4',
            ].join(' ')}
        >
            {/* Desktop Menu dengan Hover Animation */}
            <div
                className={[
                    'hidden gap-8 font-kemco text-sm tracking-[1px] drop-shadow-[0_2px_0_rgba(0,0,0,0.5)] md:flex',
                    isScrolled ? 'text-black' : 'text-white',
                ].join(' ')}
            >
                {['Home', 'Character', 'Gameplay', 'Events'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="group relative transition-colors hover:text-[#f6b100]"
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                y: -3,
                                duration: 0.2,
                                ease: 'power2.out'
                            })
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                y: 0,
                                duration: 0.2,
                                ease: 'power2.out'
                            })
                        }}
                    >
                        {item}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#f6b100] transition-all group-hover:w-full" />
                    </a>
                ))}
            </div>

            {/* Mobile Hamburger dengan Icon Animation */}
            <button
                ref={hamburgerRef}
                onClick={() => setIsOpen(!isOpen)}
                className={[
                    'z-[110] focus:outline-none md:hidden',
                    isScrolled ? 'text-black' : 'text-white',
                ].join(' ')}
                aria-label="Toggle menu"
            >
                <svg
                    className="h-8 w-8 drop-shadow-md transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Menu dengan Better Animation */}
            {isOpen && (
                <div
                    ref={mobileMenuRef}
                    className="fixed inset-0 z-[105] flex flex-col items-center justify-center gap-8 bg-[#180507]/95 font-kemco text-3xl text-white md:hidden"
                >
                    {['Home', 'Character', 'Gameplay', 'Events'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={closeMobileMenu}
                            className="group relative transition-colors hover:text-[#f6b100]"
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, {
                                    x: 10,
                                    duration: 0.2,
                                    ease: 'power2.out'
                                })
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.currentTarget, {
                                    x: 0,
                                    duration: 0.2,
                                    ease: 'power2.out'
                                })
                            }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            )}

            <a
                href="#play"
                className={[
                    'btn-pixelated z-[110] px-4 py-1.5 text-xs transition-all active:scale-[0.98] sm:px-5 sm:py-2 sm:text-sm md:text-base relative overflow-hidden',
                    isScrolled
                        ? 'bg-[#180507] text-[#f6b100] shadow-[3px_3px_0_#000]'
                        : 'bg-[#f6b100] text-[#180507] shadow-[3px_3px_0_#000]',
                ].join(' ')}
                onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                        scale: 1.08,
                        duration: 0.2,
                        ease: 'power2.out'
                    })
                }}
                onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.2,
                        ease: 'power2.out'
                    })
                }}
            >
                Play For Free
            </a>
        </nav>
    )
}