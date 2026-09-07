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

            {/* Modal Edit */}
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

            {/* AlertDialog Konfirmasi Delete */}
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

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Kategori</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Kelola kategori berita
                        </p>
                    </div>
                    <Button onClick={() => setAddOpen(true)}>
                        <Plus className="size-4" />
                        Tambah Kategori
                    </Button>
                </div>

                {/* Tabel Kategori */}
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-12">#</th>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nama</th>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Slug</th>
                                <th className="text-right px-4 py-3 font-medium text-muted-foreground w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 text-muted-foreground">
                                        Belum ada kategori
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category, i) => (
                                    <tr key={category.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                                        <td className="px-4 py-3 font-medium">{category.name}</td>
                                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{category.slug}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openEdit(category)}
                                                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="size-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteTarget(category)}
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
            </div>
        </>
    );
}

CategoriesIndex.layout = () => ({
    breadcrumbs: [
        { title: 'Kategori', href: index.url() },
    ],
});
