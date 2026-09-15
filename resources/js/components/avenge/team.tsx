import React from 'react';
import RafifImg from '../../../assets/teams/rafif.png';

export type TeamMember = {
    id: number;
    name: string;
    role: string;
    image?: string | null;
};

const DEFAULT_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: 'Rafif (Founder)',
        role: 'Lead Developer & Game Design',
        image: RafifImg,
    },
    {
        id: 2,
        name: 'Mara',
        role: 'Producer & Game Design',
        image: null,
    },
    {
        id: 3,
        name: 'Dominik',
        role: 'Code & Game Design',
        image: null,
    },
    {
        id: 4,
        name: 'Patrick',
        role: 'Art & UX/UI',
        image: null,
    },
    {
        id: 5,
        name: 'Daniel',
        role: 'Technical Artist & 3D',
        image: null,
    },
    {
        id: 6,
        name: 'Niklas',
        role: '3D Art',
        image: null,
    },
];

type Props = {
    members?: TeamMember[];
};

export function PixelTeamCard({ member }: { member: TeamMember }) {
    return (
        <div className="group flex flex-col items-center select-none">
            {/* Image Container (Direct photo layout, no solid BG box) */}
            <div className="relative mb-3 flex aspect-[3/4] w-full items-center justify-center">
                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.7)] filter transition-transform duration-150 group-hover:scale-105"
                        style={{ imageRendering: 'pixelated' }}
                    />
                ) : (
                    /* Clean Dashed Placeholder Slot for Team Member Photo */
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-sm border-2 border-dashed border-amber-500/40 bg-black/20 p-3 text-center transition-colors group-hover:border-amber-400 group-hover:bg-amber-500/10">
                        {/* Pixel Art Silhouette Icon */}
                        <svg
                            className="mb-2 h-12 w-12 text-amber-500/60 transition-colors group-hover:text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2a5 5 0 00-5 5v2a5 5 0 0010 0V7a5 5 0 00-5-5zM4 21v-2a6 6 0 016-6h4a6 6 0 016 6v2H4z" />
                        </svg>
                        <span className="font-depixel text-[10px] font-bold tracking-wider text-amber-400/80 uppercase">
                            [ FOTO {member.name.split(' ')[0]} ]
                        </span>
                        <span className="mt-1 font-depixel text-[8px] text-white/40">
                            TATA LETAK FOTO
                        </span>
                    </div>
                )}
            </div>

            {/* Member Info */}
            <div className="flex flex-col items-center px-1 text-center">
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
                {/* Section Header */}
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

                {/* Team Members Grid (6 items matching screenshot) */}
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8 lg:grid-cols-6">
                    {members.map((member) => (
                        <PixelTeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}
