import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';
import { index, edit } from '@/actions/App/Http/Controllers/SuperAdmin/NewsController';
import CardNewsBG from '../../../../assets/CardNewsBG.png';

type News = {
    id: number;
    title: string;
    slug: string;
    image: string;
    description: string;
    category_id: number;
    category: { id: number; name: string };
    created_at: string;
};

type Props = { news: News };

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
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

            <div className="relative z-20 p-5 sm:p-10 flex flex-col gap-4 sm:gap-6">
                {children}
            </div>
        </div>
    );
}

export default function NewsShow({ news }: Props) {
    return (
        <>
            <Head title={news.title} />

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-6">
                
                {/* Back button */}
                <div>
                    <Link
                        href={index.url()}
                        className="pixel-btn-dark inline-flex items-center gap-1.5"
                    >
                        <ArrowLeft className="size-3" />
                        Kembali
                    </Link>
                </div>

                <QuestPaperContainer>
                    <div className="flex flex-col gap-5">
                        
                        {/* Gambar */}
                        <div className="relative w-full overflow-hidden border-4 border-[#211818] shadow-[4px_4px_0px_rgba(33,24,24,0.5)] bg-[#211818]">
                            {news.image ? (
                                <img
                                    src={`/storage/${news.image}`}
                                    alt={news.title}
                                    className="w-full h-auto object-cover max-h-[300px]"
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            ) : (
                                <div className="w-full h-48 flex items-center justify-center bg-[#211818]/80">
                                    <span className="font-depixel text-[#F8F9FA]/60 text-sm">[ NO IMAGE ]</span>
                                </div>
                            )}
                            <div
                                className="pointer-events-none absolute inset-0"
                                style={{ boxShadow: 'inset 3px 3px 5px rgba(0,0,0,0.45), inset -2px -2px 4px rgba(0,0,0,0.2)' }}
                            />
                        </div>

                        {/* Breadcrumb / Kategori */}
                        <div className="flex items-center gap-2 sm:gap-3 pt-2">
                            <span className="font-depixel text-[10px] sm:text-xs text-[#211818] font-bold uppercase">
                                BERITA
                            </span>
                            <span className="font-depixel text-[10px] sm:text-xs text-[#211818]">&gt;</span>
                            {news.category && (
                                <span className="font-depixel bg-[#8C1C2A] text-[#F8F9FA] px-3 py-1 text-xs font-bold border-2 border-[#211818] shadow-[2px_2px_0px_#211818] uppercase">
                                    {news.category.name}
                                </span>
                            )}
                        </div>

                        {/* Judul */}
                        <h1 className="font-kemco text-2xl sm:text-3xl text-[#211818] font-bold leading-tight">
                            {news.title}
                        </h1>

                        {/* Tanggal */}
                        <div className="flex items-center gap-3 font-depixel text-[10px] sm:text-xs text-[#211818] uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 sm:gap-2 bg-[#211818]/10 px-2.5 py-1 border border-[#211818]/30">
                                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#8C1C2A] border border-[#211818]" />
                                <span className="text-[#211818] font-bold">{formatDate(news.created_at)}</span>
                            </div>
                        </div>

                        {/* Garis Pembatas Horizontal */}
                        <div className="w-full border-b-2 border-dashed border-[#8c7b60] my-2" />

                        {/* Deskripsi */}
                        <div className="pb-4">
                            <div 
                                className="font-depixel text-[#211818] text-xs sm:text-sm leading-relaxed prose prose-stone max-w-none"
                                dangerouslySetInnerHTML={{ __html: news.description }}
                            />
                        </div>

                        {/* Garis Pembatas Horizontal */}
                        <div className="w-full border-b-2 border-dashed border-[#8c7b60] mb-2" />

                        {/* Edit Button */}
                        <div className="flex justify-end pt-2">
                            <Link
                                href={edit.url(news.id)}
                                className="bg-[#8C1C2A] text-[#F8F9FA] font-bold px-6 py-2 border-t-2 border-l-2 border-[#d4374a] border-b-4 border-r-4 border-[#4a0e16] active:border-t-4 active:border-l-4 active:border-[#4a0e16] active:border-b-2 active:border-r-2 active:border-[#d4374a] transition-none flex items-center gap-2 font-kemco text-xs uppercase"
                            >
                                <Pencil className="size-3.5 text-[#F8F9FA]" />
                                Edit Berita
                            </Link>
                        </div>
                    </div>
                </QuestPaperContainer>
            </div>
        </>
    );
}

NewsShow.layout = () => ({
    breadcrumbs: [
        { title: 'Berita', href: index.url() },
        { title: 'Detail', href: '#' },
    ],
});

