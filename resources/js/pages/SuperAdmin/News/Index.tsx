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
                <AlertDialogContent className="bg-[#A90C1F] border-4 border-black rounded-none shadow-[8px_8px_0_0_#000] p-0 overflow-hidden max-w-md">
                    <AlertDialogHeader className="bg-black px-6 py-5 border-b-4 border-black">
                        <AlertDialogTitle className="font-kemco text-amber-500 text-xl tracking-wider">HAPUS BERITA?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="px-6 py-6 font-depixel text-xs text-amber-400 leading-relaxed">
                        Kamu yakin ingin menghapus berita{' '}
                        <span className="text-black bg-amber-500 px-1 font-bold">"{deleteTarget?.title}"</span>?
                        <br/><br/>
                        <span className="text-amber-400/70">Aksi ini tidak bisa dibatalkan.</span>
                    </div>
                    <AlertDialogFooter className="px-6 py-5 bg-[#81081F] border-t-4 border-black sm:justify-start gap-4">
                        <AlertDialogCancel
                            disabled={deleting}
                            className="font-depixel text-xs bg-black text-amber-400 border-4 border-black rounded-none shadow-[4px_4px_0_0_#000] hover:bg-neutral-800 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all px-6 py-6 m-0"
                        >
                            BATAL
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="font-depixel text-xs bg-amber-500 text-black border-4 border-black rounded-none shadow-[4px_4px_0_0_#000] hover:bg-amber-400 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all px-6 py-6 m-0"
                        >
                            {deleting ? 'MENGHAPUS...' : 'YA, HAPUS'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="flex flex-col gap-8 p-6 bg-[url('https://pics.craiyon.com/2023-06-24/4f9ad32060a14942ac3cc523c917b6ec.webp')] bg-cover bg-center bg-no-repeat">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-kemco text-3xl text-amber-400 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                            BERITA
                        </h1>
                        <p className="font-depixel text-[10px] text-amber-400/80 mt-2 uppercase tracking-wider">
                            Total {news.total} berita
                        </p>
                    </div>
                    <Link
                        href={create.url()}
                        className="flex items-center gap-2 font-depixel text-xs bg-amber-500 text-black px-6 py-3 border-4 border-black transition-all hover:bg-amber-400 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[6px] active:translate-y-[6px]"
                        style={{ boxShadow: '6px 6px 0 0 #000' }}
                    >
                        <Plus className="size-4 stroke-[3]" />
                        TAMBAH BERITA
                    </Link>
                </div>

                <div className="flex flex-wrap gap-4">
                    <form
                        onSubmit={handleSearch}
                        className="flex min-w-[200px] flex-1 gap-3"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-amber-400/60" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul berita..."
                                className="w-full pl-12 pr-4 py-3 bg-[#A90C1F] border-4 border-black text-amber-400 font-depixel text-xs placeholder:text-amber-400/50 focus:outline-none focus:bg-[#81081F] transition-all"
                                style={{ boxShadow: '6px 6px 0 0 #000' }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="font-depixel text-xs text-amber-400 px-6 py-3 border-4 border-black bg-black hover:bg-neutral-800 hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            style={{ boxShadow: '6px 6px 0 0 #000' }}
                        >
                            CARI
                        </button>
                    </form>
                    <select
                        value={filters.category ?? ''}
                        onChange={(e) => handleCategoryFilter(e.target.value)}
                        className="bg-[#A90C1F] text-amber-400 border-4 border-black font-depixel text-xs px-4 py-3 focus:outline-none focus:bg-[#81081F] transition-all"
                        style={{ boxShadow: '6px 6px 0 0 #000' }}
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div
                    className="overflow-hidden border-4 border-black bg-[#81081F]"
                    style={{ boxShadow: '8px 8px 0 0 #000' }}
                >
                    <table className="w-full text-sm">
                        <thead className="bg-black border-b-4 border-black">
                            <tr>
                                <th className="w-12 px-5 py-4 text-left font-depixel text-[11px] uppercase text-amber-500">#</th>
                                <th className="w-16 px-5 py-4 text-left font-depixel text-[11px] uppercase text-amber-500">Gambar</th>
                                <th className="px-5 py-4 text-left font-depixel text-[11px] uppercase text-amber-500">Judul</th>
                                <th className="px-5 py-4 text-left font-depixel text-[11px] uppercase text-amber-500">Kategori</th>
                                <th className="w-24 px-5 py-4 text-right font-depixel text-[11px] uppercase text-amber-500">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-4 divide-black">
                            {news.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-12 text-center font-depixel text-sm text-amber-400/50 uppercase bg-[#A90C1F]"
                                    >
                                        [ Belum ada berita ]
                                    </td>
                                </tr>
                            ) : (
                                news.data.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className="transition-colors hover:bg-[#A90C1F]"
                                    >
                                        <td className="px-5 py-4 font-depixel text-[11px] text-amber-400">
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
                                                <div className="flex h-12 w-14 items-center justify-center bg-black/80 border-4 border-black" style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.5)' }}>
                                                    <span className="font-depixel text-[9px] text-amber-500/50">N/A</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="font-depixel text-sm text-amber-400 line-clamp-1 drop-shadow-[2px_2px_0_#000]">{item.title}</p>
                                            <p className="font-depixel text-[10px] text-amber-400/60 mt-1.5">{item.slug}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span
                                                className="font-depixel text-[10px] text-black bg-amber-500 px-3 py-1.5 uppercase border-2 border-black"
                                                style={{ boxShadow: '2px 2px 0 #000' }}
                                            >
                                                {item.category?.name ?? '-'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={show.url(item.id)}
                                                    className="p-2 bg-black text-amber-500 border-2 border-black hover:bg-amber-500 hover:text-black transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                                                    style={{ boxShadow: '2px 2px 0 0 #000' }}
                                                    title="Lihat"
                                                >
                                                    <Eye className="size-4" />
                                                </Link>
                                                <Link
                                                    href={edit.url(item.id)}
                                                    className="p-2 bg-black text-amber-500 border-2 border-black hover:bg-amber-500 hover:text-black transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                                                    style={{ boxShadow: '2px 2px 0 0 #000' }}
                                                    title="Edit"
                                                >
                                                    <Pencil className="size-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteTarget(item)}
                                                    className="p-2 bg-black text-amber-500 border-2 border-black hover:bg-[#A90C1F] hover:text-white transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                                                    style={{ boxShadow: '2px 2px 0 0 #000' }}
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
                                className={`inline-flex h-10 w-10 items-center justify-center font-depixel text-sm border-4 border-black transition-all ${
                                    news.current_page === page
                                        ? 'bg-amber-500 text-black translate-x-[2px] translate-y-[2px]'
                                        : 'bg-[#A90C1F] text-amber-400 hover:bg-black hover:translate-x-[2px] hover:translate-y-[2px]'
                                }`}
                                style={{
                                    boxShadow: news.current_page === page ? '2px 2px 0 0 #000' : '4px 4px 0 0 #000'
                                }}
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
