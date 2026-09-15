<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['title', 'image', 'description'])]
class Gameplay extends Model
{
    use SoftDeletes;
    protected $table = 'gameplay';
    
}
