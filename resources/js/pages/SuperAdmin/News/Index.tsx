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

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => {
                    if (!open) setDeleteTarget(null);
                }}
            >
                <AlertDialogContent className="max-w-md overflow-hidden rounded-none border-4 border-[#211818] bg-[#f7f1df] p-0 text-[#211818] shadow-[6px_6px_0_#211818]">
                    <AlertDialogHeader className="border-b-2 border-[#8C1C2A]/25 bg-[#e8dcc3] px-6 py-5">
                        <AlertDialogTitle className="font-kemco text-lg tracking-normal text-[#8C1C2A]">
                            HAPUS BERITA?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="px-6 py-6 font-depixel text-xs leading-relaxed text-[#514435]">
                        Kamu yakin ingin menghapus berita{' '}
                        <span className="bg-[#FBA819] px-1 font-bold text-[#211818]">
                            "{deleteTarget?.title}"
                        </span>
                        ?
                        <br />
                        <br />
                        <span className="text-[#8C1C2A]">
                            Aksi ini tidak bisa dibatalkan.
                        </span>
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

            <div className="dashboard-admin-page flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
                <div className="dashboard-section-header flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                    <div>
                        <h1 className="font-kemco text-base sm:text-lg leading-tight tracking-normal text-[#211818]">
                            Berita
                        </h1>
                        <p className="mt-1 font-sans text-xs sm:text-sm font-normal tracking-normal text-[#514435] normal-case">
                            Total {news.total} berita
                        </p>
                    </div>
                    <Button
                        asChild
                        className="pixel-button pixel-button--gold shrink-0 text-xs px-3 py-1.5 sm:px-4 sm:py-2"
                    >
                        <Link href={create.url()}>
                            <Plus className="size-3.5 sm:size-4" />
                            Tambah Berita
                        </Link>
                    </Button>
                </div>

                {/* Filter */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center gap-2"
                    >
                        <div className="relative w-full sm:w-[220px]">
                            <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-amber-400/70 pointer-events-none" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul berita..."
                                className="h-auto w-full rounded-none border-2 border-[#211818] bg-[#8C1C2A] py-2 pr-3 pl-9 font-depixel text-[10px] text-[#f7f1df] placeholder:text-[#f7f1df]/60 focus-visible:border-[#FBA819] focus-visible:ring-0 focus-visible:ring-offset-0"
                                style={{ boxShadow: '2px 2px 0 0 #211818' }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="pixel-button pixel-button--gold inline-flex shrink-0 items-center gap-1.5 px-3 py-2 sm:px-4 font-kemco text-[10px] sm:text-xs"
                        >
                            <Search className="size-3" />
                            Cari
                        </button>
                    </form>
                    <select
                        value={filters.category ?? ''}
                        onChange={(e) => handleCategoryFilter(e.target.value)}
                        className="w-full sm:w-auto shrink-0 rounded-none border-2 border-[#211818] bg-[#f7f1df] px-3 py-2 font-depixel text-xs text-[#211818] outline-none shadow-[2px_2px_0_#211818] focus:border-[#8C1C2A]"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="dashboard-content flex-1">
                    <div className="flex flex-col divide-y-2 divide-dashed divide-[#8c7b60] sm:hidden">
                        {news.data.length === 0 ? (
                            <div className="py-8 text-center font-depixel text-xs text-[#514435]">
                                Belum ada berita
                            </div>
                        ) : (
                            news.data.map((item, i) => (
                                <div key={item.id} className="flex flex-col gap-2 py-2.5 px-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-depixel text-xs font-bold text-[#8C1C2A]">
                                                #{(news.current_page - 1) * 6 + i + 1}
                                            </span>
                                            <span className="inline-flex items-center border border-[#211818] bg-[#8C1C2A] px-2 py-0.5 font-depixel text-[9px] font-bold text-[#f7f1df] uppercase">
                                                {item.category?.name ?? '-'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-[#211818]/10 p-1 border border-[#211818]/20">
                                            <Link
                                                href={show.url(item.id)}
                                                className="p-1 text-[#514435] hover:text-[#8C1C2A]"
                                                title="Lihat"
                                            >
                                                <Eye className="size-3.5" />
                                            </Link>
                                            <Link
                                                href={edit.url(item.id)}
                                                className="p-1 text-[#514435] hover:text-[#8C1C2A]"
                                                title="Edit"
                                            >
                                                <Pencil className="size-3.5" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteTarget(item)}
                                                className="p-1 text-[#514435] hover:text-[#8C1C2A]"
                                                title="Hapus"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-2.5 items-center">
                                        {item.image ? (
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.title}
                                                className="h-12 w-16 shrink-0 border-2 border-black object-cover"
                                                style={{
                                                    imageRendering: 'pixelated',
                                                    boxShadow: '1.5px 1.5px 0 0 rgba(0,0,0,0.5)',
                                                }}
                                            />
                                        ) : (
                                            <div className="flex h-12 w-16 shrink-0 items-center justify-center border-2 border-[#211818] bg-[#e8dcc3] font-depixel text-[9px] text-[#514435]">
                                                N/A
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="line-clamp-1 font-depixel text-xs font-bold text-[#211818]">
                                                {item.title}
                                            </h3>
                                            <p className="mt-0.5 font-depixel text-[10px] text-[#514435] line-clamp-1">
                                                {item.description.replace(/<[^>]+>/g, '')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="hidden sm:block w-full overflow-x-auto">
                        <table className="w-full text-sm min-w-[500px]">
                            <thead className="border-b-4 border-black bg-black">
                                <tr>
                                    <th className="w-12 md:w-16 pl-4 md:pl-8 pr-2 md:pr-4 py-2.5 text-left font-kemco text-xs md:text-sm font-bold text-[#FBA819]">
                                        No
                                    </th>
                                    <th className="w-16 md:w-20 px-2 md:px-4 py-2.5 text-left font-kemco text-xs md:text-sm font-bold text-[#FBA819]">
                                        Gambar
                                    </th>
                                    <th className="px-2 md:px-4 py-2.5 text-left font-kemco text-xs md:text-sm font-bold text-[#FBA819]">
                                        Judul
                                    </th>
                                    <th className="px-2 md:px-4 py-2.5 text-left font-kemco text-xs md:text-sm font-bold text-[#FBA819]">
                                        Kategori
                                    </th>
                                    <th className="w-20 md:w-24 px-2 md:px-4 py-2.5 text-right font-kemco text-xs md:text-sm font-bold text-[#FBA819]">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-4 divide-black">
                                {news.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-10 text-center font-depixel text-sm text-[#514435]"
                                        >
                                            Belum ada berita
                                        </td>
                                    </tr>
                                ) : (
                                    news.data.map((item, i) => (
                                        <tr
                                            key={item.id}
                                            className="transition-colors hover:bg-[#8C1C2A]/5"
                                        >
                                            <td className="pl-4 md:pl-8 pr-2 md:pr-4 py-2.5 font-depixel text-xs md:text-sm font-semibold text-[#514435]">
                                                {(news.current_page - 1) * 6 +
                                                    i +
                                                    1}
                                            </td>
                                            <td className="px-2 md:px-4 py-2.5">
                                                {item.image ? (
                                                    <img
                                                        src={`/storage/${item.image}`}
                                                        alt={item.title}
                                                        className="h-12 w-16 md:h-14 md:w-20 border-2 md:border-4 border-black object-cover"
                                                        style={{
                                                            imageRendering:
                                                                'pixelated',
                                                            boxShadow:
                                                                '2px 2px 0 0 rgba(0,0,0,0.5)',
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-12 items-center justify-center border-2 border-[#211818] bg-[#e8dcc3] font-depixel text-[10px] text-[#514435]">
                                                        N/A
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-2 md:px-4 py-2.5">
                                                <p className="line-clamp-1 font-depixel text-sm md:text-base font-bold text-[#211818]">
                                                    {item.title}
                                                </p>
                                                <p className="mt-0.5 font-depixel text-[11px] md:text-xs text-[#514435] line-clamp-1">
                                                    {item.description.replace(/<[^>]+>/g, '')}
                                                </p>
                                            </td>
                                            <td className="px-2 md:px-4 py-2.5">
                                                <span className="inline-flex items-center border border-[#211818] bg-[#8C1C2A] px-2 py-0.5 md:px-2.5 md:py-1 font-depixel text-[10px] md:text-xs font-medium text-[#f7f1df]">
                                                    {item.category?.name ?? '-'}
                                                </span>
                                            </td>
                                            <td className="px-2 md:px-4 py-2.5">
                                                <div className="flex items-center justify-end gap-1 md:gap-2">
                                                    <Link
                                                        href={show.url(item.id)}
                                                        className="p-1 md:p-1.5 text-[#514435] transition-colors hover:text-[#8C1C2A]"
                                                        title="Lihat"
                                                    >
                                                        <Eye className="size-3.5 md:size-4" />
                                                    </Link>
                                                    <Link
                                                        href={edit.url(item.id)}
                                                        className="p-1 md:p-1.5 text-[#514435] transition-colors hover:text-[#8C1C2A]"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="size-3.5 md:size-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            setDeleteTarget(item)
                                                        }
                                                        className="p-1 md:p-1.5 text-[#514435] transition-colors hover:text-[#8C1C2A]"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="size-3.5 md:size-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {news.last_page > 1 && (
                        <div className="mt-4 flex items-center justify-end gap-2 pr-4 pb-4">
                            {Array.from(
                                { length: news.last_page },
                                (_, i) => i + 1,
                            ).map((page) => (
                                <Link
                                    key={page}
                                    href={index.url({
                                        query: { ...filters, page },
                                    })}
                                    className={`inline-flex h-8 w-8 items-center justify-center font-kemco text-xs transition-colors ${
                                        news.current_page === page
                                            ? 'bg-[#8C1C2A] text-white'
                                            : 'text-[#514435] hover:bg-[#211818]/10 hover:text-[#8C1C2A]'
                                    }`}
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

NewsIndex.layout = () => ({
    breadcrumbs: [{ title: 'Berita', href: index.url() }],
});
