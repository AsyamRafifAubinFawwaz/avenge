import { Head, Link, router } from '@inertiajs/react';
import { NavbarHome } from '@/components/avenge/navbar';
import MainLayout from '@/layouts/MainLayouts';
import CardNewsBG from '../../../assets/CardNewsBG.png';
import WorldMapBG from '../../../assets/WORLD.png';
import Footer from '@/components/avenge/footer';

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
            className="group block w-full cursor-pointer select-none"
        >
            <div
                className="relative flex w-full flex-row transition-transform duration-100 group-hover:-translate-y-1 group-active:translate-y-[2px]"
                style={{
                    filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.65))',
                    minHeight: '80px',
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: '#cdb896' }}
                />
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[8px] sm:h-[14px]"
                    style={{
                        backgroundImage: `url(${CardNewsBG})`,
                        backgroundSize: 'auto 96px',
                        backgroundPosition: 'top left',
                        backgroundRepeat: 'repeat-x',
                        imageRendering: 'pixelated',
                    }}
                />
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[8px] sm:h-[14px]"
                    style={{
                        backgroundImage: `url(${CardNewsBG})`,
                        backgroundSize: 'auto 96px',
                        backgroundPosition: 'bottom left',
                        backgroundRepeat: 'repeat-x',
                        imageRendering: 'pixelated',
                    }}
                />
                <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-[8px] sm:w-[14px]"
                    style={{
                        backgroundImage: `url(${CardNewsBG})`,
                        backgroundSize: '96px auto',
                        backgroundPosition: 'top left',
                        backgroundRepeat: 'repeat-y',
                        imageRendering: 'pixelated',
                    }}
                />
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-[8px] sm:w-[14px]"
                    style={{
                        backgroundImage: `url(${CardNewsBG})`,
                        backgroundSize: '96px auto',
                        backgroundPosition: 'top right',
                        backgroundRepeat: 'repeat-y',
                        imageRendering: 'pixelated',
                    }}
                />

                {/* ── Content (Compact Horizontal Layout) ── */}
                <div className="relative z-10 flex w-full flex-row gap-2.5 p-2.5 sm:gap-4 sm:p-4 lg:p-5">
                    {/* Gambar left */}
                    <div
                        className="relative h-20 w-22 shrink-0 overflow-hidden border-[2px] border-[#5a3a00] bg-[#5a3a00] sm:h-28 sm:w-36 sm:border-[3px] lg:h-36 lg:w-48"
                        style={{
                            boxShadow: '2px 2px 0px rgba(0,0,0,0.45)',
                        }}
                    >
                        {item.image ? (
                            <img
                                src={`/storage/${item.image}`}
                                alt={item.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-depixel text-[8px] text-[#5a3a00]/40 sm:text-[10px]">
                                    [ NO IMG ]
                                </span>
                            </div>
                        )}
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                boxShadow:
                                    'inset 2px 2px 4px rgba(0,0,0,0.45), inset -2px -2px 4px rgba(0,0,0,0.2)',
                            }}
                        />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                        <div>
                            <h3 className="mb-0.5 line-clamp-2 font-kemco text-[11px] leading-tight font-bold text-[#1a0a00] transition-colors group-hover:text-[#8C1C2A] sm:mb-1.5 sm:text-sm lg:text-base">
                                {item.title}
                            </h3>
                            <p className="mb-1 font-depixel text-[7.5px] tracking-wider text-[#1a0a00]/60 sm:mb-1.5 sm:text-[9.5px]">
                                {formatDate(item.created_at)}
                            </p>
                            <p className="line-clamp-2 font-depixel text-[8.5px] leading-relaxed text-[#1a0a00]/75 sm:line-clamp-3 sm:text-xs">
                                {stripHtml(item.description)}
                            </p>
                        </div>

                        {item.category && (
                            <div className="mt-1 flex items-center gap-2 sm:mt-2">
                                <span className="border border-[#8C1C2A]/30 bg-[#8C1C2A]/10 px-1.5 py-0.5 font-depixel text-[7px] font-bold tracking-widest text-[#8C1C2A] uppercase sm:px-2 sm:text-[9px]">
                                    {item.category.name}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

function HeaderPlaqueBanner() {
    return (
        <div className="absolute -top-4 left-1/2 z-30 -translate-x-1/2 select-none sm:-top-6">
            <div className="absolute -top-1.5 left-4 z-10 h-3 w-4 rotate-[-4deg] border border-[#1a0a00] bg-[#d4a373]/80 sm:-top-2 sm:left-6 sm:h-4 sm:w-5" />
            <div className="absolute -top-1.5 right-4 z-10 h-3 w-4 rotate-[4deg] border border-[#1a0a00] bg-[#d4a373]/80 sm:-top-2 sm:right-6 sm:h-4 sm:w-5" />

            {/* Plaque banner */}
            <div
                className="relative border-[2px] border-[#2b1406] bg-[#fbe7b2] px-4 py-1 sm:border-[3px] sm:px-6 sm:py-2"
                style={{
                    boxShadow:
                        'inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -2px 0 #c2a160, 0 3px 0 #000',
                }}
            >
                <h1
                    className="font-kemco text-xs font-bold tracking-widest text-[#2b1406] uppercase sm:text-base"
                    style={{ textShadow: '1px 1px 0 #e6c885' }}
                >
                    PUSAT BERITA
                </h1>
            </div>
        </div>
    );
}

function SideBinderTab({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`relative shrink-0 cursor-pointer whitespace-nowrap px-2.5 py-1 font-kemco text-[10px] tracking-wider uppercase transition-all select-none active:translate-y-[1px] sm:px-4 sm:py-2 sm:text-xs ${
                isActive
                    ? 'z-10 bg-[#FBA819] font-bold text-[#1a0a00] lg:translate-x-2'
                    : 'bg-[#2a1208] text-white/70 hover:bg-[#3d1c0e] hover:text-white'
            }`}
            style={
                isActive
                    ? {
                          boxShadow:
                              'inset 0 2px 0 0 rgba(255,255,255,0.4), inset 0 -2px 0 0 #c07a00, 0 -2px 0 0 #000, 0 2px 0 0 #000, -2px 0 0 0 #000, 2px 0 0 0 #000, 0 2px 0 0 #000',
                      }
                    : {
                          boxShadow:
                              'inset 0 2px 0 0 rgba(255,255,255,0.08), inset 0 -2px 0 0 #0a0400, 0 -2px 0 0 #000, 0 2px 0 0 #000, -2px 0 0 0 #000, 2px 0 0 0 #000, 0 2px 0 0 #000',
                      }
            }
        >
            {label}
        </button>
    );
}

function PixelWoodenBoard({
    children,
    categories,
    currentCategory,
    onCategoryClick,
}: {
    children: React.ReactNode;
    categories: Category[];
    currentCategory: string;
    onCategoryClick: (cat: string) => void;
}) {
    return (
        <div className="relative mx-auto w-full max-w-3xl pt-2 sm:pt-4">
            <HeaderPlaqueBanner />

            <div className="absolute top-10 -right-36 z-20 hidden flex-col gap-2.5 lg:flex">
                <SideBinderTab
                    label="TERBARU"
                    isActive={currentCategory === 'all'}
                    onClick={() => onCategoryClick('all')}
                />
                {categories.map((cat) => (
                    <SideBinderTab
                        key={cat.id}
                        label={cat.name.toUpperCase()}
                        isActive={currentCategory === cat.name}
                        onClick={() => onCategoryClick(cat.name)}
                    />
                ))}
            </div>

            <div
                className="relative p-3 pt-7 sm:p-6 sm:pt-9"
                style={{
                    backgroundColor: '#3d200b',
                    boxShadow: `
                        0 0 0 3px #1c0d04,
                        0 0 0 6px #5c3314,
                        0 0 0 9px #140802,
                        0 8px 18px rgba(0, 0, 0, 0.75),
                        inset 0 0 24px rgba(0, 0, 0, 0.6)
                    `,
                    backgroundImage: `
                        linear-gradient(to bottom,
                            rgba(255,255,255,0.06) 0%,
                            transparent 2%,
                            transparent 50px,
                            #200e04 51px,
                            #200e04 53px,
                            rgba(255,255,255,0.04) 54px,
                            transparent 56px
                        )
                    `,
                    backgroundSize: '100% 56px',
                    imageRendering: 'pixelated',
                }}
            >
                <div className="absolute top-2 left-2 h-2.5 w-2.5 border border-[#200e04] bg-[#a8824a] shadow-[1px_1px_0_#000] sm:h-3 sm:w-3" />
                <div className="absolute top-2 right-2 h-2.5 w-2.5 border border-[#200e04] bg-[#a8824a] shadow-[1px_1px_0_#000] sm:h-3 sm:w-3" />
                <div className="absolute bottom-2 left-2 h-2.5 w-2.5 border border-[#200e04] bg-[#a8824a] shadow-[1px_1px_0_#000] sm:h-3 sm:w-3" />
                <div className="absolute right-2 bottom-2 h-2.5 w-2.5 border border-[#200e04] bg-[#a8824a] shadow-[1px_1px_0_#000] sm:h-3 sm:w-3" />

                <div className="relative z-10 w-full">{children}</div>
            </div>
        </div>
    );
}

function PixelPagination({ news }: { news: PaginatedNews }) {
    if (news.last_page <= 1) return null;

    return (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 select-none sm:mt-8 sm:gap-2">
            {news.prev_page_url ? (
                <Link
                    href={news.prev_page_url}
                    className="flex h-7 min-w-[30px] items-center justify-center bg-[#2a1208] px-2 font-kemco text-[10px] text-white/80 transition-transform active:translate-y-[1px] sm:h-9 sm:min-w-[38px] sm:px-3 sm:text-xs"
                    style={{
                        boxShadow:
                            'inset 0 2px 0 0 rgba(255,255,255,0.1), inset 0 -2px 0 0 #0a0400, 0 -2px 0 0 #000, 0 2px 0 0 #000, -2px 0 0 0 #000, 2px 0 0 0 #000, 0 2px 0 0 #000',
                        marginBottom: '2px',
                    }}
                >
                    ◀
                </Link>
            ) : (
                <div
                    className="flex h-7 min-w-[30px] cursor-not-allowed items-center justify-center bg-[#180a04] px-2 font-kemco text-[10px] text-white/25 opacity-40 sm:h-9 sm:min-w-[38px] sm:px-3 sm:text-xs"
                    style={{
                        boxShadow:
                            '0 -2px 0 0 #000, 0 2px 0 0 #000, -2px 0 0 0 #000, 2px 0 0 0 #000',
                        marginBottom: '2px',
                    }}
                >
                    ◀
                </div>
            )}

            {news.links
                .filter((link) => !isNaN(Number(link.label)))
                .map((link, idx) => (
                    <Link
                        key={idx}
                        href={link.url || '#'}
                        className={`flex h-7 min-w-[30px] items-center justify-center px-2 font-kemco text-[10px] transition-transform active:translate-y-[1px] sm:h-9 sm:min-w-[38px] sm:px-3 sm:text-xs ${
                            link.active
                                ? 'bg-[#FBA819] text-[#1a0a00]'
                                : 'bg-[#2a1208] text-white/70 hover:text-white'
                        }`}
                        style={
                            link.active
                                ? {
                                      boxShadow:
                                          'inset 0 2px 0 0 rgba(255,255,255,0.4), inset 0 -2px 0 0 #c07a00, 0 -2px 0 0 #000, 0 2px 0 0 #000, -2px 0 0 0 #000, 2px 0 0 0 #000, 0 2px 0 0 #000',
                                      marginBottom: '2px',
                                  }
                                : {
                                      boxShadow:
                                          'inset 0 2px 0 0 rgba(255,255,255,0.08), inset 0 -2px 0 0 #0a0400, 0 -2px 0 0 #000, 0 2px 0 0 #000, -2px 0 0 0 #000, 2px 0 0 0 #000, 0 2px 0 0 #000',
                                      marginBottom: '2px',
                                  }
                        }
                    >
                        {link.label}
                    </Link>
                ))}

            {news.next_page_url ? (
                <Link
                    href={news.next_page_url}
                    className="flex h-7 min-w-[30px] items-center justify-center bg-[#FBA819] px-2 font-kemco text-[10px] text-[#1a0a00] transition-transform active:translate-y-[1px] sm:h-9 sm:min-w-[38px] sm:px-3 sm:text-xs"
                    style={{
                        boxShadow:
                            'inset 0 2px 0 0 rgba(255,255,255,0.4), inset 0 -2px 0 0 #c07a00, 0 -2px 0 0 #000, 0 2px 0 0 #000, -2px 0 0 0 #000, 2px 0 0 0 #000, 0 2px 0 0 #000',
                        marginBottom: '2px',
                    }}
                >
                    ▶
                </Link>
            ) : (
                <div
                    className="flex h-7 min-w-[30px] cursor-not-allowed items-center justify-center bg-[#180a04] px-2 font-kemco text-[10px] text-white/25 opacity-40 sm:h-9 sm:min-w-[38px] sm:px-3 sm:text-xs"
                    style={{
                        boxShadow:
                            '0 -2px 0 0 #000, 0 2px 0 0 #000, -2px 0 0 0 #000, 2px 0 0 0 #000',
                        marginBottom: '2px',
                    }}
                >
                    ▶
                </div>
            )}
        </div>
    );
}

function CategoryTab({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`relative cursor-pointer px-5 py-2 font-kemco text-xs tracking-widest uppercase transition-transform select-none active:translate-y-[2px] sm:px-8 sm:text-sm ${
                isActive
                    ? 'bg-white text-[#211818]'
                    : 'bg-white/5 text-white/70'
            }`}
            style={
                isActive
                    ? {
                          boxShadow:
                              'inset 0 2px 0 0 rgba(255,255,255,1), inset 0 -2px 0 0 #e5e7eb, 0 -2px 0 0 #000, 0 2px 0 0 #000, -2px 0 0 0 #000, 2px 0 0 0 #000, 0 4px 0 0 #000',
                          marginBottom: '4px',
                      }
                    : {
                          boxShadow:
                              'inset 0 0 0 1px rgba(255,255,255,0.15), 0 -2px 0 0 #000, 0 2px 0 0 #000, -2px 0 0 0 #000, 2px 0 0 0 #000, 0 4px 0 0 #000',
                          marginBottom: '4px',
                      }
            }
        >
            {label}
        </button>
    );
}

export default function NewsIndex({
    categories,
    news,
    currentCategory,
}: Props) {
    const handleTabClick = (value: string) => {
        if (value === 'all') {
            router.get('/news');
        } else {
            router.get('/news', { category: value });
        }
    };

    return (
        <>
            <Head title="Berita — Avenge" />
            <MainLayout>
                <NavbarHome />

                <main className="min-h-screen">
                    <div
                        className="relative min-h-screen w-full pt-24 pb-10 sm:py-20"
                        style={{
                            backgroundImage: `url(${WorldMapBG})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 40%',
                            imageRendering: 'pixelated',
                        }}
                    >
                        <div className="pointer-events-none absolute inset-0 mix-blend-multiply" />

                        <div className="relative z-10 px-3 sm:px-6">
                            {/* Horizontal scrollable category tabs on mobile */}
                            <div className="scrollbar-none mb-5 flex touch-pan-x flex-row items-center justify-start gap-1.5 overflow-x-auto pb-2 sm:justify-center lg:hidden">
                                <SideBinderTab
                                    label="TERBARU"
                                    isActive={currentCategory === 'all'}
                                    onClick={() => handleTabClick('all')}
                                />
                                {categories.map((cat) => (
                                    <SideBinderTab
                                        key={cat.id}
                                        label={cat.name.toUpperCase()}
                                        isActive={currentCategory === cat.name}
                                        onClick={() => handleTabClick(cat.name)}
                                    />
                                ))}
                            </div>

                            <PixelWoodenBoard
                                categories={categories}
                                currentCategory={currentCategory}
                                onCategoryClick={handleTabClick}
                            >
                                {news.data.length > 0 ? (
                                    <div className="flex w-full flex-col gap-3 sm:gap-6">
                                        {news.data.map((item) => (
                                            <PixelNewsCard
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-4 py-12">
                                        <div
                                            className="text-center font-depixel text-xs text-white/50 sm:text-sm"
                                            style={{
                                                imageRendering: 'pixelated',
                                            }}
                                        >
                                            [ BELUM ADA BERITA ]
                                        </div>
                                    </div>
                                )}
                            </PixelWoodenBoard>

                            <PixelPagination news={news} />
                        </div>
                    </div>
                </main>
                <Footer />
            </MainLayout>
        </>
    );
}
