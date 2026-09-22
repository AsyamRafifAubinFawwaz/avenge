import { FaChevronRight } from 'react-icons/fa';
import AvengeLogo from '../../../assets/logo.png';
const footerLinks = [
    { label: 'Home', href: '#' },
    { label: 'Character', href: '#character' },
    { label: 'Gameplay', href: '#gameplay' },
    { label: 'Events', href: '#events' },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t-4 border-black bg-[#8C1C2A] text-white">
            <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(135deg,transparent_24%,#fbbf24_25%,#fbbf24_26%,transparent_27%),linear-gradient(45deg,transparent_24%,#000_25%,#000_26%,transparent_27%)] [background-size:18px_18px] opacity-10" />

            <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:gap-16 md:py-20">
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-4">
                        <img
                            src={AvengeLogo}
                            alt="Avenge"
                            className="h-20 w-20 object-contain drop-shadow-[4px_4px_0px_#000]"
                        />
                        <div>
                            <p className="font-depixel text-[10px] tracking-[0.35em] text-amber-300">
                                THE WORLD OF
                            </p>
                            <h2 className="font-kemco text-3xl tracking-wider text-white drop-shadow-[3px_3px_0px_#000] sm:text-4xl">
                                AVENGE
                            </h2>
                        </div>
                    </div>

                    <div className="mt-10 border-l-4 border-amber-400 pl-4">
                        <p className="font-depixel text-xs leading-6 text-amber-100/75 sm:text-sm">
                            BUILD THE VILLAGE.
                            <br />
                            IGNITE THE RESISTANCE.
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
                    <div className="mt-7 flex w-full max-w-md justify-start md:justify-end">
                        <img
                            src={AvengeLogo}
                            alt="Avenge partner logo"
                            className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                        />
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
