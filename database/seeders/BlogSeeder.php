<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Tag;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Blog::factory(100)->create();

        
        $blogs = Blog::all();
        
        foreach($blogs as $blog){
            $blog->tag()->attach(
                Tag::inRandomOrder()->take(rand(1,4))->pluck('id'), [
                    // 'status' => fake()->numberBetween(0,1),
                    // 'image' => Str::random(10)
                ]
            );
        }
    }
}
