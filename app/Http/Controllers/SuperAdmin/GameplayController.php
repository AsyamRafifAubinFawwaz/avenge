<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Gameplay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GameplayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $gameplays = Gameplay::latest()->get();
        return view('superadmin.gameplay.index', compact('gameplays'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'string'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('gameplay', 'public');
        }
        Gameplay::create($validated);
        return redirect()->route('superadmin.gameplay.index')
            ->with('success', 'Gameplay berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'string'
        ]);

        $gameplay = Gameplay::find($id);
        if ($request->hasFile('image')) {
            if ($gameplay->image) {
                Storage::delete('public/' . $gameplay->image);
            }
            $validated['image'] = $request->file('image')->store('gameplay', 'public');
        }
        $gameplay->update($validated);
        return redirect()->route('superadmin.gameplay.index')
            ->with('success', 'Gameplay berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $gameplay = Gameplay::find($id);
        if ($gameplay->image) {
            Storage::delete('public/' . $gameplay->image);
        }
        $gameplay->delete();
        return redirect()->route('superadmin.gameplay.index')
            ->with('success', 'Gameplay berhasil dihapus');
    }
}
