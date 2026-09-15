<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = News::with('category');

        if ($request->has('search') && $request->search != '') {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        $news = $query->orderBy('title', 'asc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/News/Index', [
            'news'      => $news,
            'categories' => Category::orderBy('name', 'asc')->get(),
            'filters'    => $request->only(['search', 'category'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('name', 'asc')->get();
        return Inertia::render('SuperAdmin/News/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'image'       => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        // Pastikan slug unik
        $originalSlug = $validated['slug'];
        $count = 1;
        while (News::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $count++;
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news', 'public');
        }

        News::create($validated);

        return redirect()->route('superadmin.news.index')
            ->with('success', 'Berita berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $news->load('category');
        return Inertia::render('SuperAdmin/News/Show', [
            'news' => $news
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        $news->load('category');
        $categories = Category::orderBy('name', 'asc')->get();

        return Inertia::render('SuperAdmin/News/Edit', [
            'news'       => $news,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        // Auto-generate slug dari title jika title berubah
        $newSlug = Str::slug($validated['title']);
        if ($newSlug !== $news->slug) {
            $originalSlug = $newSlug;
            $count = 1;
            while (News::where('slug', $newSlug)->where('id', '!=', $news->id)->exists()) {
                $newSlug = $originalSlug . '-' . $count++;
            }
        }
        $validated['slug'] = $newSlug;

        if ($request->hasFile('image')) {
            if ($news->image) {
                Storage::delete('public/' . $news->image);
            }
            $validated['image'] = $request->file('image')->store('news', 'public');
        }

        $news->update($validated);

        return redirect()->route('superadmin.news.index')
            ->with('success', 'Berita berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        if ($news->image) {
            Storage::delete('public/' . $news->image);
        }

        $news->delete();

        return redirect()->route('superadmin.news.index')
            ->with('success', 'Berita berhasil dihapus');
    }
}
