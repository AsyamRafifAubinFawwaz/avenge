import GunungImg from '../../../assets/Gunung.png';
import RumahTerbakarImg from '../../../assets/RumahTerbakar.png';
import SiluetIfaruzImg from '../../../assets/SiluetIfaruz.png';

export const HeroSection = () => {
    return (
        <div className="relative overflow-x-hidden w-screen min-h-screen flex justify-center items-center flex-col">
            <img src={GunungImg} alt="" className="absolute bottom-[-20%] scale-150 left-0 w-[40%] object-contain pointer-events-none z-0" />
            <img src={GunungImg} alt="" className="absolute bottom-[-30%] right-0 w-[40%] scale-150 object-contain pointer-events-none z-10 scale-x-[-1]" />
            <img src={SiluetIfaruzImg} alt="" className="absolute bottom-[-40%] left-[8%] w-[30%] scale-150 object-contain pointer-events-none z-0" />
            <img src={RumahTerbakarImg} alt="" className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[60%] object-contain pointer-events-none z-5" />

            <div className="relative z-20 flex flex-col items-center -translate-y-15">
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
