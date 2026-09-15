import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import {
    index,
    update,
    edit,
} from '@/actions/App/Http/Controllers/SuperAdmin/NewsController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type News = {
    id: number;
    title: string;
    slug: string;
    image: string;
    description: string;
    category_id: number;
};

type Category = {
    id: number;
    name: string;
};

type Props = {
    news: News;
    categories: Category[];
};

export default function NewsEdit({ news, categories }: Props) {
    const [preview, setPreview] = useState<string | null>(null);

    const form = useForm({
        title: news.title,
        image: null as File | null,
        description: news.description,
        category_id: String(news.category_id),
        _method: 'PUT',
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
        form.post(update.url(news.id), {
            onSuccess: () => toast.success('Berita berhasil diupdate'),
            onError: () => toast.error('Periksa kembali form'),
        });
    }

    return (
        <>
            <Head title="Edit Berita" />

            <div className="flex flex-col gap-6 p-6 max-w-2xl">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={index.url()}>
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Berita</h1>
                        <p className="text-sm text-muted-foreground mt-0.5 font-mono text-xs">{news.slug}</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Judul */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="title">Judul</Label>
                        <Input
                            id="title"
                            value={form.data.title}
                            onChange={e => form.setData('title', e.target.value)}
                            placeholder="Judul berita..."
                        />
                        {form.errors.title && <p className="text-xs text-destructive">{form.errors.title}</p>}
                    </div>

                    {/* Kategori */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="category_id">Kategori</Label>
                        <select
                            id="category_id"
                            value={form.data.category_id}
                            onChange={e => form.setData('category_id', e.target.value)}
                            className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                            <option value="">-- Pilih Kategori --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {form.errors.category_id && <p className="text-xs text-destructive">{form.errors.category_id}</p>}
                    </div>

                    {/* Gambar */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="image">Gambar</Label>
                        <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-input hover:border-primary/50 cursor-pointer transition-colors p-6 gap-2"
                        >
                            {preview ? (
                                <img src={preview} alt="preview baru" className="max-h-48 rounded-md object-cover" />
                            ) : news.image ? (
                                <div className="flex flex-col items-center gap-2">
                                    <img
                                        src={`/storage/${news.image}`}
                                        alt="gambar saat ini"
                                        className="max-h-40 rounded-md object-cover"
                                    />
                                    <p className="text-xs text-muted-foreground">Gambar saat ini — klik untuk ganti</p>
                                </div>
                            ) : (
                                <>
                                    <Upload className="size-8 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">Klik untuk upload gambar</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF — max 2MB</p>
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
                        {form.errors.image && <p className="text-xs text-destructive">{form.errors.image}</p>}
                    </div>

                    {/* Deskripsi */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="description">Deskripsi</Label>
                        <textarea
                            id="description"
                            value={form.data.description}
                            onChange={e => form.setData('description', e.target.value)}
                            rows={6}
                            placeholder="Isi berita..."
                            className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none resize-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        />
                        {form.errors.description && <p className="text-xs text-destructive">{form.errors.description}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end pt-2">
                        <Button type="button" variant="outline" asChild>
                            <Link href={index.url()}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? 'Menyimpan...' : 'Update Berita'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

NewsEdit.layout = () => ({
    breadcrumbs: [
        { title: 'Berita', href: index.url() },
        { title: 'Edit', href: '#' },
    ],
});
