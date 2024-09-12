<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catagory extends Model
{ 
    use HasFactory;

    protected $fillable = [
        'catagory',
    ];

    public function blog()
    {
        return $this->hasMany(Blog::class);
    }
}
