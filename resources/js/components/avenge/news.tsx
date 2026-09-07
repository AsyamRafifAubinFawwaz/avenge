import { Link } from '@inertiajs/react';
import CardNewsBG from '../../../assets/CardNewsBG.png';

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
            className="group block cursor-pointer select-none"
        >
            <div
                className="relative transition-transform duration-100 group-hover:-translate-y-2 group-active:translate-y-[2px]"
                style={{ filter: 'drop-shadow(4px 6px 0px rgba(0,0,0,0.65))' }}
            >
                <img
                    src={CardNewsBG}
                    alt=""
                    aria-hidden
                    className="w-full h-auto block pointer-events-none"
                    style={{ imageRendering: 'pixelated' }}
                />

                <div className="absolute inset-0 flex flex-col px-[12%] pt-[9%] pb-[13%]">
                    <div
                        className="relative w-full flex-[0_0_55%] overflow-hidden bg-[#998568] border-4 border-[#998568]"
                        style={{
                            boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                        }}
                    >
                        {item.image ? (
                            <img
                                src={`/storage/${item.image}`}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-depixel text-[#5a3a00]/40 text-base">[ NO IMG ]</span>
                            </div>
                        )}
                        <div
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{
                                boxShadow: 'inset 5px 5px 8px rgba(0,0,0,0.55), inset -4px -4px 6px rgba(0,0,0,0.2)',
                            }}
                        />
                    </div>


                    <div className="flex flex-col pt-3 flex-1 min-h-0 overflow-hidden">
                        <p className="font-kemco text-[#030200]/80 text-lg sm:text-xl leading-snug uppercase font-bold line-clamp-2 mb-1">
                            {item.title}
                        </p>

                        <p className="font-depixel text-[#030200]/60 text-xs leading-relaxed line-clamp-3 overflow-hidden">
                            {stripHtml(item.description)}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-2">
                            <p className="font-depixel font-bold text-[#030200]/60 text-[10px] uppercase truncate mr-2">
                                {item.category?.name}
                            </p>
                            <p className="font-depixel text-[#030200]/50 text-[10px] shrink-0">
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
        <section className="w-full py-20">

            <div className="max-w-6xl mx-auto px-6 pt-4">
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex flex-col gap-1">
                        <div className="w-3 h-3 bg-amber-500" style={{ boxShadow: '2px 2px 0 #000' }} />
                        <div className="w-3 h-3 bg-amber-400" style={{ boxShadow: '2px 2px 0 #000' }} />
                    </div>
                    <h2 className="font-kemco text-3xl text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,0.8)]">
                        BERITA TERBARU
                    </h2>
                    <div className="flex-1 h-[2px] bg-black/30" />
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {latestNews.slice(0, 4).map(item => (
                            <PixelNewsCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>


        </section>
    );
}
