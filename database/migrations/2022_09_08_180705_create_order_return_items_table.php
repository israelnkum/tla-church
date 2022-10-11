<?php

use App\Models\OrderReturn;
use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('order_return_items', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Product::class)->constrained();
            $table->foreignIdFor(OrderReturn::class)->constrained();
            $table->integer('qty');
            $table->string('sub_total');
            $table->boolean('damaged')->default(0);
            $table->integer('damaged_qty')->default(0);
            $table->string('damaged_sub_total')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('dispatch_order_return_items');
    }
};
