import { Link } from '@inertiajs/react';
import CardNewsBG from '../../../assets/bg_card_news.png';
import paperNewsBackground from '../../../assets/bg_paper_berita.png';

type NewsItem = {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    description: string;
    category_id: number;
    category?: { id: number; name: string };
    created_at: string;
};

type Props = {
    latestNews?: NewsItem[];
};

function stripHtml(html: string) {
    return html.replace(/<[^>]+>/g, '');
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function PixelNewsCard({ item }: { item: NewsItem }) {
    return (
        <Link
            href={`/news/${item.slug}`}
            aria-label={`Baca berita: ${item.title}`}
            className="group block cursor-pointer select-none rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
        >
            <div
                className="relative transition-transform duration-200 ease-out group-hover:-translate-y-2 group-active:translate-y-0.5"
                style={{ filter: 'drop-shadow(4px 6px 0px rgba(0,0,0,0.65))' }}
            >
                <img
                    src={CardNewsBG}
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute inset-0 block h-full w-full select-none"
                    style={{ imageRendering: 'pixelated' }}
                />

                <div className="relative flex flex-col px-[12%] pt-[9%] pb-[12%]">
                    <div
                        className="relative aspect-[4/3] w-full overflow-hidden bg-[#998568]"
                        style={{
                            clipPath: 'polygon(0 6px, 6px 6px, 6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px))',
                        }}
                    >
                        {item.image ? (
                            <img
                                src={`/storage/${item.image}`}
                                alt={item.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-depixel text-xs text-[#5a3a00]/40 sm:text-base">[ NO IMG ]</span>
                            </div>
                        )}
                        <div
                            className="pointer-events-none absolute inset-0 z-10"
                            style={{
                                boxShadow: 'inset 5px 5px 8px rgba(0,0,0,0.55), inset -4px -4px 6px rgba(0,0,0,0.2)',
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-1 pt-3">
                        <p className="line-clamp-3 break-words font-kemco text-sm font-bold leading-snug text-[#030200]/80 uppercase sm:text-base lg:text-lg">
                            {item.title}
                        </p>

                        <p className="line-clamp-3 break-words font-depixel text-[10px] leading-relaxed text-[#030200]/60 sm:text-xs">
                            {stripHtml(item.description)}
                        </p>

                        <div className="mt-2 flex items-start justify-between gap-2 border-t border-[#030200]/15 pt-2">
                            <p className="break-words font-depixel text-[9px] font-bold text-[#030200]/60 uppercase sm:text-[10px]">
                                {item.category?.name ?? 'UMUM'}
                            </p>
                            <p className="shrink-0 text-right font-depixel text-[9px] text-[#030200]/50 sm:text-[10px]">
                                {formatDate(item.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}


export default function NewsSection({ latestNews = [] }: Props) {
    return (
        <section
            className="relative z-10 -mt-8 w-full overflow-hidden bg-transparent pt-28 pb-32 sm:-mt-10 sm:pt-20"
        >
            <div
                className="pointer-events-none absolute inset-0 z-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${paperNewsBackground})` }}
            />

            <div className="relative z-20 mx-auto max-w-6xl px-6 pt-4">
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex flex-col gap-1">
                        <div className="w-3 h-3 bg-amber-500" style={{ boxShadow: '2px 2px 0 #000' }} />
                        <div className="w-3 h-3 bg-amber-400" style={{ boxShadow: '2px 2px 0 #000' }} />
                    </div>
                    <div className="font-kemco text-4xl text-black drop-shadow-">
                        BERITA TERBARU
                    </div>
                    <div className="flex-1 h-0.5 bg-black/30" />
                    <Link
                        href="/news"
                        className="btn-pixelated text-xs"
                        style={{ '--btn-color': '#000' } as React.CSSProperties}
                    >
                        SEMUA BERITA
                    </Link>
                </div>

                {latestNews.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                        <p className="font-depixel text-white/40 text-xs uppercase tracking-widest">
                            [ BELUM ADA BERITA ]
                        </p>
                    </div>
                )}

                {latestNews.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                        {latestNews.slice(0, 4).map(item => (
                            <PixelNewsCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>


        </section>
    );
}
