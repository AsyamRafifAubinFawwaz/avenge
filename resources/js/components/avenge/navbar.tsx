import { gsap } from 'gsap'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from '@/contexts/SmoothScrollContext'
import navbarBackground from '../../../assets/navbar_base.png'
import logoAvenge from '../../../assets/logo_avenge.png'

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Story', href: '#story' },
    { label: 'About', href: '#about' },
    { label: 'Character', href: '#character' },
    { label: 'Gameplay', href: '#gameplay' },
    { label: 'Article', href: '#article' },
]

// Hover cuma jalan di device yang beneran punya hover (bukan layar sentuh)
const canHover = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover)').matches

const hoverProps = (to: gsap.TweenVars, back: gsap.TweenVars) => ({
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        if (canHover()) gsap.to(e.currentTarget, { ...to, duration: 0.2, ease: 'power2.out' })
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        if (canHover()) gsap.to(e.currentTarget, { ...back, duration: 0.2, ease: 'power2.out' })
    },
})

export const NavbarHome = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navbarRef = useRef<HTMLElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const { scrollTo } = useSmoothScroll()

    const closeMenu = useCallback(() => {
        document.body.style.overflow = ''
        setIsOpen(false)
    }, [])

    const handleAnchorClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        const target = document.querySelector(href)

        if (!target) {
            event.preventDefault()
            closeMenu()
            window.location.assign(`/${href}`)
            return
        }

        event.preventDefault()
        closeMenu() // unlock scroll dulu biar scrollTo gak keblok
        scrollTo(target as HTMLElement, { offset: -80 })
        window.history.replaceState(null, '', href)
    }

    // Efek navbar saat scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 12)
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (!navbarRef.current || !isScrolled) return

        gsap.fromTo(
            navbarRef.current,
            { yPercent: -100 },
            {
                yPercent: 0,
                duration: 0.35,
                ease: 'power2.out',
                clearProps: 'transform', // jangan ninggalin transform
            },
        )
    }, [isScrolled])

    // Animasi buka/tutup menu mobile (elemen selalu ter-mount)
    useEffect(() => {
        const menu = mobileMenuRef.current
        if (!menu) return

        const links = menu.querySelectorAll('a')
        gsap.killTweensOf([menu, links])

        if (isOpen) {
            document.body.style.overflow = 'hidden'
            gsap.to(menu, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
            gsap.fromTo(
                links,
                { opacity: 0, y: 30, rotation: -5 },
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'back.out(1.2)',
                },
            )
        } else {
            gsap.to(menu, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' })
        }
    }, [isOpen])

    // Tutup pakai Escape, dan auto tutup kalau layar melebar ke desktop
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu()
        const mq = window.matchMedia('(min-width: 768px)')
        const onChange = (e: MediaQueryListEvent) => e.matches && closeMenu()

        window.addEventListener('keydown', onKey)
        mq.addEventListener('change', onChange)
        return () => {
            window.removeEventListener('keydown', onKey)
            mq.removeEventListener('change', onChange)
            document.body.style.overflow = ''
        }
    }, [closeMenu])

    return (
        <>
            <nav
                ref={navbarRef}
                className={[
                    'fixed top-0 z-[100] flex w-full items-center justify-between px-4 sm:px-6 transition-[padding] duration-300 ease-out',
                    isScrolled ? 'py-2' : 'bg-transparent py-3 sm:py-4',
                ].join(' ')}
            >
                {isScrolled && (
                    <div
                        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat shadow-2xl"
                        style={{ backgroundImage: `url(${navbarBackground})` }}
                        aria-hidden="true"
                    />
                )}

                {/* Kiri: logo (selalu tampil) + link (desktop aja) */}
                <div className="relative z-10 flex items-center gap-8 font-kemco text-sm tracking-[1px] text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.5)] md:pl-12">
                    <a
                        href="#home"
                        onClick={(event) => handleAnchorClick(event, '#home')}
                        className="transition-colors hover:text-[#f6b100]"
                        {...hoverProps({ y: -3 }, { y: 0 })}
                    >
                        <img className="pixelated h-8 sm:h-10" src={logoAvenge} alt="Avenge" />
                    </a>

                    <div className="hidden items-center gap-8 md:flex">
                        {navItems.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                onClick={(event) => handleAnchorClick(event, href)}
                                className="group relative transition-colors hover:text-[#f6b100]"
                                {...hoverProps({ y: -3 }, { y: 0 })}
                            >
                                {label}
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#f6b100] transition-all group-hover:w-full" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                    <a
                        href="https://avengetrial.vercel.app/"
                        target="_blank"
                        className="pixel-button hidden md:block pixel-button--amber whitespace-nowrap px-3 py-1.5 text-xs transition-all active:scale-[0.98] sm:px-5 sm:py-2 sm:text-sm md:text-base"
                        {...hoverProps({ scale: 1.08 }, { scale: 1 })}
                    >
                        Play Trial Demo
                    </a>

                    <button
                        onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
                        className="flex h-10 w-10 items-center justify-center text-white focus:outline-none md:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        <svg className="h-8 w-8 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Overlay di LUAR <nav> biar fixed-nya bener-bener full layar */}
            <div
                ref={mobileMenuRef}
                data-lenis-prevent
                style={{ visibility: 'hidden', opacity: 0 }}
                className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-6 overflow-y-auto bg-[#180507]/95 px-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] font-kemco text-2xl text-white sm:text-3xl md:hidden"
            >
                {navItems.map(({ label, href }) => (
                    <a
                        key={label}
                        href={href}
                        onClick={(event) => handleAnchorClick(event, href)}
                        className="transition-colors active:text-[#f6b100]"
                    >
                        {label}
                    </a>
                ))}
                  <a
                        href="https://avengetrial.vercel.app/"
                        target="_blank"
                        className="pixel-button md:hidden pixel-button--amber whitespace-nowrap px-3 py-1.5 text-xs transition-all active:scale-[0.98] sm:px-5 sm:py-2 sm:text-sm md:text-base"
                        {...hoverProps({ scale: 1.08 }, { scale: 1 })}
                    >
                        Play Trial Demo
                    </a>
            </div>
        </>
    )
}