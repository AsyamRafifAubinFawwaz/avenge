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

            <div className="flex w-full max-w-3xl flex-col gap-6 p-4 text-[#f7f1df] sm:p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild className="rounded-none border-2 border-black bg-[#2a1c0f] text-[#f7f1df] shadow-[3px_3px_0_#000] hover:bg-[#3d2a17]">
                        <Link href={index.url()}>
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="font-kemco text-xl tracking-normal text-white sm:text-2xl">Tambah Berita</h1>
                        <p className="mt-1 font-depixel text-xs text-white/60">Isi form berikut untuk menambah berita baru</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6 pt-2">
                    {/* Judul */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title" className="font-depixel text-xs text-[#f7f1df]">Judul</Label>
                        <Input
                            id="title"
                            value={form.data.title}
                            onChange={e => form.setData('title', e.target.value)}
                            placeholder="Judul berita..."
                            className="w-full rounded-none font-depixel text-xs bg-[#1a1515] border-2 border-[#3d2e2e] shadow-[inset_3px_3px_0px_rgba(0,0,0,0.6)] text-[#F8F9FA] px-4 py-3 placeholder:text-[#6a5d5d] focus:outline-none focus:border-[#FBA819] focus:bg-[#211818] transition-colors"
                        />
                        {form.errors.title && <p className="font-depixel text-[10px] text-red-500">{form.errors.title}</p>}
                    </div>

                    {/* Kategori */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="category_id" className="font-depixel text-xs text-[#f7f1df]">Kategori</Label>
                        <select
                            id="category_id"
                            value={form.data.category_id}
                            onChange={e => form.setData('category_id', e.target.value)}
                            className="w-full rounded-none font-depixel text-xs bg-[#1a1515] border-2 border-[#3d2e2e] shadow-[inset_3px_3px_0px_rgba(0,0,0,0.6)] text-[#F8F9FA] px-4 py-3 focus:outline-none focus:border-[#FBA819] focus:bg-[#211818] transition-colors"
                        >
                            <option value="" className="bg-[#1a1515] text-[#F8F9FA]">-- Pilih Kategori --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id} className="bg-[#1a1515] text-[#F8F9FA]">{cat.name}</option>
                            ))}
                        </select>
                        {form.errors.category_id && <p className="font-depixel text-[10px] text-red-500">{form.errors.category_id}</p>}
                    </div>

                    {/* Gambar */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="image" className="font-depixel text-xs text-[#f7f1df]">Gambar</Label>
                        <label
                            htmlFor="image"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 p-6 border-4 border-dashed border-[#3d2e2e] bg-[#1a1515] hover:border-[#FBA819] hover:bg-[#FBA819]/5 transition-all"
                        >
                            {preview ? (
                                <img src={preview} alt="preview" className="max-h-48 border-2 border-[#3d2e2e] object-cover" />
                            ) : (
                                <>
                                    <Upload className="size-8 text-[#FBA819]" />
                                    <p className="font-depixel text-xs text-[#FBA819]">Klik untuk upload gambar</p>
                                    <p className="font-depixel text-[10px] text-gray-400">PNG, JPG, GIF — max 2MB</p>
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
                        {form.errors.image && <p className="font-depixel text-[10px] text-red-500">{form.errors.image}</p>}
                    </div>

                    {/* Deskripsi */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="font-depixel text-xs text-[#f7f1df]">Deskripsi</Label>
                        <textarea
                            id="description"
                            value={form.data.description}
                            onChange={e => form.setData('description', e.target.value)}
                            rows={6}
                            placeholder="Isi berita..."
                            className="w-full resize-none rounded-none font-depixel text-xs bg-[#1a1515] border-2 border-[#3d2e2e] shadow-[inset_3px_3px_0px_rgba(0,0,0,0.6)] text-[#F8F9FA] px-4 py-3 placeholder:text-[#6a5d5d] focus:outline-none focus:border-[#FBA819] focus:bg-[#211818] transition-colors"
                        />
                        {form.errors.description && <p className="font-depixel text-[10px] text-red-500">{form.errors.description}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse justify-end gap-3 pt-4 sm:flex-row">
                        <Link 
                            href={index.url()}
                            className="inline-flex items-center justify-center rounded-none font-kemco text-xs transition-colors bg-[#2b2222] text-[#F8F9FA] border-t-2 border-l-2 border-[#4a3b3b] border-b-4 border-r-4 border-[#120e0e] hover:bg-[#3d2e2e] active:border-t-4 active:border-l-4 active:border-[#120e0e] active:border-b-2 active:border-r-2 active:border-[#4a3b3b] px-6 py-2"
                        >
                            Batal
                        </Link>
                        <button 
                            type="submit" 
                            disabled={form.processing} 
                            className="inline-flex items-center justify-center rounded-none font-kemco text-xs font-bold bg-[#FBA819] text-[#211818] border-t-2 border-l-2 border-[#ffd465] border-b-4 border-r-4 border-[#b97a0f] active:border-t-4 active:border-l-4 active:border-[#b97a0f] active:border-b-2 active:border-r-2 active:border-[#ffd465] px-6 py-2"
                        >
                            {form.processing ? 'Menyimpan...' : 'Simpan Berita'}
                        </button>
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
