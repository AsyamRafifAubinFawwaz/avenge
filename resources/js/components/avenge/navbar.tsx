import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from '@/contexts/SmoothScrollContext'
import navbarBackground from '../../../assets/navbar_base.png'

export const NavbarHome = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navbarRef = useRef<HTMLElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLButtonElement>(null)
    const { scrollTo } = useSmoothScroll()
    const navItems = [
        { label: 'Home', href: '#home' },
        { label: 'Character', href: '#character' },
        { label: 'Gameplay', href: '#gameplay' },
        { label: 'Events', href: '#events' },
    ]

    const handleAnchorClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        const target = document.querySelector(href)

        if (!target) {
            return
        }

        event.preventDefault()

        scrollTo(target as HTMLElement, { offset: -80 })
        window.history.replaceState(null, '', href)
        setIsOpen(false)
    }

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 12)

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (!navbarRef.current || !isScrolled) {
            return
        }

        gsap.fromTo(
            navbarRef.current,
            { yPercent: -100 },
            { yPercent: 0, duration: 0.35, ease: 'power2.out' },
        )
    }, [isScrolled])

    useEffect(() => {
        const menu = mobileMenuRef.current
        if (!menu) {
            return
        }

        if (isOpen) {
            gsap.fromTo(
                menu,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.out' },
            )

            gsap.fromTo(
                menu.querySelectorAll('a'),
                { opacity: 0, y: 30, rotation: -5 },
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    duration: 0.5,
                    stagger: 0.12,
                    ease: 'back.out(1.2)',
                },
            )
        } else {
            gsap.to(menu, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => gsap.set(menu, { clearProps: 'all' }),
            })
        }
    }, [isOpen])

    useEffect(() => {
        if (!hamburgerRef.current) {
            return
        }

        gsap.to(hamburgerRef.current, {
            rotation: isOpen ? 90 : 0,
            duration: 0.3,
            ease: 'power2.out',
        })
    }, [isOpen])

    return (
        <nav
            ref={navbarRef}
            className={[
                'fixed top-0 z-[100] flex w-full items-center justify-between px-6 transition-all duration-300 ease-out',
                isScrolled ? 'py-2' : 'bg-transparent py-4',
            ].join(' ')}
        >
            {isScrolled && (
                <div
                    className="pointer-events-none absolute inset-0 z-0 -translate-y-2 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${navbarBackground})` }}
                    aria-hidden="true"
                />
            )}

            <div className="relative z-10 pl-12 hidden gap-8 font-kemco text-sm  tracking-[1px] text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.5)] md:flex">
                {navItems.map(({ label, href }) => (
                    <a
                        key={label}
                        href={href}
                        onClick={(event) => handleAnchorClick(event, href)}
                        className="group relative transition-colors hover:text-[#f6b100]"
                        onMouseEnter={(event) => gsap.to(event.currentTarget, { y: -3, duration: 0.2, ease: 'power2.out' })}
                        onMouseLeave={(event) => gsap.to(event.currentTarget, { y: 0, duration: 0.2, ease: 'power2.out' })}
                    >
                        {label}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#f6b100] transition-all group-hover:w-full" />
                    </a>
                ))}
            </div>

            <button
                ref={hamburgerRef}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={(event) => gsap.to(event.currentTarget, { rotation: 90, duration: 0.2, ease: 'power2.out' })}
                onMouseLeave={(event) => gsap.to(event.currentTarget, { rotation: 0, duration: 0.2, ease: 'power2.out' })}
                className="relative z-[110] text-white focus:outline-none md:hidden"
                aria-label="Toggle menu"
            >
                <svg className="h-8 w-8 drop-shadow-md transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {isOpen && (
                <div
                    ref={mobileMenuRef}
                    className="fixed inset-0 z-[105] flex flex-col items-center justify-center gap-8 bg-[#180507]/95 font-kemco text-3xl text-white md:hidden"
                >
                    {navItems.map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            onClick={(event) => handleAnchorClick(event, href)}
                            className="group relative transition-colors hover:text-[#f6b100]"
                        >
                            {label}
                        </a>
                    ))}
                </div>
            )}

            <a
                href="#home"
                onClick={(event) => handleAnchorClick(event, '#home')}
                className="pixel-button pixel-button--amber relative z-110 px-4 py-1.5 text-xs transition-all active:scale-[0.98] sm:px-5 sm:py-2 sm:text-sm md:text-base"
                onMouseEnter={(event) => gsap.to(event.currentTarget, { scale: 1.08, duration: 0.2, ease: 'power2.out' })}
                onMouseLeave={(event) => gsap.to(event.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' })}
            >
                Play For Free
            </a>
        </nav>
    )
}
