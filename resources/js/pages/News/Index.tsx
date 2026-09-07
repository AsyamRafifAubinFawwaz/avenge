import { Head, Link } from '@inertiajs/react';
import { NavbarHome } from '@/components/avenge/navbar';
import MainLayout from '@/layouts/MainLayouts';

type Category = {
    id: number;
    name: string;
    slug: string;
    news: NewsItem[];
};

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
    categories: Category[];
    latestNews: NewsItem[];
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

function PixelNewsCard({ item, large = false }: { item: NewsItem; large?: boolean }) {
    return (
        <Link
            href={`/news/${item.slug}`}
            className={`group relative flex flex-col overflow-hidden bg-[#1a0509] cursor-pointer
                transition-transform duration-100 active:translate-y-[2px]
                ${large ? 'min-h-[360px]' : 'min-h-[220px]'}
            `}
            style={{
                boxShadow: `
                    inset 0 2px 0 0 rgba(255,255,255,0.08),
                    inset 0 -2px 0 0 rgba(0,0,0,0.5),
                    0 -2px 0 0 #000,
                    0 2px 0 0 #000,
                    -2px 0 0 0 #000,
                    2px 0 0 0 #000,
                    0 4px 0 0 #000
                `,
                marginBottom: '4px',
            }}
        >
            {/* Image */}
            <div className={`relative overflow-hidden flex-shrink-0 ${large ? 'h-56' : 'h-36'}`}>
                {item.image ? (
                    <img
                        src={`/storage/${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ imageRendering: 'pixelated' }}
                    />
                ) : (
                    <div className="w-full h-full bg-[#A90C1F]/30 flex items-center justify-center">
                        <span className="font-depixel text-white/20 text-2xl">[ NO IMG ]</span>
                    </div>
                )}
                {/* Scanline */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        background: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
                    }}
                />
                {/* Category badge */}
                {item.category && (
                    <span
                        className="absolute top-2 left-2 font-depixel text-[10px] text-white bg-[#A90C1F] px-2 py-0.5 uppercase"
                        style={{ boxShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}
                    >
                        {item.category.name}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1 p-3 flex-1 bg-[#1a0509] group-hover:bg-[#2a0810] transition-colors">
                <div className="w-full h-[2px] bg-[#A90C1F] mb-1" />
                <h3 className={`font-depixel text-white leading-relaxed group-hover:text-amber-400 transition-colors line-clamp-2 ${large ? 'text-sm' : 'text-xs'}`}>
                    {item.title}
                </h3>
                {large && (
                    <p className="font-depixel text-[10px] text-white/50 line-clamp-2 leading-relaxed mt-1">
                        {stripHtml(item.description)}
                    </p>
                )}
                <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="font-depixel text-[9px] text-white/30">{formatDate(item.created_at)}</span>
                    <span
                        className="font-depixel text-[9px] text-amber-400 uppercase px-2 py-0.5"
                        style={{ boxShadow: '1px 1px 0 #000, -1px -1px 0 #000' }}
                    >
                        READ &gt;
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function NewsIndex({ categories, latestNews }: Props) {
    const [featured, ...rest] = latestNews;

    return (
        <>
            <Head title="Berita — Avenge: Last Manager Kopdes" />
            <MainLayout>
                <NavbarHome />

                <main className="min-h-screen bg-[#0d0203] pt-20">

                    {/* ── Hero banner ── */}
                    <div className="relative w-full bg-[#A90C1F] py-12 px-6 overflow-hidden flex flex-col items-center text-center">
                        {/* Scanline overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-10"
                            style={{
                                background: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.6) 3px, rgba(0,0,0,0.6) 6px)',
                            }}
                        />
                        {/* Pixel corner deco */}
                        <div className="absolute top-3 left-3 w-4 h-4 bg-amber-500" style={{ boxShadow: '2px 2px 0 #000' }} />
                        <div className="absolute top-3 right-3 w-4 h-4 bg-amber-500" style={{ boxShadow: '-2px 2px 0 #000' }} />
                        <div className="absolute bottom-3 left-3 w-4 h-4 bg-amber-500" style={{ boxShadow: '2px -2px 0 #000' }} />
                        <div className="absolute bottom-3 right-3 w-4 h-4 bg-amber-500" style={{ boxShadow: '-2px -2px 0 #000' }} />

                        <h1 className="font-kemco text-5xl text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] relative z-10">
                            PUSAT BERITA
                        </h1>
                        <p className="font-depixel text-white/70 text-sm mt-3 max-w-xl relative z-10">
                            Update terbaru seputar Avenge: Last Manager Kopdes
                        </p>
                    </div>

                    {/* Pixel border bottom banner */}
                    <div className="flex flex-col">
                        <div className="w-full bg-[#A90C1F] h-3" />
                        <div className="w-full bg-[#A90C1F80] h-3" />
                        <div className="w-full bg-[#A90C1F40] h-3" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 py-14">

                        {/* ── Featured / Latest ── */}
                        {latestNews.length > 0 && (
                            <div className="mb-16">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex flex-col gap-1">
                                        <div className="w-3 h-3 bg-[#A90C1F]" style={{ boxShadow: '2px 2px 0 #000' }} />
                                        <div className="w-3 h-3 bg-amber-500" style={{ boxShadow: '2px 2px 0 #000' }} />
                                    </div>
                                    <h2 className="font-kemco text-2xl text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                        BERITA TERBARU
                                    </h2>
                                    <div className="flex-1 h-[2px] bg-[#A90C1F]" style={{ boxShadow: '0 2px 0 #000' }} />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    {featured && (
                                        <div className="lg:col-span-2">
                                            <PixelNewsCard item={featured} large />
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-4">
                                        {rest.slice(0, 3).map(item => (
                                            <PixelNewsCard key={item.id} item={item} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── Per-category sections ── */}
                        {categories.length > 0 ? (
                            <div className="flex flex-col gap-16">
                                {categories.map(cat => (
                                    <div key={cat.id}>
                                        {/* Category header */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-2 h-7 bg-amber-500" style={{ boxShadow: '2px 0 0 #000' }} />
                                            <h2 className="font-kemco text-xl text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                                {cat.name.toUpperCase()}
                                            </h2>
                                            <div className="flex-1 h-[1px] bg-white/10" />
                                            <Link
                                                href={`/news?category=${encodeURIComponent(cat.name)}`}
                                                className="font-depixel text-[10px] text-amber-400 hover:text-white transition-colors uppercase"
                                            >
                                                LIHAT SEMUA &gt;
                                            </Link>
                                        </div>

                                        {/* Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {cat.news.map(item => (
                                                <PixelNewsCard
                                                    key={item.id}
                                                    item={{ ...item, category: { id: cat.id, name: cat.name } }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4 py-24">
                                <div
                                    className="font-depixel text-white/20 text-center text-sm"
                                    style={{ imageRendering: 'pixelated' }}
                                >
                                    [ BELUM ADA BERITA ]
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom pixel border */}
                    <div className="flex flex-col">
                        <div className="w-full bg-[#A90C1F40] h-3" />
                        <div className="w-full bg-[#A90C1F80] h-3" />
                        <div className="w-full bg-[#A90C1F] h-3" />
                    </div>
                </main>
            </MainLayout>
        </>
    );
}
