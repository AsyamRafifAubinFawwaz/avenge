<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function __invoke()
    {
        $latestNews = News::with('category')
            ->latest()
            ->take(6)
            ->get();

        $categories = Category::with(['news' => function ($query) {
            $query->latest()->take(3);
        }])
            ->has('news')
            ->orderBy('name', 'asc')
            ->get();

        return Inertia::render('welcome', [
            'latestNews' => $latestNews,
            'categories' => $categories,
        ]);
    }
}
