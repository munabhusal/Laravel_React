<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['role' => 'User']);
        Role::create(['role' => 'Admin']);
    }
}

// middelware - based on role - done
// its implementation - aafno details as user vs aru ko pani details as admin - done
// block user if login attempts fails 3 times - done
// blog user -> one to many
            // one blog 1 user
            // one user many blogs
// blog catagory -> one to many
            // one blog 1 catagory
            // one catagory many blogs
// blog tags -> many to many
            // one blog many tags
            // one tags many blogs
