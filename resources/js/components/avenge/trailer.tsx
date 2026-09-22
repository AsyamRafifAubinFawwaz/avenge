import { Play } from 'lucide-react';
import { useState } from 'react';
import PaperFrame from '../../../assets/dashboard/paperframe-background.png';

export default function TrailerSection() {
    const [hasStarted, setHasStarted] = useState(false);

    return (
        <section
            id="trailer"
            aria-labelledby="trailer-title"
            className="relative overflow-hidden bg-[#8C1C2A] px-2 py-8 sm:px-4 lg:px-8 lg:py-10"
        >
            <div className="mx-auto max-w-2xl">
                <h2
                    id="trailer-title"
                    className="sr-only"
                >
                    Trailer
                </h2>

                <div className="relative mx-auto aspect-543/420 w-[90%] max-w-2xl sm:w-full">
                    <img
                        src={PaperFrame}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-fill"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="relative h-[76%] w-[80%] overflow-hidden border-4 border-[#998568] bg-black"
                            style={{ boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.5)' }}
                        >
                            <iframe
                                className="relative z-0 h-full w-full border-0"
                                src={`https://www.youtube.com/embed/CnEqrgMlWLQ?autoplay=${hasStarted ? '1' : '0'}&rel=0`}
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
                    </div>

                    <div
                        className="absolute left-[8%] top-[8%] h-[12%] w-[12%] rounded-full border-[clamp(3px,0.5vw,6px)] border-amber-500 bg-amber-500 shadow-[3px_4px_0_#3b1b18]"
                        aria-hidden="true"
                    />

                    {/* <div className="absolute bottom-[11%] left-1/2 flex -translate-x-1/2 items-center gap-2 border-2 border-black bg-[#f3a000] px-3 py-1 font-kemco text-[clamp(6px,0.8vw,12px)] uppercase text-black shadow-[2px_2px_0_#4b2918]">
                        <span className="inline-block h-2 w-2 bg-black" aria-hidden="true" />
                        Now playing
                    </div> */}
                </div>
            </div>
        </section>
    );
}
