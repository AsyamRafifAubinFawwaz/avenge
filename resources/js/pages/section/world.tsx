import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';

import Story1 from '../../../assets/story/1.webp';
import Story3 from '../../../assets/story/3.webp';
import Story4 from '../../../assets/story/4.webp';
import Story8 from '../../../assets/story/8.webp';
import cornerCerita from '../../../assets/corner_cerita_aku_pengen_pulkam.png';
import WorldImage from '../../../assets/WORLD.png';
import bukuOverlayModal from '../../../assets/buku_modal.png';

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
    title: string;
    image: string;
    text: string;
};

const CHAPTERS: Chapter[] = [
    {
        title: 'The Ashes of Vale',
        image: Story1,
        text: 'Deep within the mountain valley, a peaceful village was reduced to cinder and ruin by the ruthless legions of King Avhes, a tyrant driven by insatiable greed and cruelty. Among the slaughter, a young man named Ifaruz watched his family and home perish in flames. As the smoke settled over the blood-soaked earth, his grief hardened into a fierce, unyielding vow of retribution.',
    },
    {
        title: 'The Dying Dynasty',
        image: Story3,
        text: 'Kneeling beside the village elder as his final breath faded, Ifaruz swore to erase King Avhes and his reign of terror from the realm. With his last strength, the elder imparted one final hope: Ifaruz must venture deep into the uncharted mountain forests to seek Zawwaf, a legendary warrior who once stood against the darkest threats. Bound by his oath, Ifaruz left the burning valley behind to find the master.',
    },
    {
        title: 'Forged in Darkness',
        image: Story4,
        text: 'Ten relentless years passed beneath the dense canopy of the mountain wilderness. Under Zawwaf’s brutal and unforgiving discipline, Ifaruz mastered the deadly arts of melee combat and arcane magic. Every strike, every spell, and every scar was fueled by the memory of the valley, forging him into a formidable weapon of vengeance.',
    },
    {
        title: 'The Relic of Yor Bijan',
        image: Story8,
        text: 'With his training complete and the hour of reckoning at hand, Zawwaf presented Ifaruz with an ancient ancestral heirloom—a mystical staff forged by their progenitor, Yor Bijan. Channeling the residual power of the Pearl of Yor, the artifact stands ready to amplify his arcane might. Armed with supreme mastery and ancestral power, Ifaruz steps out of the shadows, ready to exact ultimate vengeance upon King Avhes.',
    },
];

// Aset corner aslinya buat pojok KANAN ATAS. Pojok lain tinggal di-flip.
// Digeser sedikit ke luar biar nempel di pojok frame.
const CORNERS = [
    { key: 'tl', pos: '-top-1.5 -left-1.5', flip: '-scale-x-100' },
    { key: 'tr', pos: '-top-1.5 -right-1.5', flip: '' },
    { key: 'br', pos: '-bottom-1.5 -right-1.5', flip: '-scale-y-100' },
    { key: 'bl', pos: '-bottom-1.5 -left-1.5', flip: 'scale-[-1]' },
];

const EMBERS = Array.from({ length: 18 }, (_, i) => i);
const CORNER_OFF = { x: 6, y: -6, opacity: 0.25 };
const CORNER_ON = { x: 0, y: 0, opacity: 1 };

// Lebar kartu normal & pas di-hover (melebar dikit)
const CARD_W = 205;
const CARD_W_HOVER = 232;

// ---- Pengaturan buku (sesuaikan kalau ukuran/posisi lubang di PNG beda) ----
// Rasio lebar/tinggi buku_modal.png (kira-kira 650x345)
const BOOK_RATIO = 1.884;
// Area gambar (lubang kanan buku). Sengaja sedikit lebih besar dari lubang
// supaya tepi gambar tertutup tepi kertas robek dari PNG.
const BOOK_IMAGE_AREA = 'left-[50%] right-[4%] top-[6%] bottom-[9%]';
// Area teks (halaman kiri)
const BOOK_TEXT_AREA = 'left-[7.5%] top-[10%] bottom-[12%] w-[40%]';

const prefersReduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = () => window.matchMedia('(hover: hover)').matches;
const WIDE_QUERY = '(min-width: 1024px)';

// clip-path yang pas menutupi kartu (buat efek modal "mekar" dari kartu)
const insetFromCard = (panel: HTMLElement, card: HTMLElement) => {
    const p = panel.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const t = Math.max(0, c.top - p.top);
    const l = Math.max(0, c.left - p.left);
    const r = Math.max(0, p.right - c.right);
    const b = Math.max(0, p.bottom - c.bottom);

    return `inset(${t}px ${r}px ${b}px ${l}px)`;
};

function Words({ text }: { text: string }) {
    return (
        <>
            {text.split(/(\s+)/).map((word, i) =>
                /\s+/.test(word) ? (
                    word
                ) : (
                    <span key={i} data-story-word className="inline-block">
                        {word}
                    </span>
                ),
            )}
        </>
    );
}

function Dots({
    active,
    onSelect,
    tone = 'light',
}: {
    active: number;
    onSelect: (i: number) => void;
    tone?: 'light' | 'dark';
}) {
    const dark = tone === 'dark';

    return (
        <div className="flex items-center gap-1">
            {CHAPTERS.map((c, i) => (
                <button
                    key={c.title}
                    type="button"
                    onClick={() => onSelect(i)}
                    aria-label={`Chapter ${i + 1}: ${c.title}`}
                    aria-current={i === active}
                    className="grid place-items-center w-6 h-6 cursor-pointer"
                >
                    {i === active ? (
                        <span
                            className={`block w-3 h-3 rotate-45 border p-0.5 ${dark ? 'border-[#7a2a0e]' : 'border-[#ffb400]'}`}
                        >
                            <span className={`block w-full h-full ${dark ? 'bg-[#7a2a0e]' : 'bg-[#ffb400]'}`} />
                        </span>
                    ) : (
                        <span
                            className={`block w-1.5 h-1.5 ${
                                dark ? 'bg-[#5a3a1e66] hover:bg-[#5a3a1eb3]' : 'bg-[#ffffff59] hover:bg-[#ffffffb3]'
                            }`}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" shapeRendering="crispEdges" aria-hidden="true">
            <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
        </svg>
    );
}

export default function StorySection() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    const [bgIdx, setBgIdx] = useState(0);
    const [pageDirection, setPageDirection] = useState<'next' | 'prev' | null>(null);
    const [turningChapter, setTurningChapter] = useState<Chapter | null>(null);
    const [isWide, setIsWide] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(WIDE_QUERY).matches,
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const embersRef = useRef<HTMLDivElement>(null);

    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    const openerRef = useRef<HTMLElement | null>(null);
    const firstOpenRef = useRef(false);
    const closingRef = useRef(false);
    const openIdxRef = useRef<number | null>(null);
    const closeRef = useRef<() => void>(() => {});

    openIdxRef.current = openIdx;

    const isOpen = openIdx !== null;
    const total = CHAPTERS.length;
    const chapter = openIdx !== null ? CHAPTERS[openIdx] : null;

    const getCard = (i: number) =>
        cardsRef.current?.querySelectorAll<HTMLElement>('[data-story-card]')[i] ?? null;

    // Pantau lebar layar: desktop = modal buku, selain itu = modal biasa
    useEffect(() => {
        const mq = window.matchMedia(WIDE_QUERY);
        const onChange = () => setIsWide(mq.matches);

        onChange();
        mq.addEventListener('change', onChange);

        return () => mq.removeEventListener('change', onChange);
    }, []);

    // ---------- kartu: hover / fokus ----------
    const lockCard = (card: HTMLElement, on: boolean) => {
        if (!canHover()) {
            return;
        }

        const reduce = prefersReduce();

        gsap.to(card.querySelectorAll('[data-corner]'), {
            ...(on ? CORNER_ON : CORNER_OFF),
            duration: reduce ? 0 : on ? 0.35 : 0.25,
            ease: on ? 'steps(4)' : 'steps(3)',
            stagger: on && !reduce ? 0.05 : 0,
            overwrite: 'auto',
        });
        gsap.to(card, {
            y: on ? -8 : 0,
            maxWidth: on ? CARD_W_HOVER : CARD_W,
            duration: reduce ? 0 : 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
        });
    };

    const onCardPointer = (i: number, on: boolean) => (e: PointerEvent<HTMLButtonElement>) => {
        if (e.pointerType !== 'mouse') {
            return;
        }

        lockCard(e.currentTarget, on);

        if (on) {
            setBgIdx(i);
        }
    };

    const onCardFocus = (i: number, on: boolean) => (e: FocusEvent<HTMLButtonElement>) => {
        if (on && !e.currentTarget.matches(':focus-visible')) {
            return;
        }

        lockCard(e.currentTarget, on);

        if (on) {
            setBgIdx(i);
        }
    };

    // ---------- modal: buka / tutup / ganti chapter ----------
    const openChapter = (i: number, el: HTMLElement) => {
        openerRef.current = el;
        firstOpenRef.current = true;
        setBgIdx(i);
        setOpenIdx(i);
    };

    const switchTo = (i: number) => {
        if (closingRef.current || openIdxRef.current === null) {
            return;
        }

        const target = (i + total) % total;

        if (target === openIdxRef.current) {
            return;
        }

        setPageDirection(i > openIdxRef.current ? 'next' : 'prev');
        setTurningChapter(isWide ? CHAPTERS[openIdxRef.current] : null);
        setBgIdx(target);
        setOpenIdx(target);
    };

    const requestClose = () => {
        const idx = openIdxRef.current;
        const panel = panelRef.current;
        const backdrop = backdropRef.current;

        if (closingRef.current || idx === null || !panel || !backdrop) {
            return;
        }

        closingRef.current = true;

        const reduce = prefersReduce();
        const card = getCard(idx);
        const opener = openerRef.current;

        const tl = gsap.timeline({
            onComplete: () => {
                closingRef.current = false;
                setTurningChapter(null);
                setOpenIdx(null);
                (card ?? opener)?.focus({ preventScroll: true });
            },
        });

        if (card && !reduce && isWide) {
            tl.to(panel.querySelectorAll('[data-book-text], [data-modal-img]'), {
                opacity: 0,
                duration: 0.2,
                ease: 'none',
            })
                .to(panel, {
                    rotationY: -72,
                    rotationX: 8,
                    transformOrigin: 'left center',
                    x: 36,
                    scale: 0.84,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power3.in',
                })
                .to(backdrop, { opacity: 0, duration: 0.3, ease: 'none' }, '-=0.3');
        } else if (card && !reduce) {
            tl.to(panel, {
                clipPath: insetFromCard(panel, card),
                duration: 0.5,
                ease: 'power3.inOut',
            }).to(backdrop, { opacity: 0, duration: 0.3, ease: 'none' }, 0.2);
        } else {
            tl.to([panel, backdrop], { opacity: 0, duration: reduce ? 0 : 0.25 });
        }
    };

    closeRef.current = requestClose;

    // Intro kartu: naik satu per satu pas section kelihatan
    useEffect(() => {
        const stage = cardsRef.current;

        if (!stage) {
            return;
        }

        gsap.set(stage.querySelectorAll('[data-corner]'), canHover() ? CORNER_OFF : CORNER_ON);

        const ctx = gsap.context(() => {
            gsap.from('[data-story-card]', {
                y: 60,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.12,
                clearProps: 'transform,opacity',
                scrollTrigger: {
                    trigger: stage,
                    start: 'top 85%',
                    once: true,
                },
            });
        }, stage);

        return () => ctx.revert();
    }, []);

    // Modal: animasi buka (mekar dari kartu), kunci scroll, keyboard
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const panel = panelRef.current;
        const backdrop = backdropRef.current;

        if (!panel || !backdrop || openIdxRef.current === null) {
            return;
        }

        const reduce = prefersReduce();
        const card = getCard(openIdxRef.current);

        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        const prevOverflow = document.body.style.overflow;
        const prevPadding = document.body.style.paddingRight;

        document.body.style.overflow = 'hidden';

        if (scrollbar > 0) {
            document.body.style.paddingRight = `${scrollbar}px`;
        }

        gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: reduce ? 0 : 0.3, ease: 'none' });

        if (card && !reduce && isWide) {
            gsap.fromTo(
                panel,
                {
                    rotationY: -72,
                    rotationX: 8,
                    transformOrigin: 'left center',
                    x: 36,
                    scale: 0.84,
                    opacity: 0,
                },
                {
                    rotationY: 0,
                    rotationX: 0,
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.inOut',
                    clearProps: 'transform,opacity',
                },
            );
        } else if (card && !reduce) {
            gsap.fromTo(
                panel,
                { clipPath: insetFromCard(panel, card) },
                { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.6, ease: 'power3.inOut', clearProps: 'clipPath' },
            );
        }

        closeBtnRef.current?.focus({ preventScroll: true });

        const onKey = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeRef.current();
            } else if (e.key === 'ArrowRight' && openIdxRef.current !== null) {
                switchTo(openIdxRef.current + 1);
            } else if (e.key === 'ArrowLeft' && openIdxRef.current !== null) {
                switchTo(openIdxRef.current - 1);
            }
        };

        window.addEventListener('keydown', onKey);

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
            document.body.style.paddingRight = prevPadding;
        };
    }, [isOpen]);

    useEffect(() => {
        if (openIdx === null || !modalRef.current) {
            return;
        }

        const first = firstOpenRef.current;
        firstOpenRef.current = false;

        const reduce = prefersReduce();
        const base = first && !reduce ? (isWide ? 0.65 : 0.5) : 0.05;

        const ctx = gsap.context(() => {
            if (isWide) {
                if (turningChapter && pageDirection && !first) {
                    const turningForward = pageDirection === 'next';
                    const page = modalRef.current?.querySelector('[data-page-turn]');

                    if (page) {
                        const turnSign = turningForward ? -1 : 1;
                        const turnOrigin = turningForward ? 'right center' : 'left center';
                        const turnTimeline = gsap.timeline({
                            onComplete: () => setTurningChapter(null),
                        });

                        gsap.set(page, {
                            rotationY: 0,
                            rotationX: 0,
                            skewY: 0,
                            scaleX: 1,
                            x: 0,
                            transformOrigin: turnOrigin,
                        });

                        turnTimeline
                            .to(page, {
                                rotationY: turnSign * 28,
                                rotationX: turnSign * 2,
                                skewY: turnSign * 1.5,
                                scaleX: 0.94,
                                x: turnSign * 4,
                                duration: reduce ? 0 : 0.28,
                                ease: 'power2.out',
                            })
                            .to(page, {
                                rotationY: turnSign * 108,
                                rotationX: turnSign * -3,
                                skewY: turnSign * 4,
                                scaleX: 0.08,
                                x: turnSign * 12,
                                duration: reduce ? 0 : 0.52,
                                ease: 'power2.inOut',
                                clearProps: 'transform,opacity',
                            });
                    }
                }

                // Mode buku: gambar "muncul" di halaman kanan, teks di halaman kiri
                gsap.fromTo(
                    '[data-modal-img]',
                    { opacity: 0, scale: 1.02 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: reduce ? 0 : 0.35,
                        ease: 'power2.out',
                        delay: first ? 0.2 : 0,
                    },
                );

                gsap.fromTo(
                    '[data-book-text]',
                    { opacity: 0, x: -14 },
                    { opacity: 1, x: 0, duration: reduce ? 0 : 0.5, ease: 'power2.out', delay: base },
                );
            } else if (!first) {
                // ganti chapter (mode biasa): gambar disapu per-blok (pixel wipe)
                gsap.fromTo(
                    '[data-modal-img]',
                    { clipPath: 'inset(0% 100% 0% 0%)' },
                    { clipPath: 'inset(0% 0% 0% 0%)', duration: reduce ? 0 : 0.5, ease: 'steps(8)' },
                );
            }

            gsap.fromTo(
                '[data-story-title]',
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: reduce ? 0 : 0.5, ease: 'power2.out', delay: base },
            );

            gsap.fromTo(
                '[data-story-word]',
                { opacity: 0.12, y: 6 },
                { opacity: 1, y: 0, duration: reduce ? 0 : 0.3, ease: 'power2.out', stagger: reduce ? 0 : 0.012, delay: base + 0.15 },
            );

            if (!isWide) {
                gsap.fromTo(
                    '[data-modal-corner]',
                    { x: 12, y: -12, opacity: 0 },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: reduce ? 0 : 0.4,
                        ease: 'steps(4)',
                        stagger: reduce ? 0 : 0.07,
                        delay: first ? 0.45 : 0,
                    },
                );
            }
        }, modalRef);

        return () => ctx.revert();
    }, [openIdx, isWide, pageDirection, turningChapter]);

    useEffect(() => {
        if (!containerRef.current || !imageRef.current) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                { y: 40 },
                {
                    y: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom bottom',
                        scrub: 0.2,
                    },
                },
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Ember pixel: kotak kecil naik dari dasar (api persembahan), geraknya patah-patah biar tetap pixel
    useEffect(() => {
        if (!embersRef.current) {
            return;
        }

        if (prefersReduce()) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('[data-ember]').forEach((el) => {
                const size = gsap.utils.random([2, 3, 4]);
                const dur = gsap.utils.random(3.5, 6.5);

                gsap.set(el, {
                    left: `${gsap.utils.random(2, 98)}%`,
                    bottom: `${gsap.utils.random(0, 10)}%`,
                    width: size,
                    height: size,
                    backgroundColor: gsap.utils.random(['#ffb400', '#ff6a00', '#ffd36b']),
                });

                gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 5) })
                    .set(el, { x: 0, y: 0, opacity: 0 })
                    .to(el, {
                        y: -gsap.utils.random(120, 320),
                        x: gsap.utils.random(-36, 36),
                        duration: dur,
                        ease: 'steps(14)',
                    }, 0)
                    .to(el, { opacity: 1, duration: dur * 0.25, ease: 'none' }, 0)
                    .to(el, { opacity: 0, duration: dur * 0.35, ease: 'none' }, dur * 0.65);
            });
        }, embersRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-screen flex flex-col z-50" id="story">
            <div className="w-full flex flex-col -mt-24 relative z-50">
                <div className="w-full bg-[#2F030C52] h-8"></div>
                <div className="w-full bg-[#2F030C80] h-8"></div>
                <div className="w-full bg-[#2F030Cc6] h-8"></div>
            </div>

           

            <div className="relative w-full min-h-screen overflow-hidden bg-[#270204] flex flex-col items-center px-3 sm:px-6 pt-16 sm:pt-24 pb-0">
                 <div className="z-10 flex gap-5 items-center mb-16 sm:mb-32 ">
                    <div className="flex flex-col gap-1">
                        <div
                            className="h-3 w-3 bg-amber-500"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                        />
                        <div
                            className="h-3 w-3 bg-amber-400"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                        />
                    </div>
                    <h2 className="font-kemco text-center text-3xl tracking-wider text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.9)] md:text-4xl">
                        A TALE WRITTEN IN BLOOD
                    </h2>
                    <div className="flex flex-col gap-1">
                        <div
                            className="h-3 w-3 bg-amber-500"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                        />
                        <div
                            className="h-3 w-3 bg-amber-400"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                        />
                    </div>
                 </div>
                {CHAPTERS.map((c, i) => (
                    <img
                        key={c.title}
                        src={c.image}
                        alt=""
                        aria-hidden="true"
                        className={`absolute inset-0 w-full h-full object-cover scale-110 blur-md transition-opacity duration-700 [image-rendering:pixelated] pointer-events-none ${
                            i === bgIdx ? 'opacity-30' : 'opacity-0'
                        }`}
                    />
                ))}
                
                <div className="absolute inset-0 bg-linear-to-b from-[#270204] via-[#27020499] to-[#211818] pointer-events-none" />

                <div
                    ref={embersRef}
                    className="absolute inset-x-0 bottom-0 h-[60%] z-5ointer-events-none"
                    aria-hidden="true"
                >
                    {EMBERS.map((i) => (
                        <span key={i} data-ember className="absolute block opacity-0" />
                    ))}
                </div>

                <div
                    ref={cardsRef}
                    className="relative z-10 grid grid-cols-2 md:grid-cols-4 items-start gap-x-3 gap-y-3 md:gap-x-6 w-full max-w-5xl mb-6"
                >
                    {CHAPTERS.map((c, i) => (
                        <button
                            key={c.title}
                            type="button"
                            data-story-card
                            onClick={(e) => openChapter(i, e.currentTarget)}
                            onPointerEnter={onCardPointer(i, true)}
                            onPointerLeave={onCardPointer(i, false)}
                            onFocus={onCardFocus(i, true)}
                            onBlur={onCardFocus(i, false)}
                            aria-haspopup="dialog"
                            aria-label={`Baca Chapter ${i + 1}: ${c.title}`}
                            className={`group relative block w-full max-w-51.25 justify-self-center text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffb400] ${
                                i % 2 === 1 ? 'mt-5 md:mt-10' : 'mt-0'
                            }`}
                        >
                            {/* Frame */}
                            <span className="relative flex flex-col border-2 border-[#7a2a30] bg-[#14070a] shadow-[0_0_8px_#7a2a3066] transition-[border-color,box-shadow] duration-300 group-hover:border-[#ffb400] group-hover:shadow-[0_0_10px_#ffb400,0_0_24px_#ff6a0066] group-focus-visible:border-[#ffb400]">
                                <span className="block aspect-4/3 w-full shrink-0 overflow-hidden">
                                    <img
                                        src={c.image}
                                        alt=""
                                        aria-hidden="true"
                                        className="w-full h-full object-cover [image-rendering:pixelated]"
                                    />
                                </span>

                                <span className="flex h-auto shrink-0 flex-col overflow-hidden px-2 pb-2 pt-2 md:px-3 md:pb-3 md:pt-3">
                                    <span className="block font-depixel text-xs md:text-sm text-[#ffb400] leading-none">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="mt-1 block h-[2.4em] overflow-hidden font-depixel text-[9px] uppercase leading-tight text-white wrap-break-word line-clamp-2 transition-colors group-hover:text-[#ffd36b] sm:text-[11px] md:text-xs lg:text-sm">
                                        {c.title}
                                    </span>
                                    <span className="my-1.5 block h-px w-full shrink-0 bg-[#ffffff40] md:my-2" />
                                    <span className="mt-auto flex shrink-0 items-center justify-between gap-2">
                                        <span className="text-[9px] md:text-xs italic text-[#ffffffb3]">
                                            Chapter {i + 1}
                                        </span>
                                        <span className="font-depixel text-[8px] md:text-[10px] text-[#ffb400] md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-300">
                                            Baca Cerita
                                        </span>
                                    </span>
                                </span>

                                {/* Corner di 4 pojok kartu */}
                                {CORNERS.map((corner) => (
                                    <span
                                        key={corner.key}
                                        className={`absolute block w-6 md:w-8 lg:w-10 pointer-events-none ${corner.pos} ${corner.flip}`}
                                    >
                                        <img
                                            data-corner
                                            src={cornerCerita}
                                            alt=""
                                            aria-hidden="true"
                                            className="block w-full h-auto [image-rendering:pixelated]"
                                        />
                                    </span>
                                ))}
                            </span>
                        </button>
                    ))}
                </div>

                <p className="relative mt-12 z-10 text-center text-[9px] sm:text-[11px] md:text-xs lg:text-sm text-[#ffffffb3] mb-6">
                    Click on the cards to read the story.
                </p>

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-[8%] left-1/2 z-0 h-[38%] w-[68%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,190,72,0.58)_0%,rgba(255,91,26,0.3)_48%,transparent_82%)] blur-lg"
                />

                <img
                    ref={imageRef}
                    src={WorldImage}
                    alt="World"
                    className="relative z-1 min-w-screen mt-0 scale-125 sm:scale-125 md:scale-100 w-full object-contain object-bottom will-change-transform pointer-events-none"
                />

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-trom-[#211818] to-transparent z-20 pointer-events-none" />
            </div>

            {/* ===== Modal cerita lengkap (portal ke body biar di atas navbar) ===== */}
            {chapter && openIdx !== null && typeof document !== 'undefined'
                ? createPortal(
                      <div
                          ref={modalRef}
                          role="dialog"
                          aria-modal="true"
                          aria-label={`Chapter ${openIdx + 1}: ${chapter.title}`}
                          data-lenis-prevent
                          className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 perspective-[1800px]"
                      >
                          <div
                              ref={backdropRef}
                              onClick={() => closeRef.current()}
                              className="absolute inset-0 bg-[#0b0204e6]"
                          />

                          {isWide ? (
                              /* ===== MODE BUKU (desktop / layar lebar) ===== */
                              <div
                                  ref={panelRef}
                                  style={{ width: `min(1100px, 94vw, calc(86vh * ${BOOK_RATIO}))` }}
                                  className="relative drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                              >
                                  <div data-book-page className="absolute inset-0 z-0 transform-3d">
                                      {/* Lapisan paling bawah: gambar chapter (di bawah overlay buku) */}
                                      <div className={`absolute overflow-hidden ${BOOK_IMAGE_AREA}`}>
                                          <img
                                              data-modal-img
                                              src={chapter.image}
                                              alt={chapter.title}
                                              className="w-full h-full object-cover [image-rendering:pixelated]"
                                          />
                                      </div>
                                  </div>

                                  {turningChapter && (
                                      <div
                                          data-page-turn
                                          className={`absolute z-30 overflow-hidden bg-[#e8cfa0] shadow-[-8px_0_16px_#3b241255] transform-3dlty:hiddenAGE_ARA}`}
                                      >
                                          <div className="absolute inset-0 backface-hidden">
                                              <img
                                                  src={turningChapter.image}
                                                  alt=""
                                                  aria-hidden="true"
                                                  className="w-full h-full object-cover [image-rendering:pixelated]"
                                              />
                                          </div>
                                          <div className="absolute inset-0 grid place-items-center bg-[#e8cfa0] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                              <span className="block h-[88%] w-px bg-[#9a5a1a55]" />
                                          </div>
                                      </div>
                                  )}

                                  {/* Halaman kiri: teks cerita */}
                                  <div
                                      data-book-text
                                      className={`absolute z-20 flex flex-col text-[#3b2412] ${BOOK_TEXT_AREA}`}
                                  >
                                          <p className="font-depixel text-[clamp(10px,0.9vw,14px)] text-[#9a5a1a] mb-1 shrink-0">
                                              {String(openIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                                          </p>
                                          <h2
                                              data-story-title
                                              className="font-depixel text-[clamp(16px,2vw,30px)] leading-tight text-[#4a1d0a] shrink-0"
                                          >
                                              {chapter.title}
                                          </h2>
                                          <div className="h-px w-full bg-[#4a1d0a55] my-[0.6em] shrink-0" />
                                          <div className="flex-1 min-h-0 overflow-y-auto pr-2">
                                              <p className="font-depixel text-[clamp(10px,1.05vw,16px)] leading-relaxed">
                                                  <Words text={chapter.text} />
                                              </p>
                                          </div>
                                  </div>

                                  {/* Overlay buku: nentuin ukuran panel (rasio ikut PNG) */}
                                  <img
                                      src={bukuOverlayModal}
                                      alt=""
                                      aria-hidden="true"
                                      draggable={false}
                                      className="relative block w-full h-auto select-none pointer-events-none z-10"
                                  />

                                  {/* Tombol tutup */}
                                  <button
                                      ref={closeBtnRef}
                                      type="button"
                                      onClick={() => closeRef.current()}
                                      aria-label="Tutup cerita"
                                      className="absolute top-[5%] right-[3%] z-30 grid place-items-center w-9 h-9 cursor-pointer border-2 border-[#7a2a0e] bg-[#f3e0b8] text-[#7a2a0e] transition-colors hover:bg-[#7a2a0e] hover:text-[#f3e0b8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                  >
                                      <CloseIcon />
                                  </button>
                              </div>
                          ) : (
                              <div
                                  ref={panelRef}
                                  className="relative w-full max-w-5xl max-h-[90vh] md:h-[min(80vh,640px)] flex flex-col md:flex-row border-2 border-[#ffb400] bg-[#14070a] shadow-[0_0_10px_#ffb400,0_0_24px_#ff6a0066]"
                              >
                                  {/* Gambar */}
                                  <div className="relative shrink-0 h-44 sm:h-64 md:h-auto md:w-5/12 overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-[#ffb40040]">
                                      <img
                                          data-modal-img
                                          src={chapter.image}
                                          alt={chapter.title}
                                          className="w-full h-full object-cover [image-rendering:pixelated]"
                                      />
                                  </div>

                                  {/* Cerita */}
                                  <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-8 md:p-10 flex flex-col">
                                      <p className="font-depixel text-xs sm:text-sm text-[#ffb400] mb-1">
                                          {String(openIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                                      </p>
                                      <h2
                                          data-story-title
                                          className="font-depixel text-xl sm:text-3xl text-white pr-10"
                                      >
                                          {chapter.title}
                                      </h2>
                                      <div className="h-px w-full bg-[#ffffff40] my-4" />
                                      <p className="font-depixel text-xs sm:text-sm text-white leading-relaxed">
                                          <Words text={chapter.text} />
                                      </p>

                                      <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                                          <button
                                              type="button"
                                              onClick={() => switchTo(openIdx - 1)}
                                              aria-label="Buka chapter sebelumnya"
                                              title="Chapter sebelumnya"
                                              className="grid place-items-center w-9 h-9 shrink-0 cursor-pointer border-2 border-[#ffb400] text-[#ffb400] transition-colors hover:bg-[#ffb400] hover:text-[#14070a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                          >
                                              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                                          </button>
                                          <Dots active={openIdx} onSelect={switchTo} />
                                          <button
                                              type="button"
                                              onClick={() => switchTo(openIdx + 1)}
                                              aria-label="Buka chapter berikutnya"
                                              title="Chapter berikutnya"
                                              className="grid place-items-center w-9 h-9 shrink-0 cursor-pointer border-2 border-[#ffb400] text-[#ffb400] transition-colors hover:bg-[#ffb400] hover:text-[#14070a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                          >
                                              <ChevronRight className="w-4 h-4" aria-hidden="true" />
                                          </button>
                                      </div>
                                  </div>

                                  <button
                                      ref={closeBtnRef}
                                      type="button"
                                      onClick={() => closeRef.current()}
                                      aria-label="Tutup cerita"
                                      className="absolute top-3 right-3 z-20 grid place-items-center w-9 h-9 cursor-pointer border-2 border-[#ffb400] bg-[#14070a] text-[#ffb400] transition-colors hover:bg-[#ffb400] hover:text-[#14070a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                  >
                                      <CloseIcon />
                                  </button>

                                  {CORNERS.map((corner) => (
                                      <div
                                          key={corner.key}
                                          className={`absolute w-8 sm:w-10 pointer-events-none ${corner.pos} ${corner.flip}`}
                                      >
                                          <img
                                              data-modal-corner
                                              src={cornerCerita}
                                              alt=""
                                              aria-hidden="true"
                                              className="block w-full h-auto [image-rendering:pixelated]"
                                          />
                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>,
                      document.body,
                  )
                : null}
        </div>
    );
}