import React, { useState } from 'react';
import { Instagram } from 'lucide-react';
import RafifImg from '../../../assets/teams/rafif.png';
import RafifRealImg from '../../../assets/teams/rafif-real.jpg';
import PaperFrameBG from '../../../assets/dashboard/paperframe-background.png';

export type TeamMember = {
    id: number;
    name: string;
    role: string;
    quote?: string | null;
    image?: string | null;
    realImage?: string | null;
    instagram?: string | null;
};

const DEFAULT_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: 'Asyam Rafif',
        role: 'Code and Web Dev',
        quote: 'Ikan hiu makan nasi',
        image: RafifImg,
        realImage: RafifImg,
        instagram: 'https://instagram.com/asyamrafif',
    },
    {
        id: 2,
        name: 'Dominik (Founder)',
        role: 'Code & Game Design',
        quote: 'Building the universe one pixel at a time',
        image: RafifImg,
        realImage: RafifRealImg,
        instagram: 'https://instagram.com/',
    },
    {
        id: 3,
        name: 'Paul',
        role: 'Code & Game Design',
        quote: 'Glitch in the matrix? Just a feature',
        image: RafifImg,
        realImage: RafifImg,
        instagram: 'https://instagram.com/',
    },
    {
        id: 4,
        name: 'Patrick (Founder)',
        role: 'Art & UX/UI',
        quote: 'Creating visual dreams in retro colors',
        image: RafifImg,
        realImage: RafifImg,
        instagram: 'https://instagram.com/',
    },
];

type Props = {
    members?: TeamMember[];
};

export function PixelTeamCard({ member }: { member: TeamMember }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="group flex cursor-pointer flex-col items-center select-none"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            {/* 3D Flip Container (Matching size on front and back) */}
            <div className="relative mb-2 flex h-56 w-full items-center justify-center [perspective:1000px] sm:h-64 md:h-72">
                <div
                    className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                        isFlipped
                            ? '[transform:rotateY(180deg)]'
                            : 'group-hover:[transform:rotateY(180deg)]'
                    }`}
                >
                    {/* FRONT SIDE: Pixelated Photo */}
                    <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
                        {member.image ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="h-full w-full scale-110 object-contain drop-shadow-[4px_6px_0px_rgba(0,0,0,0.6)] filter transition-transform duration-200 group-hover:scale-115"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center rounded-sm border-2 border-dashed border-amber-500/40 bg-black/20 p-3 text-center transition-colors group-hover:border-amber-400 group-hover:bg-amber-500/10">
                                <svg
                                    className="mb-2 h-10 w-10 text-amber-500/60 transition-colors group-hover:text-amber-400"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2a5 5 0 00-5 5v2a5 5 0 0010 0V7a5 5 0 00-5-5zM4 21v-2a6 6 0 016-6h4a6 6 0 016 6v2H4z" />
                                </svg>
                                <span className="font-depixel text-[9px] font-bold tracking-wider uppercase text-amber-400/80">
                                    [ FOTO {member.name.split(' ')[0]} ]
                                </span>
                                <span className="mt-1 font-depixel text-[8px] text-white/40">
                                    TATA LETAK FOTO
                                </span>
                            </div>
                        )}
                    </div>

                    {/* BACK SIDE: Pixel Bounty Poster Layout */}
                    <div
                        className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col items-center justify-between p-3 sm:p-4 text-center [backface-visibility:hidden]"
                        style={{
                            backgroundImage: `url(${PaperFrameBG})`,
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            imageRendering: 'pixelated',
                            filter: 'drop-shadow(4px 6px 0px rgba(0,0,0,0.6))',
                        }}
                    >
                        {/* Rectangular Photo Frame (True Pixel Art Border Style) */}
                        <div
                            className="relative mt-1 flex h-24 sm:h-28 md:h-32 w-[82%] items-center justify-center bg-[#2a1d0f] shrink-0 p-1"
                            style={{
                                boxShadow:
                                    '0 -3px 0 0 #3a2815, 0 3px 0 0 #3a2815, -3px 0 0 0 #3a2815, 3px 0 0 0 #3a2815, 0 4px 0 0 rgba(0,0,0,0.5)',
                            }}
                        >
                            <div className="relative flex h-full w-full items-center justify-center overflow-hidden border border-[#5c4424] bg-black/40">
                                {member.realImage ? (
                                    <img
                                        src={member.realImage}
                                        alt={`${member.name} Real`}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="font-depixel text-[8px] font-bold text-amber-200">
                                        [ FOTO ]
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Name, Quote, and Instagram CTA */}
                        <div className="mb-0.5 flex w-full flex-col items-center justify-center px-1">
                            <span className="font-depixel text-[7px] font-bold tracking-widest text-[#4a351b] uppercase">
                                DEAD OR ALIVE
                            </span>
                            <h3 className="font-kemco text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2a1d0f] leading-tight drop-shadow-[1px_1px_0px_rgba(255,255,255,0.4)]">
                                {member.name.split(' ')[0]}
                            </h3>

                            {member.quote && (
                                <p className="mt-0.5 font-depixel text-[8px] italic font-medium text-[#4a351b] leading-tight max-w-[95%] drop-shadow-[1px_1px_0px_rgba(255,255,255,0.3)]">
                                    "{member.quote}"
                                </p>
                            )}

                            {member.instagram && (
                                <a
                                    href={member.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="btn-pixelated mt-1 inline-flex items-center gap-1 px-2 py-0.5 font-depixel text-[8px] font-bold tracking-wider text-white"
                                >
                                    <Instagram className="h-2.5 w-2.5" />
                                    INSTAGRAM
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Below Photo: Member Name & Role (Shown on front) */}
            <div className={`flex flex-col items-center px-1 text-center transition-opacity duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                <h3 className="font-kemco text-sm leading-tight text-white drop-shadow-[2px_2px_0px_#000] sm:text-base">
                    {member.name}
                </h3>
                <p className="mt-1 font-depixel text-[11px] leading-snug font-medium text-amber-400 drop-shadow-[1px_1px_0px_#000] sm:text-xs">
                    {member.role}
                </p>
            </div>
        </div>
    );
}

export default function TeamSection({ members = DEFAULT_MEMBERS }: Props) {
    return (
        <section className="relative w-full overflow-hidden bg-[#121212]/80 py-16">
            <div className="mx-auto max-w-6xl px-6">
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

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8 lg:grid-cols-4">
                    {members.map((member) => (
                        <PixelTeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}
