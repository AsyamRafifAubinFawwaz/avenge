import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import GunungImg from '../../../assets/Gunung.png';
import RumahTerbakarImg from '../../../assets/RumahTerbakar.png';
import SiluetIfaruzImg from '../../../assets/SiluetIfaruz.png';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const    HeroSection = () => {
    const container = useRef(null);
    const gunung1 = useRef(null);
    const gunung2 = useRef(null);
    const siluet = useRef(null);
    const rumah = useRef(null);
    const textGroup = useRef(null);

    useGSAP(() => {
        const entranceTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        entranceTl
            .from('.text-group h1', {
                y: -50,
                scale: 1.15,
                opacity: 0,
                duration: 1.2,
                filter: 'blur(10px)',
            })
            .from('.text-group p', {
                y: 25,
                opacity: 0,
                duration: 0.8,
            }, '-=0.6')
            .from('.text-group a', {
                y: 20,
                scale: 0.85,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'back.out(1.7)',
            }, '-=0.4');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.2,
            }
        });

        tl.to(gunung1.current, { yPercent: 10, ease: 'none' }, 0)
            .to(gunung2.current, { yPercent: 12, ease: 'none' }, 0)
            .to(rumah.current, { yPercent: -15, scale: 1.08, ease: 'none' }, 0)
            .to(siluet.current, { yPercent: -35, xPercent: -8, ease: 'none' }, 0)
            .to(textGroup.current, { yPercent: -80, opacity: 0, ease: 'none' }, 0);

    }, { scope: container });

    return (
        <div ref={container} className="relative overflow-x-hidden w-screen min-h-[calc(100vh+96px)] flex justify-center items-center flex-col">
            <img ref={gunung1} src={GunungImg} alt="" className="absolute bottom-[-5%] scale-150 left-0 w-[40%] object-contain pointer-events-none z-0" />
            <img ref={gunung2} src={GunungImg} alt="" className="absolute bottom-[-15%] right-0 w-[40%] scale-150 object-contain pointer-events-none z-10 scale-x-[-1]" />
            <img ref={siluet} src={SiluetIfaruzImg} alt="" className="absolute bottom-[-40%] left-[8%] w-[30%] scale-150 object-contain pointer-events-none z-0" />
            <img ref={rumah} src={RumahTerbakarImg} alt="" className="absolute bottom-[-3%] left-1/2 -translate-x-1/2 w-[60%] object-contain pointer-events-none z-5" />

            <div ref={textGroup} className="relative z-20 flex flex-col items-center -translate-y-15">
                <h1 className='text-white text-7xl font-kemco text-center drop-shadow-[4px_8px_1px_rgba(0,0,0,0.5)] '>AVENGE THE VILLAGE <br />IGNITE THE RESISTANCE</h1>
                <div className='w-2/3 text-center mt-4'>
                    <p className="font-depixel text-white text-lg drop-shadow-md">Lorem ipsum dolor sit amet adispicing polije sip sip sip dupaktiting jos jis solid solid solid</p>
                    <div className="flex justify-center gap-5 mt-8">
                        <a href="" className="btn-pixelated">Pre-Register</a>
                        <a href="" className="btn-pixelated">Watch Trailer</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
