<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
//            EmployeeSeeder::class,
            RoleSeeder::class,
            CompanySeeder::class,
            /*  ExpenseSeeder::class,
             TruckSeeder::class,
             DispatchOrderSeeder::class,
             SuppliersSeeder::class,
             ProductSeeder::class,
             DispatchOrderItemSeeder::class,
             CashUpSeeder::class,
            ReceivedOrderSeeder::class,
            ReceivedOrderItemSeeder::class*/
        ]);
    }
}
