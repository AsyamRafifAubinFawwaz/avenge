import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import BijanGif from '../../../assets/characters/bijan.gif';
import IfaruzGif from '../../../assets/characters/ifaruz.gif';
import KingGif from '../../../assets/characters/king.gif';
import ZawwafGif from '../../../assets/characters/zawwaf.gif';
import TatakanKarakter from '../../../assets/tatakan-character.png';

const CHARACTERS = [
    { name: 'IFARUZ', level: 'LVL. 07', gif: IfaruzGif, sizeClass: 'h-48 sm:h-52' },
    { name: 'ZAWWAF', level: 'LVL. 07', gif: ZawwafGif, sizeClass: 'h-48 sm:h-52 scale-[1.75] origin-bottom -translate-y-2' },
    { name: 'YOR BIJAN', level: 'LVL. 06', gif: BijanGif, sizeClass: 'h-48 sm:h-52 scale-[1.4] origin-bottom -translate-y-1' },
    { name: 'KING AVEHS', level: 'LVL. 08', gif: KingGif, sizeClass: 'h-48 sm:h-52' },
];

export default function AuthSimpleLayout({
    children,
    title,
}: AuthLayoutProps) {
    const [characterIndex, setCharacterIndex] = useState(0);
    const spriteRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCharacterIndex((prev) => (prev + 1) % CHARACTERS.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!spriteRef.current) return;

        const tl = gsap.timeline();
        tl.fromTo(
            spriteRef.current,
            {
                y: -140,
                scaleX: 0.8,
                scaleY: 1.3,
                opacity: 0,
                filter: 'brightness(2.5)',
                transformOrigin: '50% 100%',
            },
            { y: 0, opacity: 1, duration: 0.25, ease: 'power2.in' }
        )
            .to(spriteRef.current, {
                scaleX: 1.2,
                scaleY: 0.8,
                filter: 'brightness(1)',
                duration: 0.08,
                ease: 'power1.out',
            })
            .to(spriteRef.current, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.45,
                ease: 'elastic.out(1, 0.35)',
            });
    }, [characterIndex]);

    const currentCharacter = CHARACTERS[characterIndex];

    return (
        <div className="flex min-h-svh items-center justify-center bg-[#211818] px-4 py-8 sm:px-8">
            <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border-4 border-black/70 bg-[#f7f1df] shadow-[8px_10px_0_rgba(0,0,0,0.45)] lg:min-h-[560px] lg:grid-cols-2">
                <main className="flex items-center justify-center px-6 py-10 sm:px-12 sm:py-14 lg:px-12 lg:py-8">
                    <div className="w-full max-w-md">
                        <Link
                            href={home()}
                            className="mb-5 inline-flex font-kemco text-xs tracking-[0.18em] text-[#8c1c2a] uppercase"
                        >
                            &lt; AVENGE
                        </Link>

                        <div className="mb-5 text-center">
                            <h1 className="font-kemco text-2xl leading-tight text-[#211818] sm:text-3xl">
                                {title}
                            </h1>

                        </div>

                        <div className="font-depixel text-[#211818]">{children}</div>
                    </div>
                </main>

                <aside className="relative hidden min-h-[360px] flex-col items-center justify-center overflow-hidden bg-[#8c1c2a] px-6 py-6 sm:min-h-[440px] sm:px-12 sm:py-8 lg:flex lg:min-h-0">
                    <div className="text-center pt-2">
                        <p className="font-kemco text-3xl tracking-[0.12em] text-[#fbe7b2] drop-shadow-[3px_3px_0_#211818] sm:text-4xl lg:text-5xl">
                            AVENGE
                        </p>
                        <p className="mt-2 font-depixel text-[10px] tracking-[0.2em] text-[#fbe7b2]/75 uppercase">
                            Last Manager Kopdes
                        </p>
                    </div>

                    <div className="relative mt-2 flex flex-col items-center justify-center w-full">
                        <div className="relative flex h-56 sm:h-60 flex-col items-center justify-end w-full">
                            <img
                                ref={spriteRef}
                                key={currentCharacter.name}
                                src={currentCharacter.gif}
                                alt={currentCharacter.name}
                                className={`relative z-10 ${currentCharacter.sizeClass} w-auto object-contain drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]`}
                                style={{ imageRendering: 'pixelated' }}
                            />
                            <img
                                src={TatakanKarakter}
                                alt="Tatakan"
                                className="-mt-14 relative z-0 h-14 w-56 sm:w-64 object-contain"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>
                        <div className="mt-3 flex items-center gap-2 border-2 border-[#211818] bg-[#fbe7b2] px-3.5 py-1 text-[#211818] shadow-[2px_2px_0_#211818] z-10">
                            <span className="font-kemco text-xs tracking-wider">{currentCharacter.name}</span>
                            <span className="font-depixel text-[9px] text-[#8c1c2a] font-bold">{currentCharacter.level}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
