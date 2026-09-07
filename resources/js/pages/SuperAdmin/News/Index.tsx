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

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Berita</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Total {news.total} berita
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create.url()}>
                            <Plus className="size-4" />
                            Tambah Berita
                        </Link>
                    </Button>
                </div>

                {/* Filter */}
                <div className="flex gap-3 flex-wrap">
                    <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[200px]">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Cari judul berita..."
                                className="pl-9"
                            />
                        </div>
                        <Button type="submit" variant="outline">Cari</Button>
                    </form>
                    <select
                        value={filters.category ?? ''}
                        onChange={e => handleCategoryFilter(e.target.value)}
                        className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Tabel */}
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-12">#</th>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-16">Gambar</th>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Judul</th>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Kategori</th>
                                <th className="text-right px-4 py-3 font-medium text-muted-foreground w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {news.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-muted-foreground">
                                        Belum ada berita
                                    </td>
                                </tr>
                            ) : (
                                news.data.map((item, i) => (
                                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 text-muted-foreground">
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
                                                <div className="w-12 h-10 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                                    N/A
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium line-clamp-1">{item.title}</p>
                                            <p className="text-xs text-muted-foreground font-mono">{item.slug}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                                {item.category?.name ?? '-'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={show.url(item.id)}
                                                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                                    title="Lihat"
                                                >
                                                    <Eye className="size-3.5" />
                                                </Link>
                                                <Link
                                                    href={edit.url(item.id)}
                                                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="size-3.5" />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteTarget(item)}
                                                    className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
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
                                        ? 'bg-primary text-primary-foreground'
                                        : 'border border-input hover:bg-muted'
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