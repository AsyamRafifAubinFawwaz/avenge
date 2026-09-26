import React, { useEffect, useRef, useState } from 'react';
import IfaruzGif from '../../../assets/characters/ifaruz.gif';
import IfaruzIdleGif from '../../../assets/characters/ifaruz_idle.gif';
import SiluetIfaruzImg from '../../../assets/SiluetIfaruz.png';
import tatakanKarakter from '../../../assets/tatakan-character.png'
import SoldierLottie from './lottie/soldier';
import type { SoldierAction } from './lottie/soldier';

type CharacterId = 'ifaruz' | 'soldier';

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
};

const CHARACTERS: Character[] = [
    {
        id: 'ifaruz',
        name: 'IFARUZ',
        title: 'THE LAST FLAMEBEARER',
        className: 'MAGE',
        level: '07',
        role: 'RANGED',
        weapon: 'EMBER STAFF',
        speed: '★★★★☆',
        power: '★★★★★',
        lore: 'Penjaga terakhir dari desa yang terbakar. Ifaruz membawa sihir api dan tekad untuk merebut kembali rumahnya dari para penjajah.',
    },
    {
        id: 'soldier',
        name: 'SOLDIER',
        title: 'THE FRONTLINE VANGUARD',
        className: 'WARRIOR',
        level: '05',
        role: 'MELEE',
        weapon: 'IRON BLADE',
        speed: '★★★☆☆',
        power: '★★★★☆',
        lore: 'Prajurit garis depan yang berdiri di antara desanya dan kehancuran. Ia tidak mencari kemuliaan, hanya satu kesempatan untuk melindungi mereka yang tersisa.',
    },
];

export default function CharacterSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isInView, setIsInView] = useState(false);
    const [activeCharacter, setActiveCharacter] =
        useState<CharacterId>('ifaruz');
    const [isIfaruzPlaying, setIsIfaruzPlaying] = useState(false);
    const [soldierAction, setSoldierAction] = useState<SoldierAction>('idle_L');
    const ifaruzTimeoutRef = useRef<number | null>(null);
    const character =
        CHARACTERS.find(({ id }) => id === activeCharacter) ?? CHARACTERS[0];

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0.2,
            },
        );

        observer.observe(section);

        return () => {
            observer.disconnect();

            if (ifaruzTimeoutRef.current !== null) {
                window.clearTimeout(ifaruzTimeoutRef.current);
            }
        };
    }, []);

    function selectCharacter(id: CharacterId) {
        setActiveCharacter(id);

        if (id === 'soldier') {
            setIsIfaruzPlaying(false);
            setSoldierAction('idle_L');
        }
    }

    function playIfaruz() {
        if (ifaruzTimeoutRef.current !== null) {
            window.clearTimeout(ifaruzTimeoutRef.current);
        }

        setIsIfaruzPlaying(true);

        ifaruzTimeoutRef.current = window.setTimeout(() => {
            setIsIfaruzPlaying(false);
            ifaruzTimeoutRef.current = null;
        }, 3780);
    }

    return (
        <section
            ref={sectionRef}
            className="relative z-10 isolate flex min-h-[90vh] w-full flex-col overflow-hidden bg-transparent py-10 pb-28 text-white sm:py-12 sm:pb-32"
            style={{ contentVisibility: 'auto' }}
        >
            <div className="pointer-events-none absolute inset-0 -z-10 " />
            <div className="pointer-events-none absolute -bottom-24 left-1/2 -z-10 h-72 w-[min(90vw,48rem)] -translate-x-1/2 rounded-full bg-[#a90c1f]/30 blur-3xl" />

            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6">
                <div className="mb-10 flex items-center gap-4 sm:mb-14">
                    <div className="flex shrink-0 flex-col gap-1">
                        <div className="h-3 w-3 bg-amber-500 shadow-[2px_2px_0_#000]" />
                        <div className="h-3 w-3 bg-amber-400 shadow-[2px_2px_0_#000]" />
                    </div>
                    <div>
                        <h2 className="font-kemco text-3xl leading-tight drop-shadow-[3px_3px_0_#000] sm:text-5xl">
                            CHARACTER
                        </h2>
                    </div>
                    <div className="h-1 flex-1 bg-[#a90c1f] shadow-[0_3px_0_#000]" />
                </div>

                <div className="grid flex-1 items-center gap-8 lg:grid-cols-[3fr_6fr_1fr] lg:gap-6 xl:gap-10">
                    <div className="relative aspect-square w-full overflow-hidden lg:scale-110">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src={tatakanKarakter}
                                alt="tatakan-karakter"
                                className="absolute bottom-0 z-0"
                            />
                            {activeCharacter === 'ifaruz' ? (
                                <img
                                    key={isIfaruzPlaying ? 'ifaruz-action' : 'ifaruz-idle'}
                                    src={isIfaruzPlaying ? IfaruzGif : IfaruzIdleGif}
                                    alt="Ifaruz"
                                    onClick={playIfaruz}
                                    className="relative z-10 h-full w-full cursor-pointer object-contain"
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            ) : (
                                <SoldierLottie
                                    action={soldierAction}
                                    autoplay={isInView}
                                    loop={isInView}
                                    className="h-full w-full scale-[1.5] drop-shadow-[8px_10px_0_rgba(0,0,0,0.45)]"
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-7">
                        <div>
                            <p className="mb-3 font-depixel text-xs tracking-[0.25em] text-amber-400 uppercase">
                                {character.title}
                            </p>
                            <h3 className="font-kemco text-4xl leading-tight text-white drop-shadow-[4px_4px_0_#000] sm:text-6xl">
                                {character.name}
                            </h3>
                            <p className="mt-5 max-w-lg font-depixel text-sm leading-7 text-white/70 sm:text-base">
                                {character.lore}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 border-y-2 border-white/15 py-5 font-depixel text-[10px] tracking-wider uppercase sm:grid-cols-4">
                            <div>
                                <p className="text-white/40">ROLE</p>
                                <p className="mt-2 text-amber-300">{character.role}</p>
                            </div>
                            <div>
                                <p className="text-white/40">WEAPON</p>
                                <p className="mt-2 text-amber-300">{character.weapon}</p>
                            </div>
                            <div>
                                <p className="text-white/40">SPEED</p>
                                <p className="mt-2 text-amber-300">{character.speed}</p>
                            </div>
                            <div>
                                <p className="text-white/40">POWER</p>
                                <p className="mt-2 text-amber-300">{character.power}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 border-t-2 border-white/15 pt-6 lg:border-t-0 lg:border-l-2 lg:pt-0 lg:pl-3">
                        <div className="flex flex-col gap-3">
                            {CHARACTERS.map(({ id, name }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => selectCharacter(id)}
                                    aria-pressed={activeCharacter === id}
                                    aria-label={`Select ${name}`}
                                    title={name}
                                    className={`aspect-square w-full overflow-hidden border-2 transition-transform active:translate-y-1 ${activeCharacter === id
                                            ? 'border-amber-300 bg-amber-400 shadow-[3px_3px_0_#000]'
                                            : 'border-white/30 bg-black/30 hover:border-amber-300'
                                        }`}
                                >
                                    {id === 'ifaruz' ? (
                                        <img
                                            src={SiluetIfaruzImg}
                                            alt={name}
                                            className="h-full w-full object-contain"
                                            style={{ imageRendering: 'pixelated' }}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-[#780c1c]">
                                            <span className="font-kemco text-2xl text-amber-300">?</span>
                                        </div>
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