<?php

namespace Database\Seeders;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            TagSeeder::class,
            UserSeeder::class,
            CatagorySeeder::class,
            BlogSeeder::class,
        ]);        
        // Catagory::factory(5)->create();
        // Tag::factory(15)->create();
    }
}
