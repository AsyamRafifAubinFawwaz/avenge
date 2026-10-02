import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import type { CSSProperties } from 'react';
import TrailerBorder from '../../../assets/border-trailer.png'; // PNG yang udah di-crop (1618x685)

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TrailerSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const copyRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const borderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const copy = copyRef.current;
        const frame = frameRef.current;
        const border = borderRef.current;

        if (!copy || !frame || !border) {
            return;
        }

        const entrance = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 82%',
                once: true,
            },
        });

        entrance.fromTo(
            copy,
            { autoAlpha: 0, x: reduce ? 0 : -28 },
            { autoAlpha: 1, x: 0, duration: reduce ? 0 : 0.65 },
        );
        entrance.fromTo(
            frame,
            { autoAlpha: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.985 },
            { autoAlpha: 1, y: 0, scale: 1, duration: reduce ? 0 : 0.75 },
            '-=0.42',
        );
        entrance.fromTo(
            border,
            { autoAlpha: 0, scale: reduce ? 1 : 0.97 },
            { autoAlpha: 1, scale: 1, duration: reduce ? 0 : 0.45 },
            '-=0.42',
        );
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="about"
            aria-labelledby="trailer-title"
            className="relative overflow-hidden px-2 py-8 sm:px-4 lg:px-8 lg:py-10"
        >
            <div className="mx-auto grid max-w-6xl items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14">
                <div ref={copyRef} className="max-w-md px-2 sm:px-0 lg:max-w-none will-change-transform">
                    <h2
                        id="trailer-title"
                        className="font-kemco text-2xl leading-tight text-white drop-shadow-[3px_3px_0_#000] min-[400px]:text-3xl sm:text-5xl"
                    >
                        We Are Avenge
                    </h2>
                    <p className="mt-3 font-depixel text-xs leading-6 text-white/75 sm:text-sm sm:leading-7">
                        Delivering a straight forward and fast-paced medieval fantasy action experience, the core focus lies on responsive character controls and dynamic combat rhythm. Wrapped in classic pixel art, the game tests player reflexes and precise timing in executing sword and magic combos to create a challenging gameplay experience every second.
                    </p>
                </div>

                {/* Container: patokan satuan cqw */}
                <div
                    ref={frameRef}
                    className="mx-auto w-full max-w-3xl sm:w-[95%] lg:w-full"
                    style={{ containerType: 'inline-size' }}
                >
                    <div
                        className="relative"
                        style={
                            {
                                '--u': 'max(calc(100cqw / 1618), 0.3px)',
                                '--inset': 'calc(var(--u) * 80)',
                                padding: 'var(--inset)',
                            } as CSSProperties
                        }
                    >
                        <div
                            aria-hidden="true"
                            className="absolute bg-black"
                            style={{ inset: 'calc(var(--u) * 40)' }}
                        />

                        <div className="relative aspect-video w-full overflow-hidden bg-black">
                            <iframe
                                className="absolute inset-0 h-full w-full border-0"
                                src="https://www.youtube.com/embed/1KKUyxEqR9g?rel=0"
                                title="Avenge trailer"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>

                        <div
                            aria-hidden="true"
                            ref={borderRef}
                            className="pointer-events-none absolute inset-0 z-10 will-change-transform"
                            style={{
                                borderStyle: 'solid',
                                borderWidth: 'calc(var(--u) * 112)',
                                borderImage: `url("${TrailerBorder}") 112 / calc(var(--u) * 112) stretch`,
                                imageRendering: 'pixelated',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}