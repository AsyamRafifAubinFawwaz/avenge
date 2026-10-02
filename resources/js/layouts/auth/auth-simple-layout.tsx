import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh items-center justify-center bg-[#211818] px-4 py-8 sm:px-8">
            <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border-4 border-black/70 bg-[#f7f1df] shadow-[8px_10px_0_rgba(0,0,0,0.45)] lg:min-h-[560px] lg:grid-cols-2">
                <main className="flex items-center justify-center px-6 py-10 sm:px-12 sm:py-14 lg:px-12 lg:py-8">
                    <div className="w-full max-w-md">
                        <Link
                            href={home()}
                            className="mb-5 inline-flex font-kemco text-xs tracking-[0.18em] text-[#8c1c2a] uppercase"
                        >
                            &lt; AVENGE
                        </Link>

                        <div className="mb-5 text-center">
                            <h1 className="font-kemco text-2xl leading-tight text-[#211818] sm:text-3xl">
                                {title}
                            </h1>

                        </div>

                        <div className="font-depixel text-[#211818]">{children}</div>
                    </div>
                </main>

                <aside className="relative hidden min-h-[360px] flex-col items-center overflow-hidden bg-[#8c1c2a] px-6 py-12 sm:min-h-[440px] sm:px-12 sm:py-14 lg:flex lg:min-h-0 lg:py-10">
                    <div className="text-center">
                        <p className="font-kemco text-3xl tracking-[0.12em] text-[#fbe7b2] drop-shadow-[3px_3px_0_#211818] sm:text-5xl">
                            AVENGE
                        </p>
                        <p className="mt-3 font-depixel text-[10px] tracking-[0.2em] text-[#fbe7b2]/75 uppercase">
                            
                        </p>
                    </div>

                    <div className="relative mt-12 flex h-[210px] w-full max-w-[280px] shrink-0 items-center justify-center border-2 border-dashed border-[#fbe7b2]/60 bg-[#211818]/20 sm:mt-14 sm:h-[230px] sm:max-w-[310px] lg:mt-14 lg:h-[230px] lg:max-w-[320px]">
                        <div className="absolute -top-3 left-6 bg-[#fbe7b2] px-2 py-1 font-depixel text-[8px] text-[#211818]">
                            CHARACTER SLOT
                        </div>
                        <div className="text-center font-depixel text-xs leading-relaxed text-[#fbe7b2]/70">
                            <div className="mx-auto mb-3 h-14 w-14 border-2 border-[#fbe7b2]/50 bg-[#211818]/30 sm:h-16 sm:w-16" />
                            [ CHARACTER ART ]
                            <br />
                            COMING SOON
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
