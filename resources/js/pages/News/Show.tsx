import { Head, Link } from '@inertiajs/react';
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

export default function NewsShow({ news, related, categories }: Props) {
    return (
        <>
            <Head title={`${news.title} — Avenge`} />
            <MainLayout>
                <NavbarHome />

                <main className="min-h-screen pt-24 pb-20">
                    
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            
                            <div className="lg:col-span-8 flex flex-col gap-6">
                                
                                <div className="flex items-center gap-3">
                                    <Link href="/news" className="font-depixel text-xs text-white/50 hover:text-white transition-colors">
                                        BERITA
                                    </Link>
                                    <span className="font-depixel text-xs text-white/30">&gt;</span>
                                    {news.category && (
                                        <Link 
                                            href={`/news?category=${news.category.name}`}
                                            className="font-depixel text-[10px] text-black bg-amber-500 px-3 py-1 uppercase hover:bg-amber-400 transition-colors"
                                            style={{ boxShadow: '2px 2px 0 #000' }}
                                        >
                                            {news.category.name}
                                        </Link>
                                    )}
                                </div>

                                <h1 className="font-kemco text-3xl sm:text-4xl lg:text-5xl text-white leading-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                    {news.title}
                                </h1>

                                <div className="flex items-center gap-4 text-white/60 font-depixel text-[10px] uppercase">
                                    <div className="flex items-center gap-2 bg-[#600010] px-3 py-1.5" style={{ boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.5)' }}>
                                        <span className="w-2.5 h-2.5 bg-amber-500" style={{ boxShadow: '1px 1px 0 #000' }} />
                                        {formatDate(news.created_at)}
                                    </div>
                                </div>

                                {/* Gambar Utama */}
                                <div 
                                    className="relative w-full overflow-hidden mt-4 mb-6 bg-[#1a0509] border-4 border-[#1a0509]"
                                    style={{
                                        boxShadow: '4px 4px 0 0 #000',
                                    }}
                                >
                                    {news.image ? (
                                        <img
                                            src={`/storage/${news.image}`}
                                            alt={news.title}
                                            className="w-full h-auto object-cover max-h-[500px]"
                                            style={{ imageRendering: 'pixelated' }}
                                        />
                                    ) : (
                                        <div className="w-full h-64 flex items-center justify-center bg-[#A90C1F]">
                                            <span className="font-depixel text-white/40 text-2xl drop-shadow-[2px_2px_0_#000]">[ NO IMG ]</span>
                                        </div>
                                    )}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-10"
                                        style={{
                                            background: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
                                        }}
                                    />
                                </div>

                                <div className="pt-2 pb-6">
                                    <div 
                                        className="font-sans text-white/90 text-base sm:text-lg leading-relaxed prose prose-invert prose-amber max-w-none"
                                        dangerouslySetInnerHTML={{ __html: news.description }}
                                    />
                                </div>
                                
                                <div className="w-full h-[2px] bg-black/40 mt-10" style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.1)' }} />

                                <div className="block lg:hidden mt-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-4 h-4 bg-amber-500" style={{ boxShadow: '2px 2px 0 #000' }} />
                                        <h3 className="font-kemco text-xl text-white drop-shadow-[2px_2px_0_#000]">ARTIKEL LAINNYA</h3>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        {related.map(item => (
                                            <RelatedCard key={item.id} item={item} />
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className="lg:col-span-4 hidden lg:flex flex-col gap-12">
                                
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-4 h-4 bg-amber-500" style={{ boxShadow: '2px 2px 0 #000' }} />
                                        <h3 className="font-kemco text-xl text-white drop-shadow-[2px_2px_0_#000]">
                                            ARTIKEL LAINNYA
                                        </h3>
                                    </div>
                                    
                                    <div className="flex flex-col gap-5">
                                        {related.length > 0 ? (
                                            related.map(item => (
                                                <RelatedCard key={item.id} item={item} />
                                            ))
                                        ) : (
                                            <div className="bg-[#600010] p-4 text-center" style={{ boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.5)' }}>
                                                <p className="font-depixel text-[10px] text-white/40 uppercase">Belum ada artikel terkait.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-4 h-4 bg-[#A90C1F]" style={{ boxShadow: '2px 2px 0 #000' }} />
                                        <h3 className="font-kemco text-xl text-white drop-shadow-[2px_2px_0_#000]">
                                            KATEGORI
                                        </h3>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        {categories.map(cat => (
                                            <Link 
                                                key={cat.id} 
                                                href={`/news?category=${cat.name}`}
                                                className="group bg-[#600010] px-4 py-3 flex items-center justify-between hover:bg-[#7a0015] transition-all"
                                                style={{ boxShadow: '2px 2px 0 #000, inset 1px 1px 0 rgba(255,255,255,0.1)' }}
                                            >
                                                <span className="font-depixel text-xs text-white/80 group-hover:text-amber-400 transition-colors">
                                                    {cat.name}
                                                </span>
                                                <span className="font-depixel text-[10px] text-white/20 group-hover:text-amber-400">&gt;</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </main>
            </MainLayout>
        </>
    );
}

function RelatedCard({ item }: { item: NewsItem }) {
    return (
        <Link
            href={`/news/${item.slug}`}
            className="group block cursor-pointer select-none mb-2"
        >
            <div
                className="relative transition-transform duration-100 group-hover:-translate-y-1 group-active:translate-y-[1px] bg-[#998568] border-4 border-[#998568]"
                style={{ 
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.65)',
                }}
            >
                {/* Efek lipatan/kertas via shadow */}
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        boxShadow: 'inset 4px 4px 6px rgba(0,0,0,0.4), inset -3px -3px 5px rgba(0,0,0,0.2)',
                    }}
                />

                <div className="relative z-20 flex flex-row h-24 p-2 gap-3">
                    {/* Gambar di Kiri */}
                    <div 
                        className="relative w-24 h-full flex-shrink-0 border-2 border-[#5a3a00]/40 overflow-hidden"
                        style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}
                    >
                        {item.image ? (
                            <img
                                src={`/storage/${item.image}`}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#5a3a00]/20">
                                <span className="font-depixel text-[#5a3a00]/60 text-[8px]">[ IMG ]</span>
                            </div>
                        )}
                    </div>

                    {/* Teks di Kanan */}
                    <div className="flex flex-col flex-1 min-w-0 pt-1 pb-1">
                        <p className="font-kemco text-[#030200]/90 text-xs sm:text-sm leading-tight uppercase font-bold line-clamp-2 mb-1 group-hover:text-[#600010] transition-colors">
                            {item.title}
                        </p>
                        
                        <div className="mt-auto flex items-center justify-between">
                            <p className="font-depixel font-bold text-[#030200]/60 text-[8px] uppercase truncate mr-2">
                                {item.category?.name}
                            </p>
                            <p className="font-depixel text-[#030200]/50 text-[8px] shrink-0">
                                {new Date(item.created_at).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: '2-digit',
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
