<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of news grouped by category for the landing page.
     */
    public function index(Request $request)
    {
        $categories = Category::with(['news' => function ($query) {
            $query->latest()->take(6);
        }])
            ->has('news')
            ->orderBy('name', 'asc')
            ->get();

        $latestNews = News::with('category')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('News/Index', [
            'categories' => $categories,
            'latestNews' => $latestNews,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified news article.
     */
    public function show(News $news)
    {
        $news->load('category');

        $related = News::with('category')
            ->where('category_id', $news->category_id)
            ->where('id', '!=', $news->id)
            ->latest()
            ->take(5)
            ->get();

        // Jika tidak ada artikel di kategori yang sama, ambil berita terbaru dari semua kategori
        if ($related->isEmpty()) {
            $related = News::with('category')
                ->where('id', '!=', $news->id)
                ->latest()
                ->take(5)
                ->get();
        }

        $categories = Category::orderBy('name', 'asc')->get();

        return Inertia::render('News/Show', [
            'news'       => $news,
            'related'    => $related,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
