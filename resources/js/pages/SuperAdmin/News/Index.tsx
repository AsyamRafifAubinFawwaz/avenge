import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Eye } from 'lucide-react';
import { toast } from 'sonner';
import {
    index,
    create,
    edit,
    destroy,
    show
} from '@/actions/App/Http/Controllers/SuperAdmin/NewsController';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type News = {
    id: number;
    title: string;
    slug: string;
    image: string;
    description: string;
    category_id: number;
    category: {
        id: number;
        name: string;
    };
    created_at: string;
};

type Category = {
    id: number;
    name: string;
};

type Props = {
    news: {
        data: News[];
        current_page: number;
        last_page: number;
        total: number;
    };
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
    };
};

export default function NewsIndex({ news, categories, filters }: Props) {
    const [deleteTarget, setDeleteTarget] = useState<News | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [search, setSearch] = useState(filters.search ?? '');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.get(index.url(), { search }, { preserveState: true });
    }

    function handleCategoryFilter(categoryName: string) {
        router.get(index.url(), { ...filters, category: categoryName || undefined }, { preserveState: true });
    }

    function handleDelete() {
        if (!deleteTarget) return;
        setDeleting(true);
        router.delete(destroy.url(deleteTarget.id), {
            onSuccess: () => {
                toast.success(`Berita "${deleteTarget.title}" berhasil dihapus`);
                setDeleteTarget(null);
            },
            onError: () => toast.error('Gagal menghapus berita'),
            onFinish: () => setDeleting(false),
        });
    }

    return (
        <>
            <Head title="Berita" />

            {/* AlertDialog Delete */}
            <AlertDialog open={!!deleteTarget} onOpenChange={open => { if (!open) setDeleteTarget(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Berita?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Kamu yakin ingin menghapus{' '}
                            <span className="font-semibold text-foreground">"{deleteTarget?.title}"</span>?
                            Aksi ini tidak bisa dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                            {deleting ? 'Menghapus...' : 'Ya, Hapus'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="dashboard-admin-page flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="dashboard-section-header flex items-center justify-between gap-4">
                    <div>
                        <h1 className="font-kemco text-base leading-tight tracking-normal text-white">Berita</h1>
                        <p className="mt-1 font-sans text-xs font-normal normal-case tracking-normal text-white/65">
                            Total {news.total} berita
                        </p>
                    </div>
                    <Button asChild className="pixel-button pixel-button--default shrink-0">
                        <Link href={create.url()}>
                            <Plus className="size-4" />
                            Tambah Berita
                        </Link>
                    </Button>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap gap-3">
                    <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[200px]">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-amber-400/70" />
                            <Input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Cari judul berita..."
                                className="pl-9"
                            />
                        </div>
                        <Button type="submit" className="pixel-button pixel-button--gold">Cari</Button>
                    </form>
                    <select
                        value={filters.category ?? ''}
                        onChange={e => handleCategoryFilter(e.target.value)}
                        className="px-3 py-2 text-sm outline-none focus-visible:border-amber-400 focus-visible:ring-amber-400/50 focus-visible:ring-[3px]"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Tabel */}
                <div className="dashboard-content flex-1 overflow-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-amber-400/80 w-12">#</th>
                                <th className="px-4 py-3 text-left font-medium text-amber-400/80 w-16">Gambar</th>
                                <th className="px-4 py-3 text-left font-medium text-amber-400/80">Judul</th>
                                <th className="px-4 py-3 text-left font-medium text-amber-400/80">Kategori</th>
                                <th className="px-4 py-3 text-right font-medium text-amber-400/80 w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {news.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-white/50">
                                        Belum ada berita
                                    </td>
                                </tr>
                            ) : (
                                news.data.map((item, i) => (
                                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 text-white/50">
                                            {(news.current_page - 1) * 10 + i + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.image ? (
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt={item.title}
                                                    className="w-12 h-10 object-cover rounded-md"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-12 items-center justify-center bg-white/10 text-xs text-white/45">
                                                    N/A
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium line-clamp-1">{item.title}</p>
                                            <p className="font-mono text-xs text-white/45">{item.slug}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center bg-amber-400/15 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                                                {item.category?.name ?? '-'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={show.url(item.id)}
                                                    className="p-1.5 text-white/55 transition-colors hover:text-amber-400"
                                                    title="Lihat"
                                                >
                                                    <Eye className="size-3.5" />
                                                </Link>
                                                <Link
                                                    href={edit.url(item.id)}
                                                    className="p-1.5 text-white/55 transition-colors hover:text-amber-400"
                                                    title="Edit"
                                                >
                                                    <Pencil className="size-3.5" />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteTarget(item)}
                                                    className="p-1.5 text-white/55 transition-colors hover:text-red-400"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {news.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: news.last_page }, (_, i) => i + 1).map(page => (
                            <Link
                                key={page}
                                href={index.url({ query: { ...filters, page } })}
                                className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors
                                    ${news.current_page === page
                                        ? 'bg-[#790221] text-white'
                                        : 'text-white/60 hover:text-amber-400'
                                    }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

NewsIndex.layout = () => ({
    breadcrumbs: [
        { title: 'Berita', href: index.url() },
    ],
});