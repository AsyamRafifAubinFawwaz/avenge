import BackgroundPaper from '../../../assets/bg_kertas_gameplay.png';
import FootageOne from '../../../assets/gameplay/footage_1.webm';
import FootageThree from '../../../assets/gameplay/footage_3.webm';
import FootageTwo from '../../../assets/gameplay/footage_2.webm';

const GAMEPLAY_FEATURES = [
    {
        number: '01',
        title: 'Slash through the enemies ahead!',
        description:
            'Susun strategi dan jaga desa tetap berdiri. Setiap posisi menentukan siapa yang bisa bertahan saat serangan datang.',
        video: FootageOne,
        alt: 'Gameplay membangun pertahanan',
    },
    {
        number: '02',
        title: 'Master every skill combo.',
        description:
            'Pilih pahlawan yang tepat untuk setiap misi, gabungkan kemampuan mereka, lalu bentuk tim yang siap menghadapi ancaman.',
        video: FootageTwo,
        alt: 'Gameplay mengelola pasukan',
    },
    {
        number: '03',
        title: 'Face enemies in every stage.',
        description:
            'Bawa pasukanmu keluar dari desa dan rebut kembali wilayah yang dikuasai musuh dalam pertempuran pixel yang brutal.',
        video: FootageThree,
        alt: 'Gameplay menyerang balik',
    },
];

export const GameplaySection = () => {
    return (
        <section
            id="gameplay"
            className="relative z-10 isolate w-full overflow-hidden bg-transparent py-12 pb-28 text-white sm:py-16 sm:pb-36"
            style={{ contentVisibility: 'auto' }}
        >
            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="mb-12 flex items-center gap-4 sm:mb-16">
                    <div className="flex shrink-0 flex-col gap-1">
                        <div className="h-3 w-3 bg-amber-500 shadow-[2px_2px_0_#000]" />
                        <div className="h-3 w-3 bg-amber-400 shadow-[2px_2px_0_#000]" />
                    </div>
                    <h2 className="font-kemco text-3xl leading-tight sm:text-5xl">
                        GAMEPLAY
                    </h2>
                    <div className="h-1 flex-1 bg-[#a90c1f] shadow-[0_3px_0_#000]" />
                </div>

                <div className="flex flex-col gap-16 sm:gap-24">
                    {GAMEPLAY_FEATURES.map((feature, index) => (
                        <article
                            key={feature.number}
                            className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                        >
                            <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                <div
                                    className={`relative mx-auto aspect-video w-[96%] overflow-hidden bg-contain bg-center bg-no-repeat p-8 sm:p-10 lg:p-14 ${index % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}
                                    style={{ backgroundImage: `url(${BackgroundPaper})` }}
                                >
                                    <div className="relative h-full w-full overflow-hidden border-4 border-[#5a321e] bg-[#3b1118] p-1">
                                        <video
                                            src={feature.video}
                                            aria-label={feature.alt}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                <p className="mb-3 font-depixel text-sm tracking-[0.2em] text-amber-300">
                                    // {feature.number}
                                </p>
                                <h3 className="font-kemco text-2xl leading-tight drop-shadow-[3px_3px_0_#000] sm:text-4xl">
                                    {feature.title}
                                </h3>
                                <div className="my-5 h-1 w-24 bg-amber-500" />
                                <p className="max-w-xl font-depixel text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                                    {feature.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
