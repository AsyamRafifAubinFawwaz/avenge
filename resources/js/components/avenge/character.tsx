import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import BijanGif from '../../../assets/characters/bijan.gif';
import IfaruzGif from '../../../assets/characters/ifaruz.gif';
import IfaruzIdleGif from '../../../assets/characters/ifaruz_idle.gif';
import KingGif from '../../../assets/characters/king.gif';
import KingActionGif from '../../../assets/characters/king_action.gif';
import ZawwafGif from '../../../assets/characters/zawwaf.gif';
import tatakanKarakter from '../../../assets/tatakan-character.png';
import CharacterSprite from './character-sprite';
import SoldierLottie from './lottie/soldier';
import type { SoldierAction } from './lottie/soldier';

type CharacterId = 'ifaruz' | 'soldier' | 'king' | 'bijan' | 'zawwaf';

type Character = {
    id: CharacterId;
    name: string;
    title: string;
    className: string;
    level: string;
    role: string;
    weapon: string;
    speed: string;
    power: string;
    lore: string;
    sprite: string;
    actionSprite?: string;
    actionDuration?: number;
};

const CHARACTERS: Character[] = [
    {
        id: 'ifaruz',
        name: 'IFARUZ',
        title: 'YANG BRO RASAKAN',
        className: 'MAGE',
        level: '07',
        role: 'FIGHTER/MAGE',
        weapon: 'EMBER STAFF',
        speed: '★★★★☆',
        power: '★★★★★',
        lore: 'Penjaga terakhir dari desa yang terbakar. Ifaruz membawa sihir api dan tekad untuk merebut kembali rumahnya dari para penjajah.',
        sprite: IfaruzIdleGif,
        actionSprite: IfaruzGif,
        actionDuration: 3780,
    },
    {
        id: 'king',
        name: 'KING AVEHS',
        title: 'RAJA JAWA',
        className: 'WARRIOR',
        level: '08',
        role: 'FIGHTER',
        weapon: 'ROYAL BLADE',
        speed: '★★★☆☆',
        power: '★★★★★',
        lore: 'Pemimpin yang kembali ke medan perang untuk merebut kembali kerajaannya dan menjaga rakyatnya tetap berdiri.',
        sprite: KingGif,
        actionSprite: KingActionGif,
        actionDuration: 2380,
    },
    {
        id: 'bijan',
        name: 'YOR BIJAN',
        title: 'DUKUN ABNORMAL',
        className: 'RANGER',
        level: '??',
        role: 'MAGE',
        weapon: 'MOON STAFF',
        speed: '??????',
        power: '??????',
        lore: 'Pemburu sunyi yang membaca jejak musuh sebelum mereka menyadari dirinya sudah berada di dekat mereka.',
        sprite: BijanGif,
    },
    {
        id: 'zawwaf',
        name: 'ZAWWAF',
        title: 'BUILD TANK',
        className: 'GUARDIAN',
        level: '07',
        role: 'TANK',
        weapon: 'TANGAN KOSONG',
        speed: '★★☆☆☆',
        power: '★★★★★',
        lore: 'Penjaga yang berdiri paling depan saat ancaman datang, menahan serangan agar yang lain bisa bertahan.',
        sprite: ZawwafGif,
    },
];

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function CharacterSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const spriteWrapRef = useRef<HTMLDivElement | null>(null);
    const dustRef = useRef<HTMLDivElement | null>(null);
    const infoRef = useRef<HTMLDivElement | null>(null);
    const switchTlRef = useRef<gsap.core.Timeline | null>(null);
    const prevDisplayIdRef = useRef<CharacterId>('ifaruz');
    const actionTimeoutRef = useRef<number | null>(null);

    const [isInView, setIsInView] = useState(false);
    // activeCharacter = yang lagi dipilih (thumbnail langsung nyala)
    const [activeCharacter, setActiveCharacter] =
        useState<CharacterId>('ifaruz');
    // displayId = yang beneran ditampilkan (baru ganti setelah animasi "keluar" kelar)
    const [displayId, setDisplayId] = useState<CharacterId>('ifaruz');
    const [activeAction, setActiveAction] = useState<CharacterId | null>(null);
    const [soldierAction, setSoldierAction] = useState<SoldierAction>('idle_L');

    const character =
        CHARACTERS.find(({ id }) => id === displayId) ?? CHARACTERS[0];

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.2 },
        );

        observer.observe(section);

        return () => {
            observer.disconnect();

            if (actionTimeoutRef.current !== null) {
                window.clearTimeout(actionTimeoutRef.current);
            }

            switchTlRef.current?.kill();
        };
    }, []);

    /* ---------- ANIMASI ---------- */

    // Debu pixel kotak-kotak pas karakter mendarat di tatakan
    function spawnDust() {
        const box = dustRef.current;

        if (!box) {
            return;
        }

        for (let i = 0; i < 12; i++) {
            const p = document.createElement('span');
            const size = 4 + Math.round(Math.random() * 3) * 2;
            const dir = i % 2 === 0 ? -1 : 1;

            p.style.cssText = `position:absolute;left:50%;bottom:0;width:${size}px;height:${size}px;background:${i % 3 === 0 ? '#fbbf24' : '#ffffff'};box-shadow:2px 2px 0 #000;`;
            box.appendChild(p);

            gsap.to(p, {
                x: dir * (30 + Math.random() * 100),
                y: -(15 + Math.random() * 70),
                opacity: 0,
                duration: 0.5 + Math.random() * 0.3,
                ease: 'steps(6)',
                onComplete: () => p.remove(),
            });
        }
    }

    // Karakter baru "jatuh" dari atas, mendarat + squash, huruf nama jatuh kayak tetris
    function playIn() {
        const wrap = spriteWrapRef.current;
        const info = infoRef.current;

        if (!wrap || !info || prefersReducedMotion()) {
            return;
        }

        const infoEls = info.querySelectorAll('[data-info]');
        const letters = info.querySelectorAll('[data-letter]');
        const lore = info.querySelector('[data-lore]');

        switchTlRef.current?.kill();

        const tl = gsap.timeline();
        switchTlRef.current = tl;

        tl.fromTo(
            wrap,
            {
                y: -180,
                x: 0,
                scaleX: 0.8,
                scaleY: 1.3,
                opacity: 0,
                filter: 'brightness(2.5)',
                transformOrigin: '50% 100%',
            },
            { y: 0, opacity: 1, duration: 0.28, ease: 'power2.in' },
        )
            .add(spawnDust)
            // squash pas mendarat
            .to(wrap, {
                scaleX: 1.15,
                scaleY: 0.8,
                filter: 'brightness(1)',
                duration: 0.08,
                ease: 'power1.out',
            })
            // mantul balik ke bentuk normal
            .to(wrap, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.45,
                ease: 'elastic.out(1, 0.35)',
            })
            .fromTo(
                infoEls,
                { x: -30, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.07,
                    ease: 'steps(4)',
                },
                0.15,
            )
            .fromTo(
                letters,
                { y: -40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.04,
                    ease: 'steps(4)',
                },
                0.2,
            );

        if (lore) {
            tl.fromTo(
                lore,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 0.6,
                    ease: 'steps(18)',
                    clearProps: 'clipPath',
                },
                0.35,
            );
        }
    }

    // Ganti karakter baru: dispatch animasi keluar dulu, baru swap konten
    useLayoutEffect(() => {
        if (prevDisplayIdRef.current === displayId) {
            return;
        }

        prevDisplayIdRef.current = displayId;
        playIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayId]);

    function selectCharacter(id: CharacterId) {
        if (id === activeCharacter) {
            return;
        }

        setActiveCharacter(id);
        setActiveAction(null);

        if (id === 'soldier') {
            setSoldierAction('idle_L');
        }

        const wrap = spriteWrapRef.current;
        const info = infoRef.current;

        // reduced motion / ref belum siap: ganti langsung aja
        if (!wrap || !info || prefersReducedMotion()) {
            setDisplayId(id);
            return;
        }

        switchTlRef.current?.kill();
        gsap.set(wrap, { x: 0 });

        const infoEls = info.querySelectorAll('[data-info]');

        const tl = gsap.timeline({
            onComplete: () => {
                if (id === displayId) {
                    // klik balik ke karakter yang sama di tengah animasi
                    playIn();
                } else {
                    setDisplayId(id);
                }
            },
        });

        switchTlRef.current = tl;

        tl
            // glitch: getar + kilat putih
            .to(wrap, {
                x: 6,
                duration: 0.04,
                repeat: 5,
                yoyo: true,
                ease: 'steps(1)',
            })
            .to(wrap, { filter: 'brightness(3)', duration: 0.12 }, 0)
            // terbang ke atas dengan gerakan patah-patah (8-bit vibes)
            .to(wrap, {
                y: -70,
                scaleY: 1.25,
                scaleX: 0.8,
                opacity: 0,
                duration: 0.3,
                ease: 'steps(5)',
                transformOrigin: '50% 100%',
            })
            .to(
                infoEls,
                {
                    x: 40,
                    opacity: 0,
                    duration: 0.25,
                    stagger: 0.04,
                    ease: 'steps(4)',
                },
                0.1,
            );
    }

    function playAction(id: CharacterId) {
        const actionCharacter = CHARACTERS.find((item) => item.id === id);

        if (!actionCharacter?.actionSprite || !actionCharacter.actionDuration) {
            return;
        }

        if (actionTimeoutRef.current !== null) {
            window.clearTimeout(actionTimeoutRef.current);
        }   

        setActiveAction(id);

        actionTimeoutRef.current = window.setTimeout(() => {
            setActiveAction(null);
            actionTimeoutRef.current = null;
        }, actionCharacter.actionDuration);
    }

    return (
        <section
            id="character"
            ref={sectionRef}
            className="relative z-10 isolate flex min-h-[95vh] w-full flex-col overflow-hidden bg-transparent py-8 pb-24 text-white sm:py-12 sm:pb-32"
            style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 900px' }}
        >
            <div className="pointer-events-none absolute inset-0 -z-10" />

            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6">
                <div className="mb-8 flex items-center gap-3 sm:mb-14 sm:gap-4">
                    <div className="flex shrink-0 flex-col gap-1">
                        <div className="h-3 w-3 bg-amber-500 shadow-[2px_2px_0_#000]" />
                        <div className="h-3 w-3 bg-amber-400 shadow-[2px_2px_0_#000]" />
                    </div>
                    <h2 className="font-kemco text-2xl leading-tight drop-shadow-[3px_3px_0_#000] min-[400px]:text-3xl sm:text-5xl">
                        CHARACTER
                    </h2>
                    <div className="h-1 flex-1 bg-[#a90c1f] shadow-[0_3px_0_#000]" />
                </div>

                <div className="grid flex-1 items-center gap-6 lg:grid-cols-[3fr_6fr_1fr] lg:gap-6 xl:gap-10">
                    {/* 1. SPRITE — di HP dibatasi ukurannya & dipusatkan */}
                    <div className="relative order-1 mx-auto aspect-square w-full max-w-[280px] overflow-hidden sm:max-w-[360px] lg:order-none lg:max-w-none lg:scale-110">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src={tatakanKarakter}
                                alt="tatakan-karakter"
                                className="absolute bottom-0 z-0 max-w-full"
                            />
                            <div
                                ref={spriteWrapRef}
                                className="relative z-10 flex h-full w-full items-center justify-center will-change-transform"
                            >
                                {displayId === 'soldier' ? (
                                    <SoldierLottie
                                        action={soldierAction}
                                        autoplay={isInView}
                                        loop={isInView}
                                        className="h-full w-full scale-[1.5] drop-shadow-[8px_10px_0_rgba(0,0,0,0.45)]"
                                    />
                                ) : (
                                    <CharacterSprite
                                        key={`${character.id}-${activeAction === character.id ? 'action' : 'idle'}`}
                                        src={
                                            activeAction === character.id &&
                                                character.actionSprite
                                                ? character.actionSprite
                                                : character.sprite
                                        }
                                        alt={character.name}
                                        onClick={
                                            character.actionSprite
                                                ? () => playAction(character.id)
                                                : undefined
                                        }
                                        className={`relative z-10 h-full w-full touch-manipulation drop-shadow-[8px_10px_0_rgba(0,0,0,0.45)] [-webkit-tap-highlight-color:transparent] ${character.actionSprite ? 'cursor-pointer' : ''}`}
                                    />
                                )}
                            </div>
                            <div
                                ref={dustRef}
                                className="pointer-events-none absolute bottom-[14%] left-0 z-20 h-0 w-full"
                            />
                        </div>
                    </div>

                    {/* 3. INFO — di HP muncul paling bawah */}
                    <div ref={infoRef} className="order-3 flex flex-col gap-6 lg:order-none lg:gap-7">
                        <div>
                            <p
                                data-info
                                className="mb-2 font-depixel text-[11px] tracking-[0.2em] text-amber-400 uppercase sm:mb-3 sm:text-xs sm:tracking-[0.25em]"
                            >
                                {character.title}
                            </p>
                            <h3
                                key={character.id}
                                data-info
                                aria-label={character.name}
                                className="font-kemco text-3xl leading-tight text-white drop-shadow-[3px_3px_0_#000] min-[400px]:text-4xl sm:text-6xl sm:drop-shadow-[4px_4px_0_#000]"
                            >
                                {character.name.split('').map((char, i) => (
                                    <span
                                        key={`${char}-${i}`}
                                        data-letter
                                        aria-hidden="true"
                                        className="inline-block whitespace-pre"
                                    >
                                        {char}
                                    </span>
                                ))}
                            </h3>
                            <p
                                data-info
                                data-lore
                                className="mt-4 max-w-lg font-depixel text-[13px] leading-6 text-white/70 sm:mt-5 sm:text-base sm:leading-7"
                            >
                                {character.lore}
                            </p>
                        </div>

                        <div
                            data-info
                            className="grid grid-cols-2 gap-x-3 gap-y-4 border-y-2 border-white/15 py-4 font-depixel text-[10px] tracking-wider uppercase sm:grid-cols-4 sm:py-5"
                        >
                            <div>
                                <p className="text-white/40">ROLE</p>
                                <p className="mt-2 break-words text-amber-300">{character.role}</p>
                            </div>
                            <div>
                                <p className="text-white/40">WEAPON</p>
                                <p className="mt-2 break-words text-amber-300">{character.weapon}</p>
                            </div>
                            <div>
                                <p className="text-white/40">SPEED</p>
                                <p className="mt-2 break-words text-amber-300">{character.speed}</p>
                            </div>
                            <div>
                                <p className="text-white/40">POWER</p>
                                <p className="mt-2 break-words text-amber-300">{character.power}</p>
                            </div>
                        </div>
                    </div>

                    {/* 2. THUMBNAIL — di HP jadi baris horizontal tepat di bawah sprite */}
                    <div className="order-2 lg:order-none lg:border-l-2 lg:border-white/15 lg:pl-3">
                        <div className="mx-auto grid max-w-sm grid-cols-4 gap-2 sm:gap-3 lg:mx-0 lg:max-w-none lg:grid-cols-1">
                            {CHARACTERS.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => selectCharacter(item.id)}
                                    aria-pressed={activeCharacter === item.id}
                                    aria-label={`Select ${item.name}`}
                                    title={item.name}
                                    className={`aspect-square w-full touch-manipulation overflow-hidden border-2 transition-transform active:translate-y-1 [-webkit-tap-highlight-color:transparent] ${activeCharacter === item.id
                                            ? 'border-amber-300 bg-amber-400 shadow-[3px_3px_0_#000]'
                                            : 'border-white/30 bg-black/30 [@media(hover:hover)]:hover:border-amber-300'
                                        }`}
                                >
                                    {item.id === 'soldier' ? (
                                        <div className="flex h-full w-full items-center justify-center bg-[#780c1c]">
                                            <span className="font-kemco text-2xl text-amber-300">?</span>
                                        </div>
                                    ) : (
                                        <CharacterSprite
                                            src={item.sprite}
                                            alt={item.name}
                                            staticPreview
                                            className={`h-full w-full origin-top ${item.id === 'zawwaf' ? '-translate-y-[34%]' : item.id === 'bijan' ? '-translate-y-[26%]' : '-translate-y-[16%]'} scale-[2.2] object-[center_top]`}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}