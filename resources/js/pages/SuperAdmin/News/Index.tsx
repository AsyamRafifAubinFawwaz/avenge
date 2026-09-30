import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Eye } from 'lucide-react';
import { toast } from 'sonner';
import {
    index,
    create,
    edit,
    destroy,
    show,
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
        router.get(
            index.url(),
            { ...filters, category: categoryName || undefined },
            { preserveState: true },
        );
    }

    function handleDelete() {
        if (!deleteTarget) return;
        setDeleting(true);
        router.delete(destroy.url(deleteTarget.id), {
            onSuccess: () => {
                toast.success(
                    `Berita "${deleteTarget.title}" berhasil dihapus`,
                );
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
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => {
                    if (!open) setDeleteTarget(null);
                }}
            >
                <AlertDialogContent className="max-w-md overflow-hidden rounded-none border-4 border-[#211818] bg-[#f7f1df] p-0 text-[#211818] shadow-[6px_6px_0_#211818]">
                    <AlertDialogHeader className="border-b-2 border-[#8C1C2A]/25 bg-[#e8dcc3] px-6 py-5">
                        <AlertDialogTitle className="font-kemco text-lg tracking-normal text-[#8C1C2A]">HAPUS BERITA?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="px-6 py-6 font-depixel text-xs leading-relaxed text-[#514435]">
                        Kamu yakin ingin menghapus berita{' '}
                        <span className="bg-[#FBA819] px-1 font-bold text-[#211818]">"{deleteTarget?.title}"</span>?
                        <br /><br />
                        <span className="text-[#8C1C2A]">Aksi ini tidak bisa dibatalkan.</span>
                    </div>
                    <AlertDialogFooter className="gap-3 border-t-2 border-[#211818]/15 bg-[#e8dcc3] px-6 py-5 sm:justify-end">
                        <AlertDialogCancel
                            disabled={deleting}
                            className="m-0 rounded-none border-2 border-[#211818] bg-[#675b4d] px-5 py-3 font-depixel text-xs text-white shadow-[3px_3px_0_#211818] hover:bg-[#514435] hover:text-white"
                        >
                            BATAL
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="m-0 rounded-none border-2 border-[#211818] bg-[#8C1C2A] px-5 py-3 font-depixel text-xs text-white shadow-[3px_3px_0_#211818] hover:bg-[#6f1420]"
                        >
                            {deleting ? 'MENGHAPUS...' : 'YA, HAPUS'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="dashboard-admin-page flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="dashboard-section-header flex items-center justify-between gap-4">
                    <div>
                        <h1 className="font-kemco text-lg leading-tight tracking-normal text-[#211818]">Berita</h1>
                        <p className="mt-1 font-sans text-sm font-normal normal-case tracking-normal text-[#514435]">
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
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul berita..."
                                className="w-full border-4 border-black bg-[#8C1C2A] py-3 pr-4 pl-12 font-depixel text-xs text-[#f7f1df] placeholder:text-[#f7f1df]/75 transition-all focus:bg-[#6f1420] focus:outline-none"
                                style={{ boxShadow: '6px 6px 0 0 #000' }}
                            />
                        </div>
                        <Button type="submit" className="pixel-button pixel-button--gold">Cari</Button>
                    </form>
                    <select
                        value={filters.category ?? ''}
                        onChange={e => handleCategoryFilter(e.target.value)}
                        className="rounded-none border-2 border-[#211818] bg-[#f7f1df] px-3 py-2 font-depixel text-xs text-[#211818] outline-none focus-visible:border-[#8C1C2A] focus-visible:ring-2 focus-visible:ring-[#8C1C2A]/30"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tabel */}
                <div className="dashboard-content flex-1 overflow-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-black border-b-4 border-black">
                            <tr>
                                <th className="w-12 px-4 py-3 text-left font-kemco text-sm font-bold text-[#FBA819]">#</th>
                                <th className="w-16 px-4 py-3 text-left font-kemco text-sm font-bold text-[#FBA819]">Gambar</th>
                                <th className="px-4 py-3 text-left font-kemco text-sm font-bold text-[#FBA819]">Judul</th>
                                <th className="px-4 py-3 text-left font-kemco text-sm font-bold text-[#FBA819]">Kategori</th>
                                <th className="w-24 px-4 py-3 text-right font-kemco text-sm font-bold text-[#FBA819]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-4 divide-black">
                            {news.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center font-depixel text-sm text-[#514435]">
                                        Belum ada berita
                                    </td>
                                </tr>
                            ) : (
                                news.data.map((item, i) => (
                                    <tr key={item.id} className="transition-colors hover:bg-[#8C1C2A]/5">
                                        <td className="px-4 py-3 font-depixel text-sm font-semibold text-[#514435]">
                                            {(news.current_page - 1) * 10 + i + 1}
                                        </td>
                                        <td className="px-5 py-4">
                                            {item.image ? (
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt={item.title}
                                                    className="h-12 w-14 object-cover border-4 border-black"
                                                    style={{ imageRendering: 'pixelated', boxShadow: '2px 2px 0 0 rgba(0,0,0,0.5)' }}
                                                />
                                            ) : (
                                                <div className="flex h-10 w-12 items-center justify-center border-2 border-[#211818] bg-[#e8dcc3] font-depixel text-xs text-[#514435]">
                                                    N/A
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="line-clamp-1 font-depixel text-sm font-semibold text-[#211818]">{item.title}</p>
                                            <p className="mt-1 font-depixel text-xs text-[#514435]">{item.slug}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center border border-[#211818] bg-[#8C1C2A] px-2.5 py-1 font-depixel text-xs font-medium text-[#f7f1df]">
                                                {item.category?.name ?? '-'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={show.url(item.id)}
                                                    className="p-2 text-[#514435] transition-colors hover:text-[#8C1C2A]"
                                                    title="Lihat"
                                                >
                                                    <Eye className="size-4" />
                                                </Link>
                                                <Link
                                                    href={edit.url(item.id)}
                                                    className="p-2 text-[#514435] transition-colors hover:text-[#8C1C2A]"
                                                    title="Edit"
                                                >
                                                    <Pencil className="size-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteTarget(item)}
                                                    className="p-2 text-[#514435] transition-colors hover:text-[#8C1C2A]"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="size-4" />
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
                    <div className="flex items-center justify-center gap-3 mt-4">
                        {Array.from(
                            { length: news.last_page },
                            (_, i) => i + 1,
                        ).map((page) => (
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
    breadcrumbs: [{ title: 'Berita', href: index.url() }],
});
