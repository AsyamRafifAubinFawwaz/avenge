// Variant dengan text reveal + glow effect
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorldImage from '../../../assets/WORLD.png';

gsap.registerPlugin(ScrollTrigger);

const LORE_TEXT = `Legenda bercerita tentang peradaban kuno yang telah terlupakan. Di tengah kegelapan yang mengselimuti dunia, para pemimpin bangkit untuk mempertahankan cahaya terakhir. Ifaruz menyalakan api persembahan, King Avehs mengasah pedang perang, Zawwaf menahan gerbang takdir, dan Yor Bijan membaca jejak masa depan. Kini saatnya untuk mewarisi warisan mereka.`;

export default function WorldSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current || !imageRef.current) return;

            const words = textRef.current.querySelectorAll('span');
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top center',
                    end: 'center center',
                    scrub: 1,
                },
            });

            timeline.from(words, {
                    opacity: 0.3,
                    duration: 0.05,
                    stagger: 0.04,
                }, 0);

            gsap.to(imageRef.current, {
                y: window.innerHeight * 0.15,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-screen flex flex-col z-50">
            <div className="w-full flex flex-col -mt-24 relative z-50">
                <div className="w-full bg-[#21181852] h-8"></div>
                <div className="w-full bg-[#21181880] h-8"></div>
                <div className="w-full bg-[#211818c6] h-8"></div>
            </div>

            <div className="relative w-full min-h-screen overflow-hidden pb-24 flex items-center flex-col bg-[#211818]">
                <div 
                    ref={textRef}
                    className="font-depixel text-lg mt-16 text-white text-center max-w-4xl px-4 z-10 relative leading-relaxed"
                >
                    {LORE_TEXT.split(/(\s+)/).map((word, i) => (
                        <span key={i} className="inline">
                            {word}
                        </span>
                    ))}
                </div>

                <img
                    ref={imageRef}
                    src={WorldImage}
                    alt="World"
                    className="w-full absolute bottom-0 left-0 right-0 translate-y-24 object-cover object-bottom will-change-transform"
                />

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#211818] to-transparent z-20 pointer-events-none" />
            </div>
        </div>
    );
}