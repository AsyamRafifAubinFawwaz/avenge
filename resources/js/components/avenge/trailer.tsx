import { Play } from 'lucide-react';
import { useState } from 'react';
import TrailerBorder from '../../../assets/border-trailer.png'; // pakai PNG yang udah di-crop (1618x685)

export default function TrailerSection() {
    const [hasStarted, setHasStarted] = useState(false);

    return (
        <section
            id="gameplay"
            aria-labelledby="trailer-title"
            className="relative overflow-hidden px-2 py-8 sm:px-4 lg:px-8 lg:py-10"
        >
            <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.8fr_1.5fr] lg:gap-14">
                <div className="max-w-md lg:max-w-none">
                    <h2
                        id="trailer-title"
                        className="font-kemco text-3xl leading-tight text-white drop-shadow-[3px_3px_0_#000] sm:text-5xl"
                    >
                        We Are Avenge
                    </h2>
                    <p className="mt-3 max-w-sm font-depixel text-xs leading-7 text-white/75 sm:text-sm">
                        Saksikan perjalanan para pahlawan Avenge dalam melawan antek-antek asing.
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
                                '--u': 'calc(100cqw / 1618)',
                                '--inset': 'calc(var(--u) * 80)',
                                padding: 'var(--inset)',
                            } as React.CSSProperties
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
                                src={`https://www.youtube.com/embed/4LI8k4Uo9pU?autoplay=${hasStarted ? '1' : '0'}&rel=0`}
                                title="Avenge trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />

                            {!hasStarted && (
                                <button
                                    type="button"
                                    className="absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-black bg-amber-500 text-black shadow-[4px_4px_0_#4b2918] transition-transform hover:translate-x-[calc(-50%+2px)] hover:translate-y-[calc(-50%+2px)] hover:bg-amber-400 sm:h-16 sm:w-16"
                                    aria-label="Putar trailer"
                                    onClick={() => setHasStarted(true)}
                                >
                                    <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true" />
                                </button>
                            )}
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