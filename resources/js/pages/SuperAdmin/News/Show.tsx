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

            <div className="p-6 max-w-3xl flex flex-col gap-4">

                {/* Back */}
                <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
                    <Link href={index.url()}>
                        <ArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>

                {/* Card utama */}
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card overflow-hidden">

                    {/* Gambar kecil */}
                    {news.image && (
                        <img
                            src={`/storage/${news.image}`}
                            alt={news.title}
                            className="w-full h-52 object-cover"
                        />
                    )}

                    <div className="p-6 flex flex-col gap-4">
                        {/* Meta */}
                        <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                            <Badge variant="secondary" className="gap-1">
                                <Tag className="size-3" />
                                {news.category.name}
                            </Badge>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Calendar className="size-3.5" />
                                {new Date(news.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                            </span>
                            <span>•</span>
                            <span>{readTime} menit baca</span>
                        </div>

                        {/* Judul */}
                        <h1 className="text-2xl font-bold leading-snug">{news.title}</h1>

                        <Separator />

                        {/* Deskripsi */}
                        <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                            {news.description}
                        </p>

                        <Separator />

                        {/* Actions */}
                        <div className="flex justify-end">
                            <Button asChild size="sm">
                                <Link href={edit.url(news.id)}>
                                    <Pencil className="size-4" />
                                    Edit Berita
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
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
