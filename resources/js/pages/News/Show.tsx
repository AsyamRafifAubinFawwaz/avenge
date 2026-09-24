import { Head, Link } from '@inertiajs/react';
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
    category?: Category;
    created_at: string;
};

type Props = {
    news: NewsItem;
    related: NewsItem[];
    categories: Category[];
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function stripHtml(html: string) {
    return html.replace(/<[^>]+>/g, '');
}

function QuestPaperContainer({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="relative flex flex-col w-full"
            style={{
                filter: 'drop-shadow(4px 6px 0px rgba(0,0,0,0.65))',
            }}
        >
            <div className="absolute -top-2.5 left-6 w-6 h-4 sm:-top-3 sm:left-10 sm:w-8 sm:h-5 bg-[#d4a373]/80 border border-[#1a0a00] rotate-[-5deg] z-30 shadow-[1px_1px_0_#000]" />
            <div className="absolute -top-2.5 right-6 w-6 h-4 sm:-top-3 sm:right-10 sm:w-8 sm:h-5 bg-[#d4a373]/80 border border-[#1a0a00] rotate-[5deg] z-30 shadow-[1px_1px_0_#000]" />

            <div className="absolute inset-0" style={{ backgroundColor: '#cdb896' }} />
            <div className="absolute top-0 inset-x-0 h-[10px] sm:h-[16px] pointer-events-none z-10"
                style={{ backgroundImage: `url(${CardNewsBG})`, backgroundSize: 'auto 96px', backgroundPosition: 'top left', backgroundRepeat: 'repeat-x', imageRendering: 'pixelated' }}
            />
            <div className="absolute bottom-0 inset-x-0 h-[10px] sm:h-[16px] pointer-events-none z-10"
                style={{ backgroundImage: `url(${CardNewsBG})`, backgroundSize: 'auto 96px', backgroundPosition: 'bottom left', backgroundRepeat: 'repeat-x', imageRendering: 'pixelated' }}
            />
            <div className="absolute left-0 inset-y-0 w-[10px] sm:w-[16px] pointer-events-none z-10"
                style={{ backgroundImage: `url(${CardNewsBG})`, backgroundSize: '96px auto', backgroundPosition: 'top left', backgroundRepeat: 'repeat-y', imageRendering: 'pixelated' }}
            />
            <div className="absolute right-0 inset-y-0 w-[10px] sm:w-[16px] pointer-events-none z-10"
                style={{ backgroundImage: `url(${CardNewsBG})`, backgroundSize: '96px auto', backgroundPosition: 'top right', backgroundRepeat: 'repeat-y', imageRendering: 'pixelated' }}
            />

            <div className="relative z-20 p-3.5 sm:p-8 lg:p-10 flex flex-col gap-4 sm:gap-6">
                {children}
            </div>
        </div>
    );
}

export default function NewsShow({ news, related, categories }: Props) {
    return (
        <>
            <Head title={`${news.title} — Avenge`} />
            <MainLayout>
                <NavbarHome />

                <main className="min-h-screen pt-16 pb-12 sm:pt-24 sm:pb-20 bg-[#5c121c]">
                    <div className="max-w-7xl mx-auto px-3 sm:px-6">
                        
                        <QuestPaperContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                                <div className="lg:col-span-8 flex flex-col gap-3.5 sm:gap-5 lg:pr-6 lg:border-r-2 lg:border-[#5a3a00]/20">
                                    
                                    <div 
                                        className="relative w-full overflow-hidden border-[3px] sm:border-[4px] border-[#5a3a00] bg-[#5a3a00]"
                                        style={{
                                            boxShadow: '3px 3px 0px rgba(0,0,0,0.45)',
                                        }}
                                    >
                                        {news.image ? (
                                            <img
                                                src={`/storage/${news.image}`}
                                                alt={news.title}
                                                className="w-full h-auto object-cover max-h-[200px] sm:max-h-[380px]"
                                                style={{ imageRendering: 'pixelated' }}
                                            />
                                        ) : (
                                            <div className="w-full h-36 sm:h-48 flex items-center justify-center bg-[#5a3a00]/40">
                                                <span className="font-depixel text-white/50 text-xs sm:text-sm">[ NO IMAGE ]</span>
                                            </div>
                                        )}
                                        <div
                                            className="pointer-events-none absolute inset-0"
                                            style={{ boxShadow: 'inset 3px 3px 5px rgba(0,0,0,0.45), inset -2px -2px 4px rgba(0,0,0,0.2)' }}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 sm:gap-3 pt-1">
                                        <Link href="/news" className="font-depixel text-[10px] sm:text-xs text-[#2b1406]/70 hover:text-[#8C1C2A] transition-colors font-bold">
                                            BERITA
                                        </Link>
                                        <span className="font-depixel text-[10px] sm:text-xs text-[#2b1406]/40">&gt;</span>
                                        {news.category && (
                                            <Link 
                                                href={`/news?category=${news.category.name}`}
                                                className="font-depixel text-[9px] sm:text-[10px] text-white bg-[#8C1C2A] px-2 py-0.5 sm:px-3 sm:py-1 uppercase font-bold hover:bg-[#68121d] transition-colors"
                                                style={{ boxShadow: '1.5px 1.5px 0 #000' }}
                                            >
                                                {news.category.name}
                                            </Link>
                                        )}
                                    </div>

                                    <h1 className="font-kemco text-lg sm:text-3xl lg:text-4xl text-[#1a0a00] font-bold leading-tight">
                                        {news.title}
                                    </h1>

                                    <div className="flex items-center gap-3 font-depixel text-[10px] sm:text-xs text-[#2b1406]/60 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#2b1406]/10 px-2.5 py-1 border border-[#2b1406]/20">
                                            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#8C1C2A]" style={{ boxShadow: '1px 1px 0 #000' }} />
                                            {formatDate(news.created_at)}
                                        </div>
                                    </div>

                                    <div className="w-full h-[2px] bg-[#5a3a00]/30 my-0.5" />

                                    <div className="pb-4">
                                        <div 
                                            className="font-depixel text-[#1a0a00]/90 text-xs sm:text-base leading-relaxed prose prose-stone max-w-none"
                                            dangerouslySetInnerHTML={{ __html: news.description }}
                                        />
                                    </div>

                                </div>

                                <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
                                    
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                                            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#8C1C2A]" style={{ boxShadow: '1px 1px 0 #000' }} />
                                            <h3 className="font-kemco text-sm sm:text-lg text-[#1a0a00] font-bold">
                                                ARTIKEL LAINNYA
                                            </h3>
                                        </div>
                                        
                                        <div className="flex flex-col gap-2.5 sm:gap-3">
                                            {related.length > 0 ? (
                                                related.map(item => (
                                                    <RelatedCard key={item.id} item={item} />
                                                ))
                                            ) : (
                                                <div className="bg-[#5a3a00]/10 p-3 text-center border border-[#5a3a00]/20">
                                                    <p className="font-depixel text-[10px] sm:text-xs text-[#1a0a00]/50 uppercase">Belum ada artikel terkait.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                                            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#8C1C2A]" style={{ boxShadow: '1px 1px 0 #000' }} />
                                            <h3 className="font-kemco text-sm sm:text-lg text-[#1a0a00] font-bold">
                                                KATEGORI
                                            </h3>
                                        </div>
                                        
                                        <div className="flex flex-col gap-2">
                                            {categories.map(cat => (
                                                <Link 
                                                    key={cat.id} 
                                                    href={`/news?category=${cat.name}`}
                                                    className="group bg-[#5a3a00]/10 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between hover:bg-[#8C1C2A] hover:text-white transition-all border border-[#5a3a00]/20"
                                                    style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}
                                                >
                                                    <span className="font-depixel text-[10px] sm:text-xs text-[#1a0a00]/80 group-hover:text-white font-bold transition-colors">
                                                        {cat.name}
                                                    </span>
                                                    <span className="font-depixel text-[9px] sm:text-[10px] text-[#1a0a00]/40 group-hover:text-white">&gt;</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </QuestPaperContainer>

                    </div>
                </main>
                <Footer />
            </MainLayout>
        </>
    );
}

function RelatedCard({ item }: { item: NewsItem }) {
    return (
        <Link
            href={`/news/${item.slug}`}
            className="group block cursor-pointer select-none w-full"
        >
            <div
                className="relative flex flex-row w-full bg-[#5a3a00]/10 border-2 border-[#5a3a00]/30 p-2 sm:p-2.5 gap-2.5 sm:gap-3 transition-transform duration-100 group-hover:-translate-y-0.5 group-hover:bg-[#5a3a00]/20"
                style={{
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                }}
            >
                <div
                    className="relative w-16 h-14 sm:w-20 sm:h-16 shrink-0 border-2 border-[#5a3a00] bg-[#5a3a00] overflow-hidden"
                    style={{ boxShadow: '1px 1px 0px rgba(0,0,0,0.3)' }}
                >
                    {item.image ? (
                        <img
                            src={`/storage/${item.image}`}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ imageRendering: 'pixelated' }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#5a3a00]/30">
                            <span className="font-depixel text-[#5a3a00]/60 text-[7px] sm:text-[8px]">[ NO IMG ]</span>
                        </div>
                    )}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.45)' }}
                    />
                </div>

                {/* Teks di Kanan */}
                <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
                    <h4 className="font-kemco text-[#1a0a00] text-[10px] sm:text-xs leading-tight font-bold line-clamp-2 group-hover:text-[#8C1C2A] transition-colors">
                        {item.title}
                    </h4>
                    
                    <div className="mt-auto flex items-center justify-between pt-1">
                        {item.category && (
                            <span className="font-depixel font-bold text-[#8C1C2A] text-[7px] sm:text-[8px] uppercase tracking-wider truncate mr-1">
                                {item.category.name}
                            </span>
                        )}
                        <span className="font-depixel text-[#1a0a00]/60 text-[7px] sm:text-[8px] shrink-0">
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: '2-digit',
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
