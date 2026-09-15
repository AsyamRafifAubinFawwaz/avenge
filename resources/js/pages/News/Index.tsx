import { Head, Link, router } from '@inertiajs/react';
import { NavbarHome } from '@/components/avenge/navbar';
import MainLayout from '@/layouts/MainLayouts';
import CardNewsBG from '../../../assets/CardNewsBG.png';

type Category = {
    id: number;
    name: string;
    slug: string;
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

type PaginatedNews = {
    data: NewsItem[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
};

type Props = {
    categories: Category[];
    news: PaginatedNews;
    currentCategory: string;
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

export default function NewsIndex({ categories, news, currentCategory }: Props) {
    return (
        <>
            <Head title="Berita — Avenge: Last Manager Kopdes" />
            <MainLayout>
                <NavbarHome />

                <main className="min-h-screen bg-[#0d0203] pt-20">

                    <div className="relative w-full bg-[#A90C1F] py-12 px-6 overflow-hidden flex flex-col items-center text-center">
                        <div
                            className="absolute inset-0 pointer-events-none opacity-10"
                            style={{
                                background: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.6) 3px, rgba(0,0,0,0.6) 6px)',
                            }}
                        />
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

                    <div className="flex flex-col">
                        <div className="w-full bg-[#A90C1F] h-3" />
                        <div className="w-full bg-[#A90C1F80] h-3" />
                        <div className="w-full bg-[#A90C1F40] h-3" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 py-14">
                        
                        <div className="flex justify-end mb-14">
                            <div className="relative inline-flex flex-col sm:flex-row items-center gap-4">
                                {/* <span className="font-depixel text-white/70 text-[10px] uppercase">
                                    FILTER KATEGORI:
                                </span> */}
                                <div className="relative group">
                                    <select
                                        value={currentCategory}
                                        onChange={(e) => {
                                            if (e.target.value === 'all') {
                                                router.get('/news');
                                            } else {
                                                router.get('/news', { category: e.target.value });
                                            }
                                        }}
                                        className="appearance-none font-kemco text-white text-sm tracking-wider px-5 py-3 pr-12 focus:outline-none cursor-pointer select-none uppercase active:translate-y-[2px] active:translate-x-[2px] transition-transform"
                                        style={{
                                            backgroundColor: '#434343',
                                            border: '2px solid #111',
                                            boxShadow: 'inset 2px 2px 0 0 #7b7b7b, inset -2px -2px 0 0 #2b2b2b, 4px 4px 0 0 rgba(0,0,0,0.8)',
                                            borderRadius: '4px',
                                            textShadow: '2px 2px 0 #000',
                                        }}
                                    >
                                        <option value="all">SEMUA BERITA</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.name}>
                                                {cat.name.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                    <div 
                                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white font-depixel text-[10px] group-active:translate-y-[calc(-50%+2px)] group-active:translate-x-[2px] transition-transform"
                                        style={{ textShadow: '2px 2px 0 #000' }}
                                    >
                                        ▼
                                    </div>
                                </div>
                            </div>
                        </div>

                        {news.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                                    {news.data.map(item => (
                                        <PixelNewsCard key={item.id} item={item} />
                                    ))}
                                </div>

                                {(news.prev_page_url || news.next_page_url) && (
                                    <div className="flex items-center justify-center gap-6 mt-20">
                                        {news.prev_page_url && (
                                            <Link
                                                href={news.prev_page_url}
                                                className="group relative flex items-center justify-center px-6 py-3 bg-[#434343] active:translate-y-[2px] active:translate-x-[2px] transition-transform select-none"
                                                style={{
                                                    border: '2px solid #111',
                                                    boxShadow: 'inset 2px 2px 0 0 #7b7b7b, inset -2px -2px 0 0 #2b2b2b, 4px 4px 0 0 rgba(0,0,0,0.8)',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                <span 
                                                    className="font-kemco text-white text-lg tracking-wider"
                                                    style={{ textShadow: '2px 2px 0 #000' }}
                                                >
                                                    KEMBALI
                                                </span>
                                            </Link>
                                        )}
                                        {news.next_page_url && (
                                            <Link
                                                href={news.next_page_url}
                                                className="group relative flex items-center justify-center px-8 py-3 bg-[#434343] active:translate-y-[2px] active:translate-x-[2px] transition-transform select-none"
                                                style={{
                                                    border: '2px solid #111',
                                                    boxShadow: 'inset 2px 2px 0 0 #7b7b7b, inset -2px -2px 0 0 #2b2b2b, 4px 4px 0 0 rgba(0,0,0,0.8)',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                <span 
                                                    className="font-kemco text-white text-lg tracking-wider"
                                                    style={{ textShadow: '2px 2px 0 #000' }}
                                                >
                                                    LAINNYA
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
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
