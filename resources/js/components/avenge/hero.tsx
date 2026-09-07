import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import GunungImg from '../../../assets/Gunung.png';
import RumahTerbakarVid from '../../../assets/clean_rumahterbakar.webm';
import SiluetIfaruzImg from '../../../assets/SiluetIfaruz.png';
import AwanBesarImg from '../../../assets/awan-besar.png';
import AwanKecil1Img from '../../../assets/awan-kecil1.png';
import AwanKecil2Img from '../../../assets/awan-kecil2.png';
import AwanKecil3Img from '../../../assets/awan-kecil3.png';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const HeroSection = () => {
    const container = useRef(null);
    const gunung1 = useRef(null);
    const gunung2 = useRef(null);
    const siluet = useRef(null);
    const rumah = useRef(null);
    const textGroup = useRef(null);
    const awanBesar = useRef(null);
    const awanKecil1 = useRef(null);
    const awanKecil2 = useRef(null);
    const awanKecil3 = useRef(null);

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

        // Continuous floating animation for clouds (pergerakan mengambang yang lebih terasa)
        gsap.to(awanBesar.current, { x: 50, y: 15, duration: 15, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(awanKecil1.current, { x: -40, y: 10, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(awanKecil2.current, { x: 45, y: -10, duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(awanKecil3.current, { x: -50, y: 12, duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' });

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
            .to(textGroup.current, { yPercent: -80, opacity: 0, ease: 'none' }, 0)
            .to(awanBesar.current, { yPercent: 10, xPercent: 3, ease: 'none' }, 0)
            .to(awanKecil1.current, { yPercent: 14, xPercent: -3, ease: 'none' }, 0)
            .to(awanKecil2.current, { yPercent: 12, xPercent: 4, ease: 'none' }, 0)
            .to(awanKecil3.current, { yPercent: 16, xPercent: -4, ease: 'none' }, 0);

    }, { scope: container });

    return (
        <div ref={container} className="relative overflow-x-hidden w-screen min-h-[calc(100vh+96px)] flex justify-center items-center flex-col bg-sky-900/20">
            {/* Background Clouds */}
            <img ref={awanBesar} src={AwanBesarImg} alt="" className="absolute top-[8%] left-[-2%] w-[80%] md:w-[45%] object-contain pointer-events-none z-0 opacity-80" />
            <img ref={awanKecil1} src={AwanKecil1Img} alt="" className="absolute top-[12%] right-[5%] w-[30%] md:w-[15%] object-contain pointer-events-none z-0 opacity-70" />
            <img ref={awanKecil2} src={AwanKecil2Img} alt="" className="absolute top-[25%] left-[15%] w-[35%] md:w-[18%] object-contain pointer-events-none z-0 opacity-60" />
            <img ref={awanKecil3} src={AwanKecil3Img} alt="" className="absolute top-[22%] right-[20%] w-[30%] md:w-[14%] object-contain pointer-events-none z-0 opacity-75" />

            <img ref={gunung1} src={GunungImg} alt="" className="absolute bottom-[-5%] scale-150 left-0 w-[70%] md:w-[40%] object-contain pointer-events-none z-0" />
            <img ref={gunung2} src={GunungImg} alt="" className="absolute bottom-[-15%] right-0 w-[70%] md:w-[40%] scale-150 object-contain pointer-events-none z-10 scale-x-[-1]" />
            <img ref={siluet} src={SiluetIfaruzImg} alt="" className="absolute bottom-[-40%] left-[-10%] md:left-[8%] w-[60%] md:w-[30%] scale-150 object-contain pointer-events-none z-[15]" />
            <video ref={rumah} src={RumahTerbakarVid} autoPlay loop muted playsInline className="absolute bottom-[-3%] left-1/2 -translate-x-1/2 w-[95%] md:w-[60%] object-contain pointer-events-none z-5" />

            <div ref={textGroup} className="text-group relative z-20 flex flex-col items-center -translate-y-15 px-4 md:px-0 w-full">
                <h1 className='text-white text-4xl md:text-5xl lg:text-7xl font-kemco text-center drop-shadow-[4px_8px_1px_rgba(0,0,0,0.5)] '>AVENGE THE VILLAGE <br className="hidden md:block"/>IGNITE THE RESISTANCE</h1>
                <div className='w-full md:w-2/3 text-center mt-4'>
                    <p className="font-depixel text-white text-sm md:text-base lg:text-lg drop-shadow-md">Lorem ipsum dolor sit amet adispicing polije sip sip sip dupaktiting jos jis solid solid solid</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mt-8 w-full px-4 sm:px-0">
                        <a href="#" className="btn-pixelated w-full sm:w-auto text-center">Pre-Register</a>
                        <a href="#" className="btn-pixelated w-full sm:w-auto text-center">Watch Trailer</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
