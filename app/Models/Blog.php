<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tag;
use App\Models\Catagory;
use App\Models\User;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'body', 'image', 'status'
    ];

    public function tag()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function catagory(){
        return $this->belongsTo(Catagory::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
