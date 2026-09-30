import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Pencil, Tag } from 'lucide-react';
import { index, edit } from '@/actions/App/Http/Controllers/SuperAdmin/NewsController';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

export default function NewsShow({ news }: Props) {
    const readTime = Math.max(1, Math.ceil(news.description.split(/\s+/).length / 200));

    return (
        <>
            <Head title={news.title} />

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 p-4 text-[#211818] sm:p-6">

                {/* Back */}
                <Button variant="ghost" size="sm" asChild className="btn-pixelated w-fit rounded-none! border-0! px-4 text-white shadow-none">
                    <Link href={index.url()}>
                        <ArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>

                {/* Card utama */}
                <article className="overflow-hidden border-4 border-[#211818] bg-[#f7f1df] shadow-[6px_6px_0_#211818]">

                    {/* Gambar kecil */}
                    {news.image && (
                        <img
                            src={`/storage/${news.image}`}
                            alt={news.title}
                            className="max-h-[420px] w-full border-b-4 border-[#211818] object-cover"
                        />
                    )}

                    <div className="flex flex-col gap-5 p-5 sm:p-8">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 font-depixel text-xs text-[#514435]">
                            <Badge variant="secondary" className="gap-1 rounded-none border-2 border-[#211818] bg-[#FBA819] px-2 py-1 font-depixel text-xs text-[#211818]">
                                <Tag className="size-3.5" />
                                {news.category.name}
                            </Badge>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                {new Date(news.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                            </span>
                            <span>•</span>
                            <span>{readTime} menit baca</span>
                        </div>

                        {/* Judul */}
                        <h1 className="font-kemco text-xl leading-relaxed text-[#211818] sm:text-2xl">{news.title}</h1>

                        <Separator className="bg-[#8C1C2A]/30" />

                        {/* Deskripsi */}
                        <p className="whitespace-pre-wrap font-depixel text-sm leading-8 text-[#3f3428]">
                            {news.description}
                        </p>

                        <Separator className="bg-[#8C1C2A]/30" />

                        {/* Actions */}
                        <div className="flex justify-end">
                            <Button asChild size="sm" className="btn-pixelated rounded-none! border-0! px-5 text-white shadow-none">
                                <Link href={edit.url(news.id)}>
                                    <Pencil className="size-4" />
                                    Edit Berita
                                </Link>
                            </Button>
                        </div>
                    </div>
                </article>
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
