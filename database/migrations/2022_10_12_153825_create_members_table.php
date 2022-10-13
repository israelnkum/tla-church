<?php

use App\Models\MemberClass;
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
        Schema::create('members', static function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('other_names')->nullable();
            $table->string('last_name');
            $table->foreignIdFor(MemberClass::class);
            $table->string('home_town')->nullable();
            $table->text('nearest_landmark')->nullable();
            $table->string('phone_number')->nullable();
            $table->text('alt_phone_number')->nullable();
            $table->string('status')->default('active');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
};
