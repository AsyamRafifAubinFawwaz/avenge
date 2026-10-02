import type { CSSProperties } from 'react';
import TrailerBorder from '../../../assets/border-trailer.png'; // PNG yang udah di-crop (1618x685)

export default function TrailerSection() {
    return (
        <section
            id="gameplay"
            aria-labelledby="trailer-title"
            className="relative overflow-hidden px-2 py-8 sm:px-4 lg:px-8 lg:py-10"
        >
            <div className="mx-auto grid max-w-6xl items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14">
                <div className="max-w-md px-2 sm:px-0 lg:max-w-none">
                    <h2
                        id="trailer-title"
                        className="font-kemco text-2xl leading-tight text-white drop-shadow-[3px_3px_0_#000] min-[400px]:text-3xl sm:text-5xl"
                    >
                        We Are Avenge
                    </h2>
                    <p className="mt-3 font-depixel text-xs leading-6 text-white/75 sm:text-sm sm:leading-7">
                        Delivering a straightforward and fast-paced medieval fantasy action experience, the core focus lies on responsive character controls and dynamic combat rhythm. Wrapped in classic pixel art, the game tests player reflexes and precise timing in executing sword and magic combos to create a challenging gameplay experience every second.
                    </p>
                </div>

                {/* Container: patokan satuan cqw */}
                <div
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
                            className="pointer-events-none absolute inset-0 z-10"
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