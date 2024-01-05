<?php

namespace Database\Seeders;

use App\Models\MemberClass;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MemberClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $classes = [
            'Freeman',
            'Emmanuel',
            'DeGraft',
            'Children'
        ];

        foreach ($classes as $class){
            MemberClass::firstOrCreate([
                'name' => $class,
                'user_id' => 1
            ]);
        }
    }
}
