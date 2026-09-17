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
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Tambah Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAdd} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="add-name">Nama Kategori</Label>
                            <Input
                                id="add-name"
                                value={addForm.data.name}
                                onChange={e => addForm.setData('name', e.target.value)}
                                placeholder="Contoh: Teknologi"
                                autoFocus
                            />
                            {addForm.errors.name && (
                                <p className="text-xs text-destructive">{addForm.errors.name}</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={addForm.processing}>
                                {addForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={!!editTarget} onOpenChange={open => { if (!open) { setEditTarget(null); editForm.reset(); } }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="edit-name">Nama Kategori</Label>
                            <Input
                                id="edit-name"
                                value={editForm.data.name}
                                onChange={e => editForm.setData('name', e.target.value)}
                                placeholder="Nama kategori..."
                                autoFocus
                            />
                            {editForm.errors.name && (
                                <p className="text-xs text-destructive">{editForm.errors.name}</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => { setEditTarget(null); editForm.reset(); }}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={editForm.processing}>
                                {editForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!deleteTarget} onOpenChange={open => { if (!open) setDeleteTarget(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Kategori?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Kamu yakin ingin menghapus kategori <span className="font-semibold text-foreground">"{deleteTarget?.name}"</span>?
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
                        <h1 className="font-kemco text-base leading-tight tracking-normal text-white">Kategori</h1>
                        <p className="mt-1 font-sans text-xs font-normal normal-case tracking-normal text-white/65">
                            Kelola kategori berita
                        </p>
                    </div>
                    <Button onClick={() => setAddOpen(true)} className="pixel-button pixel-button--default shrink-0">
                        <Plus className="size-4" />
                        Tambah Kategori
                    </Button>
                </div>

                <div className="dashboard-content flex-1 overflow-auto">
                    <table className="w-full text-sm">
                        <thead className="table-header-background">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-amber-400/80 w-12">#</th>
                                <th className="px-4 py-3 text-left font-medium text-amber-400/80">Nama</th>
                                <th className="px-4 py-3 text-left font-medium text-amber-400/80">Slug</th>
                                <th className="px-4 py-3 text-right font-medium text-amber-400/80 w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-10 text-center text-white/50">
                                        Belum ada kategori
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category, i) => (
                                    <tr key={category.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 text-white/50">{i + 1}</td>
                                        <td className="px-4 py-3 font-medium">{category.name}</td>
                                        <td className="px-4 py-3 font-mono text-xs text-white/50">{category.slug}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openEdit(category)}
                                                    className="p-1.5 text-white/55 transition-colors hover:text-amber-400"
                                                    title="Edit"
                                                >
                                                    <Pencil className="size-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteTarget(category)}
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
            </div>
        </>
    );
}

CategoriesIndex.layout = () => ({
    breadcrumbs: [
        { title: 'Kategori', href: index.url() },
    ],
});
