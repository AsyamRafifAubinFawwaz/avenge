import { Head, Link } from '@inertiajs/react';
import { NavbarHome } from '@/components/avenge/navbar';
import MainLayout from '@/layouts/MainLayouts';

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
                                            className="font-depixel text-[10px] text-white bg-amber-500 px-3 py-1 uppercase"
                                            style={{ boxShadow: '2px 2px 0 #000' }}
                                        >
                                            {news.category.name}
                                        </Link>
                                    )}
                                </div>

                                <h1 className="font-kemco text-3xl sm:text-4xl lg:text-5xl text-white leading-tight drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                                    {news.title}
                                </h1>

                                <div className="flex items-center gap-4 text-white/60 font-depixel text-[10px] uppercase">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 bg-amber-500" style={{ boxShadow: '1px 1px 0 #000' }} />
                                        {formatDate(news.created_at)}
                                    </div>
                                </div>

                                {/* Gambar Utama */}
                                <div 
                                    className="relative w-full overflow-hidden mt-2 mb-4"
                                    style={{
                                        boxShadow: '4px 4px 0 0 #000',
                                        border: '4px solid #000'
                                    }}
                                >
                                    {news.image ? (
                                        <img
                                            src={`/storage/${news.image}`}
                                            alt={news.title}
                                            className="w-full h-auto object-contain max-h-[500px]"
                                            style={{ imageRendering: 'pixelated' }}
                                        />
                                    ) : (
                                        <div className="w-full h-64 flex items-center justify-center bg-[#600010]">
                                            <span className="font-depixel text-white/20 text-2xl">[ NO IMG ]</span>
                                        </div>
                                    )}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-10"
                                        style={{
                                            background: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
                                        }}
                                    />
                                </div>

                                <div 
                                    className="font-sans text-white/90 text-base sm:text-lg leading-relaxed prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: news.description }}
                                />
                                
                                <div className="w-full h-[2px] bg-white/10 mt-10" />

                                <div className="block lg:hidden mt-10">
                                    <h3 className="font-kemco text-xl text-white mb-6 drop-shadow-[2px_2px_0_#000]">ARTIKEL LAINNYA</h3>
                                    <div className="flex flex-col gap-4">
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
                                            <p className="font-depixel text-[10px] text-white/40 uppercase">Belum ada artikel terkait.</p>
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
                                    
                                    <div className="flex flex-col border-t-2 border-white/10">
                                        {categories.map(cat => (
                                            <Link 
                                                key={cat.id} 
                                                href={`/news?category=${cat.name}`}
                                                className="group py-3 border-b-2 border-white/10 flex items-center justify-between"
                                            >
                                                <span className="font-depixel text-xs text-white/70 group-hover:text-amber-400 transition-colors">
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
        <Link href={`/news/${item.slug}`} className="group flex gap-4 bg-[#600010] p-2 hover:bg-[#7a0015] transition-colors border-2 border-amber-500 hover:border-black" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
            <div className="w-24 h-24 shrink-0 bg-[#A90C1F] overflow-hidden relative" style={{ boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.4)' }}>
                {item.image ? (
                    <img 
                        src={`/storage/${item.image}`} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                        style={{ imageRendering: 'pixelated' }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="font-depixel text-[8px] text-white/30">NO IMG</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-between py-1">
                <h4 className="font-depixel text-[10px] text-white leading-relaxed line-clamp-3 group-hover:text-amber-400 transition-colors">
                    {item.title}
                </h4>
                <p className="font-depixel text-[8px] text-white/40 mt-2">
                    {formatDate(item.created_at)}
                </p>
            </div>
        </Link>
    );
}
