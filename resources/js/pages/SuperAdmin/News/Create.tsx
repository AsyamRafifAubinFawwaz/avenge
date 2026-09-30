import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/SuperAdmin/NewsController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Category = {
    id: number;
    name: string;
};

type Props = {
    categories: Category[];
};

export default function NewsCreate({ categories }: Props) {
    const [preview, setPreview] = useState<string | null>(null);

    const form = useForm({
        title: '',
        image: null as File | null,
        description: '',
        category_id: '',
    });

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        form.setData('image', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(store.url(), {
            onSuccess: () => toast.success('Berita berhasil ditambahkan'),
            onError: () => toast.error('Periksa kembali form'),
        });
    }

    return (
        <>
            <Head title="Tambah Berita" />

            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 text-[#211818] sm:p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild className="rounded-none border-2 border-[#211818] bg-[#f7f1df] text-[#211818] shadow-[3px_3px_0_#211818] hover:bg-[#e8dcc3]">
                        <Link href={index.url()}>
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="font-kemco text-xl tracking-normal text-[#211818] sm:text-2xl">Tambah Berita</h1>
                        <p className="mt-1 font-depixel text-xs text-[#514435]">Isi form berikut untuk menambah berita baru</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 border-4 border-[#211818] bg-[#f7f1df] p-5 shadow-[6px_6px_0_#211818] sm:p-7">
                    {/* Judul */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title" className="font-depixel text-xs text-[#211818]">Judul</Label>
                        <Input
                            id="title"
                            value={form.data.title}
                            onChange={e => form.setData('title', e.target.value)}
                            placeholder="Judul berita..."
                            className="h-11 rounded-none border-2 border-[#211818] bg-[#e8dcc3] font-depixel text-sm text-[#211818] placeholder:text-[#746957] focus-visible:border-[#8C1C2A] focus-visible:ring-[#8C1C2A]/25"
                        />
                        {form.errors.title && <p className="text-xs text-destructive">{form.errors.title}</p>}
                    </div>

                    {/* Kategori */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="category_id" className="font-depixel text-xs text-[#211818]">Kategori</Label>
                        <select
                            id="category_id"
                            value={form.data.category_id}
                            onChange={e => form.setData('category_id', e.target.value)}
                            className="h-11 rounded-none border-2 border-[#211818] bg-[#e8dcc3] px-3 py-2 font-depixel text-sm text-[#211818] outline-none focus-visible:border-[#8C1C2A] focus-visible:ring-2 focus-visible:ring-[#8C1C2A]/25"
                        >
                            <option value="">-- Pilih Kategori --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {form.errors.category_id && <p className="text-xs text-destructive">{form.errors.category_id}</p>}
                    </div>

                    {/* Gambar */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="image" className="font-depixel text-xs text-[#211818]">Gambar</Label>
                        <label
                            htmlFor="image"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-[#8C1C2A] bg-[#e8dcc3] p-6 transition-colors hover:bg-[#dfcfb2]"
                        >
                            {preview ? (
                                <img src={preview} alt="preview" className="max-h-48 border-2 border-[#211818] object-cover" />
                            ) : (
                                <>
                                    <Upload className="size-8 text-[#8C1C2A]" />
                                    <p className="font-depixel text-xs text-[#211818]">Klik untuk upload gambar</p>
                                    <p className="font-depixel text-[10px] text-[#514435]">PNG, JPG, GIF — max 2MB</p>
                                </>
                            )}
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                        {form.errors.image && <p className="font-depixel text-xs text-[#8C1C2A]">{form.errors.image}</p>}
                    </div>

                    {/* Deskripsi */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="font-depixel text-xs text-[#211818]">Deskripsi</Label>
                        <textarea
                            id="description"
                            value={form.data.description}
                            onChange={e => form.setData('description', e.target.value)}
                            rows={6}
                            placeholder="Isi berita..."
                            className="resize-none rounded-none border-2 border-[#211818] bg-[#e8dcc3] px-3 py-2 font-depixel text-sm text-[#211818] outline-none placeholder:text-[#746957] focus-visible:border-[#8C1C2A] focus-visible:ring-2 focus-visible:ring-[#8C1C2A]/25"
                        />
                        {form.errors.description && <p className="font-depixel text-xs text-[#8C1C2A]">{form.errors.description}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse justify-end gap-3 pt-2 sm:flex-row">
                        <Button type="button" variant="outline" asChild className="btn-pixelated rounded-none! border-0! bg-[#675b4d]! px-5 text-white shadow-none">
                            <Link href={index.url()}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing} className="btn-pixelated rounded-none! border-0! bg-[#FBA819]! px-5 text-[#211818] shadow-none">
                            {form.processing ? 'Menyimpan...' : 'Simpan Berita'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

NewsCreate.layout = () => ({
    breadcrumbs: [
        { title: 'Berita', href: index.url() },
        { title: 'Tambah', href: '#' },
    ],
});
