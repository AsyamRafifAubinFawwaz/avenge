<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['title', 'slug', 'image', 'description', 'category_id'])]
class News extends Model
{
    use SoftDeletes;
    protected $table = 'news';


    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
