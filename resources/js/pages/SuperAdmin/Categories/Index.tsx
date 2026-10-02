import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { index, store, update, destroy } from '@/actions/App/Http/Controllers/SuperAdmin/CategoryController';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type Category = {
    id: number;
    name: string;
    slug: string;
    created_at: string;
};

type Props = {
    categories: Category[];
};

export default function CategoriesIndex({ categories }: Props) {
    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Category | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
    const [deleting, setDeleting] = useState(false);

    const addForm = useForm({ name: '' });
    const editForm = useForm({ name: '' });

    function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        addForm.post(store.url(), {
            onSuccess: () => {
                addForm.reset();
                setAddOpen(false);
                toast.success('Kategori berhasil ditambahkan');
            },
            onError: () => toast.error('Gagal menambahkan kategori'),
        });
    }

    function openEdit(category: Category) {
        setEditTarget(category);
        editForm.setData('name', category.name);
    }

    function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!editTarget) return;
        editForm.put(update.url(editTarget.id), {
            onSuccess: () => {
                editForm.reset();
                setEditTarget(null);
                toast.success('Kategori berhasil diupdate');
            },
            onError: () => toast.error('Gagal mengupdate kategori'),
        });
    }

    function handleDelete() {
        if (!deleteTarget) return;
        setDeleting(true);
        router.delete(destroy.url(deleteTarget.id), {
            onSuccess: () => {
                toast.success(`Kategori "${deleteTarget.name}" berhasil dihapus`);
                setDeleteTarget(null);
            },
            onError: () => toast.error('Gagal menghapus kategori'),
            onFinish: () => setDeleting(false),
        });
    }

    return (
        <>
            <Head title="Kategori" />

            {/* Modal Tambah */}
            <Dialog open={addOpen} onOpenChange={open => { setAddOpen(open); if (!open) addForm.reset(); }}>
                <DialogContent className="rounded-none border-4 border-[#211818] bg-[#f7f1df] text-[#211818] shadow-[6px_6px_0_#211818] sm:max-w-md">
                    <DialogHeader className="border-b-2 border-[#8C1C2A]/25 pb-3">
                        <DialogTitle className="font-kemco text-lg text-[#211818]">Tambah Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAdd} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="add-name" className="font-depixel text-xs text-[#211818]">Nama Kategori</Label>
                            <Input
                                id="add-name"
                                value={addForm.data.name}
                                onChange={e => addForm.setData('name', e.target.value)}
                                placeholder="Contoh: Teknologi"
                                autoFocus
                                className="h-11 rounded-none border-2 border-[#211818] bg-[#e8dcc3] font-depixel text-sm placeholder:text-[#746957] focus-visible:border-[#8C1C2A] focus-visible:ring-[#8C1C2A]/25"
                            />
                            {addForm.errors.name && (
                                <p className="font-depixel text-xs text-[#8C1C2A]">{addForm.errors.name}</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setAddOpen(false)} className="btn-pixelated rounded-none! border-0! bg-[#675b4d]! px-5 text-white shadow-none">
                                Batal
                            </Button>
                            <Button type="submit" disabled={addForm.processing} className="btn-pixelated rounded-none! border-0! bg-[#FBA819]! px-5 text-[#211818] shadow-none">
                                {addForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={!!editTarget} onOpenChange={open => { if (!open) { setEditTarget(null); editForm.reset(); } }}>
                <DialogContent className="rounded-none border-4 border-[#211818] bg-[#f7f1df] text-[#211818] shadow-[6px_6px_0_#211818] sm:max-w-md">
                    <DialogHeader className="border-b-2 border-[#8C1C2A]/25 pb-3">
                        <DialogTitle className="font-kemco text-lg text-[#211818]">Edit Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="edit-name" className="font-depixel text-xs text-[#211818]">Nama Kategori</Label>
                            <Input
                                id="edit-name"
                                value={editForm.data.name}
                                onChange={e => editForm.setData('name', e.target.value)}
                                placeholder="Nama kategori..."
                                autoFocus
                                className="h-11 rounded-none border-2 border-[#211818] bg-[#e8dcc3] font-depixel text-sm placeholder:text-[#746957] focus-visible:border-[#8C1C2A] focus-visible:ring-[#8C1C2A]/25"
                            />
                            {editForm.errors.name && (
                                <p className="font-depixel text-xs text-[#8C1C2A]">{editForm.errors.name}</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => { setEditTarget(null); editForm.reset(); }} className="btn-pixelated rounded-none! border-0! bg-[#675b4d]! px-5 text-white shadow-none">
                                Batal
                            </Button>
                            <Button type="submit" disabled={editForm.processing} className="btn-pixelated rounded-none! border-0! bg-[#FBA819]! px-5 text-[#211818] shadow-none">
                                {editForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!deleteTarget} onOpenChange={open => { if (!open) setDeleteTarget(null); }}>
                <AlertDialogContent className="rounded-none border-4 border-[#211818] bg-[#f7f1df] text-[#211818] shadow-[6px_6px_0_#211818]">
                    <AlertDialogHeader className="border-b-2 border-[#8C1C2A]/25 pb-3">
                        <AlertDialogTitle className="font-kemco text-lg text-[#8C1C2A]">Hapus Kategori?</AlertDialogTitle>
                        <AlertDialogDescription className="font-depixel text-xs leading-relaxed text-[#514435]">
                            Kamu yakin ingin menghapus kategori <span className="font-bold text-[#211818]">"{deleteTarget?.name}"</span>?
                            Aksi ini tidak bisa dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting} className="rounded-none border-2 border-[#211818] bg-[#675b4d] font-depixel text-xs text-white shadow-[3px_3px_0_#211818] hover:bg-[#514435] hover:text-white">
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={deleting} className="rounded-none border-2 border-[#211818] bg-[#8C1C2A] font-depixel text-xs text-white shadow-[3px_3px_0_#211818] hover:bg-[#6f1420]">
                            {deleting ? 'Menghapus...' : 'Ya, Hapus'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="dashboard-admin-page flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
                <div className="dashboard-section-header flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                    <div>
                        <h1 className="font-kemco text-base sm:text-lg leading-tight tracking-normal text-[#211818]">Kategori</h1>
                        <p className="mt-1 font-sans text-xs sm:text-sm font-normal normal-case tracking-normal text-[#514435]">
                            Kelola kategori berita
                        </p>
                    </div>
                    <Button onClick={() => setAddOpen(true)} className="pixel-button pixel-button--gold shrink-0 text-xs px-3 py-1.5 sm:px-4 sm:py-2">
                        <Plus className="size-3.5 sm:size-4" />
                        Tambah Kategori
                    </Button>
                </div>

                {/* Mobile Card List & Desktop Table */}
                <div className="dashboard-content flex-1">
                    {/* Mobile Card List */}
                    <div className="flex flex-col divide-y-2 divide-dashed divide-[#8c7b60] sm:hidden">
                        {categories.length === 0 ? (
                            <div className="py-8 text-center font-depixel text-xs text-[#514435]">
                                Belum ada kategori
                            </div>
                        ) : (
                            categories.map((category, i) => (
                                <div key={category.id} className="flex items-center justify-between gap-2 py-3 px-1">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-2">
                                            <span className="font-depixel text-xs font-bold text-[#8C1C2A]">#{i + 1}</span>
                                            <span className="font-depixel text-xs font-bold text-[#211818]">{category.name}</span>
                                        </div>
                                        <span className="font-depixel text-[10px] text-[#514435]">{category.slug}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-[#211818]/10 p-1 border border-[#211818]/20 shrink-0">
                                        <button
                                            onClick={() => openEdit(category)}
                                            className="p-1 text-[#514435] hover:text-[#8C1C2A]"
                                            title="Edit"
                                        >
                                            <Pencil className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteTarget(category)}
                                            className="p-1 text-[#514435] hover:text-[#8C1C2A]"
                                            title="Hapus"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Desktop Table */}
                    <table className="hidden sm:table w-full text-sm">
                        <thead className="table-header-background">
                            <tr>
                                <th className="w-12 px-4 py-3 text-left font-kemco text-sm font-bold text-[#FBA819]">#</th>
                                <th className="px-4 py-3 text-left font-kemco text-sm font-bold text-[#FBA819]">Nama</th>
                                <th className="px-4 py-3 text-left font-kemco text-sm font-bold text-[#FBA819]">Slug</th>
                                <th className="w-24 px-4 py-3 text-right font-kemco text-sm font-bold text-[#FBA819]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-10 text-center font-depixel text-sm text-[#514435]">
                                        Belum ada kategori
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category, i) => (
                                    <tr key={category.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 font-depixel text-sm font-semibold text-[#514435]">{i + 1}</td>
                                        <td className="px-4 py-3 font-depixel text-base font-semibold text-[#211818]">{category.name}</td>
                                        <td className="px-4 py-3 font-depixel text-sm text-[#514435]">{category.slug}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openEdit(category)}
                                                    className="p-2 text-[#514435] transition-colors hover:text-[#8C1C2A]"
                                                    title="Edit"
                                                >
                                                    <Pencil className="size-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteTarget(category)}
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
            </div>
        </>
    );
}

CategoriesIndex.layout = () => ({
    breadcrumbs: [
        { title: 'Kategori', href: index.url() },
    ],
});
