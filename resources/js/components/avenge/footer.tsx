import { FaChevronRight } from 'react-icons/fa';
import LogoAvenge from '../../../assets/logo_avenge.png';
import LogoMotrackImg from '../../../assets/motrack.png';
import LogoSaranbacaImg from '../../../assets/saranbaca.webp';
import LogoGleveritImg from '../../../assets/gleverit.png';
import BgKertas from '../../../assets/bg_paper_footer.png';
import HannajibLogo from '../../../assets/hannajib.svg';

const footerLinks = [
    { label: 'Home', href: '#' },
    { label: 'Character', href: '#character' },
    { label: 'Gameplay', href: '#gameplay' },
    { label: 'Events', href: '#events' },
];

const supportedByLogos = [
    { src: LogoMotrackImg, alt: 'Motrack' },
    { src: LogoSaranbacaImg, alt: 'Saranbaca' },
    { src: LogoGleveritImg, alt: 'gleverit' },
    { src: HannajibLogo, alt: 'Hannajib' },
];

function SponsorLogo({ src, alt }: { src: string; alt: string }) {
    return (
        <img
            src={src}
            alt={alt}
            title={alt}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            style={{ imageRendering: 'pixelated' }}
        />
    );
}

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t-4 border-black bg-[#8C1C2A] text-white">
            <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(135deg,transparent_24%,#fbbf24_25%,#fbbf24_26%,transparent_27%),linear-gradient(45deg,transparent_24%,#000_25%,#000_26%,transparent_27%)] [background-size:18px_18px] opacity-10" />

            <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:gap-16 md:py-20">
                <div className="flex flex-col items-start">
                    <div className="flex flex-col items-start gap-1.5">
                        <p className="font-depixel text-[10px] tracking-[0.35em] text-amber-300 uppercase">
                            THE WORLD OF
                        </p>
                        <img
                            src={LogoAvenge}
                            alt="AVENGE"
                            className="h-16 w-auto object-contain drop-shadow-[4px_4px_0px_#000] sm:h-20"
                            style={{ imageRendering: 'pixelated' }}
                        />
                    </div>

                    <div className="mt-10 border-l-4 border-amber-400 pl-4">
                        <p className="font-depixel text-xs leading-6 text-amber-100/75 sm:text-sm">
                            THE PATH OF IFARUZ
                            <br />
                            FROM THE ASHES
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-start md:items-start md:text-start">
                    <h3 className="font-kemco text-xl drop-shadow-[2px_2px_0px_#000]">
                        NAVIGATION
                    </h3>
                    <nav className="mt-3 flex flex-col items-start gap-2 font-depixel text-base text-[#F8F9FA]">
                        {footerLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="flex items-center gap-2 text-base transition-colors hover:text-amber-300"
                            >
                                <FaChevronRight className="h-2.5 w-2.5 shrink-0 text-amber-400" />
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-col justify-start md:items-end md:text-right">
                    <h2 className="font-kemco text-xl text-[#F8F9FA] drop-shadow-[2px_2px_0px_#000]">
                        SUPPORTED BY
                    </h2>
                    <div
                        className="relative mt-6 flex w-full items-center justify-center gap-6 px-8 py-5"
                        style={{
                            backgroundImage: `url(${BgKertas})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {supportedByLogos.map((logo) => (
                            <SponsorLogo
                                key={logo.alt}
                                src={logo.src}
                                alt={logo.alt}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-amber-400/30 bg-black/20 px-6 py-5">
                <div className="mx-auto max-w-6xl text-center font-depixel text-[10px] text-amber-100/55">
                    <p>
                        © {new Date().getFullYear()} AVENGE. ALL RIGHTS
                        RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
}
