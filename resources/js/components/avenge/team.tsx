import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { Instagram } from 'lucide-react';
import RafifImg from '../../../assets/teams/rafif.png';
import RafifRealImg from '../../../assets/teams/rafif-real.jpg';
import RoyhanImg from '../../../assets/teams/royhan.png';
import GathanImg from '../../../assets/teams/gathan.png';
import ShevaImg from '../../../assets/teams/sheva.png';
import PixelFrameFilled from '../../../assets/pixil-frame-filled.png';
import TeamFrame from '../../../assets/frame-teams.png';
import { TeamMember } from '@/types/teams';

// Siluet kartu: dipakai buat motong isi + glare biar gak keluar dari frame.
// Asumsi: bentuk luar pixil-frame-filled.png sama dengan frame-teams.png
const SILHOUETTE: React.CSSProperties = {
    WebkitMaskImage: `url(${PixelFrameFilled})`,
    maskImage: `url(${PixelFrameFilled})`,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
};

// filter ditaruh di wrapper luar, mask di dalam (kalau satu elemen, bayangannya ikut ke-mask)
const CARD_SHADOW = 'drop-shadow(4px 6px 0px rgba(0,0,0,0.6))';

// Area aman buat teks/label (di dalam border frame). Kalau label nabrak frame, naikin angkanya
const CONTENT_INSET = 'inset-[8%]';

const DEFAULT_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: 'Asyam Rafif',
        email: '',
        role: 'owner',
        role_label: 'Code and Web Dev',
        image: RafifImg,
        realImage: RafifRealImg,
        quote: <>Ikan hiu makan nasi</>,
        instagram: <Instagram className="h-2.5 w-2.5" />,
    },
    {
        id: 2,
        name: 'Royhan',
        email: '',
        role: 'member',
        role_label: 'Team Member',
        image: RoyhanImg,
        realImage: RoyhanImg,
        quote: <></>,
        instagram: <Instagram className="h-2.5 w-2.5" />,
    },
    {
        id: 3,
        name: 'Gathan',
        email: '',
        role: 'member',
        role_label: 'Team Member',
        image: GathanImg,
        realImage: GathanImg,
        quote: <></>,
        instagram: <Instagram className="h-2.5 w-2.5" />,
    },
    {
        id: 4,
        name: 'Sheva',
        email: '',
        role: 'member',
        role_label: 'Team Member',
        image: ShevaImg,
        realImage: ShevaImg,
        quote: <></>,
        instagram: <Instagram className="h-2.5 w-2.5" />,
    },
];

type TeamSectionProps = {
    members?: TeamMember[];
};

function Shine() {
    return (
        <div
            data-shine
            className="pointer-events-none absolute -inset-y-1/4 left-0 z-30 w-1/3 bg-linear-to-r from-transparent via-white/30 to-transparent"
        />
    );
}

export function PixelTeamCard({ member }: { member: TeamMember }) {
    const liftRef = useRef<HTMLDivElement>(null);
    const flipperRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const tiltRef = useRef<{ rx: (v: number) => void; ry: (v: number) => void } | null>(null);
    const pointerTypeRef = useRef<string>('mouse');
    const flippedRef = useRef(false);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const ctx = gsap.context(() => {
            // glare ada di depan & belakang, dua-duanya jalan bareng
            const shines = gsap.utils.toArray<HTMLElement>(
                '[data-shine]',
                flipperRef.current as Element,
            );

            gsap.set(liftRef.current, { transformPerspective: 900 });
            gsap.set(shines, { xPercent: -150, skewX: -18 });

            if (!reduce) {
                tiltRef.current = {
                    rx: gsap.quickTo(liftRef.current, 'rotationX', { duration: 0.4, ease: 'power3.out' }),
                    ry: gsap.quickTo(liftRef.current, 'rotationY', { duration: 0.4, ease: 'power3.out' }),
                };
            }

            const tl = gsap.timeline({ paused: true });

            // 1) flip utama (overshoot dikit biar "nendang")
            tl.to(
                flipperRef.current,
                {
                    rotateY: 180,
                    duration: reduce ? 0.01 : 0.9,
                    ease: 'back.inOut(1.3)',
                },
                0,
            );

            if (!reduce) {
                // 2) angkat dulu, turun pas flip kelar
                tl.to(liftRef.current, { y: -14, scale: 1.07, duration: 0.45, ease: 'power2.out' }, 0)
                    .to(liftRef.current, { y: 0, scale: 1, duration: 0.45, ease: 'power2.in' }, 0.45)

                    // 3) bayangan lantai
                    .to(shadowRef.current, { scaleX: 0.7, opacity: 0.2, duration: 0.45, ease: 'power2.out' }, 0)
                    .to(shadowRef.current, { scaleX: 1, opacity: 0.5, duration: 0.45, ease: 'power2.in' }, 0.45)

                    // 4) glare diagonal
                    .to(shines, { xPercent: 450, duration: 0.8, ease: 'power2.inOut' }, 0.1);
            }

            tlRef.current = tl;
        });

        return () => ctx.revert();
    }, []);

    const flipIn = () => tlRef.current?.timeScale(1).play();
    const flipOut = () => tlRef.current?.timeScale(1.4).reverse();

    const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse' || !tiltRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        tiltRef.current.ry(px * 14);
        tiltRef.current.rx(-py * 14);
    };

    const resetTilt = () => {
        tiltRef.current?.rx(0);
        tiltRef.current?.ry(0);
    };

    return (
        <div
            data-team-card
            className="group relative mx-auto flex w-full max-w-56 cursor-pointer flex-col items-center select-none"
            onPointerDown={(e) => {
                pointerTypeRef.current = e.pointerType;
            }}
            onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') flipIn();
            }}
            onPointerMove={handleMove}
            onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') {
                    flipOut();
                    resetTilt();
                }
            }}
            onClick={() => {
                // klik cuma buat touch; mouse udah di-handle hover
                if (pointerTypeRef.current === 'mouse') return;
                flippedRef.current = !flippedRef.current;
                flippedRef.current ? flipIn() : flipOut();
            }}
        >
            {/* bayangan lantai */}
            <div
                ref={shadowRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-1.5 w-[70%] bg-black opacity-50"
            />

            <div ref={liftRef} className="w-full will-change-transform">
                <div className="relative mb-3 aspect-3/4 w-full perspective-[1000px]">
                    <div
                        ref={flipperRef}
                        className="relative h-full w-full transform-3d will-change-transform"
                    >
                        {/* ===== DEPAN ===== */}
                        <div
                            className="absolute inset-0 backface-hidden"
                            style={{ filter: CARD_SHADOW }}
                        >
                            <div className="absolute inset-0 overflow-hidden" style={SILHOUETTE}>
                                {/* 1. base frame */}
                                <img
                                    src={PixelFrameFilled}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 h-full w-full object-fill"
                                    style={{ imageRendering: 'pixelated' }}
                                />

                                {/* 2a. gambar karakter: lebarnya full satu kartu */}
                                <img
                                    src={member.image ?? RafifImg}
                                    alt={member.name}
                                    className="absolute inset-0 z-10 h-full w-full object-cover object-top"
                                    style={{ imageRendering: 'pixelated' }}
                                />

                                {/* 2b. label nama (dikurung di dalam border) */}
                                <div className={`absolute ${CONTENT_INSET} z-10 overflow-hidden`}>
                                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center overflow-hidden bg-black/65 px-2 py-1.5 text-center">
                                        <h3 className="w-full overflow-hidden wrap-break-word font-kemco text-xs leading-tight text-white sm:text-sm">
                                            {member.name}
                                        </h3>
                                        <p className="w-full overflow-hidden wrap-break-word font-depixel text-[9px] leading-tight font-medium text-amber-400 sm:text-[10px]">
                                            {member.role_label || member.role}
                                        </p>
                                    </div>
                                </div>

                                {/* 3. frame transparan nutup paling atas */}
                                <img
                                    src={TeamFrame}
                                    alt=""
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 z-20 h-full w-full object-fill"
                                    style={{ imageRendering: 'pixelated' }}
                                />

                                {/* 4. glare (kepotong siluet) */}
                                <Shine />
                            </div>
                        </div>

                        {/* ===== BELAKANG ===== */}
                        <div
                            className="absolute inset-0 transform-[rotateY(180deg)] backface-hidden"
                            style={{ filter: CARD_SHADOW }}
                        >
                            <div className="absolute inset-0 overflow-hidden" style={SILHOUETTE}>
                                {/* 1. base frame */}
                                <img
                                    src={PixelFrameFilled}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 h-full w-full object-fill"
                                    style={{ imageRendering: 'pixelated' }}
                                />

                                {/* 2a. foto real: full satu kartu */}
                                <img
                                    src={member.realImage ?? RafifRealImg}
                                    alt={`${member.name} Real`}
                                    className="absolute inset-0 z-10 h-full w-full object-cover"
                                />

                                {/* 2b. info di bawah foto (dikurung di dalam border) */}
                                <div className={`absolute ${CONTENT_INSET} z-10 overflow-hidden`}>
                                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center overflow-hidden bg-black/70 px-2 py-2 text-center">
                                        <h3 className="w-full overflow-hidden wrap-break-word font-kemco text-[10px] leading-tight text-white sm:text-xs">
                                            {member.name}
                                        </h3>
                                        <p className="mt-0.5 w-full overflow-hidden wrap-break-word font-depixel text-[7px] leading-tight font-bold text-amber-400 sm:text-[9px]">
                                            {member.role_label || member.role}
                                        </p>

                                        {member.quote && (
                                            <p className="mt-1 max-w-[95%] font-depixel text-[8px] leading-tight font-medium text-white/90 italic sm:text-[10px]">
                                                "{member.quote}"
                                            </p>
                                        )}

                                        {member.instagram && (
                                            <a
                                                href="https://instagram.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="btn-pixelated mt-1.5 inline-flex items-center gap-1 px-4 py-0.5 font-depixel text-[8px] font-bold tracking-wider text-white sm:px-8"
                                            >
                                                {member.instagram}
                                                <span>INSTAGRAM</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* 3. frame transparan nutup paling atas (sama kayak depan) */}
                                <img
                                    src={TeamFrame}
                                    alt=""
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 z-20 h-full w-full object-fill"
                                    style={{ imageRendering: 'pixelated' }}
                                />

                                <Shine />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TeamSection({ members = DEFAULT_MEMBERS }: TeamSectionProps) {
    const gridRef = useRef<HTMLDivElement>(null);

    // entrance: kartu jatuh satu-satu pas section masuk layar
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('[data-team-card]');
            gsap.set(cards, { opacity: 0, y: 50, rotation: (i: number) => (i % 2 ? 3 : -3) });

            const io = new IntersectionObserver(
                ([entry]) => {
                    if (!entry.isIntersecting) return;
                    gsap.to(cards, {
                        opacity: 1,
                        y: 0,
                        rotation: 0,
                        duration: 0.7,
                        ease: 'back.out(1.5)',
                        stagger: 0.12,
                        clearProps: 'transform,opacity',
                    });
                    io.disconnect();
                },
                { threshold: 0.2 },
            );
            io.observe(grid);

            return () => io.disconnect();
        }, grid);

        return () => ctx.revert();
    }, [members]);

    return (
        <section id="events" className="relative w-full overflow-hidden bg-[#211818] py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex items-center justify-center gap-4">
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
                    <h2 className="font-kemco text-3xl tracking-wider text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.9)] md:text-4xl">
                        MEET THE TEAM
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

                <div
                    ref={gridRef}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                >
                    {members.map((member) => (
                        <PixelTeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}