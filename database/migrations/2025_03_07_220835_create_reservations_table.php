<?php

use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Room::class)->constrained()->cascadeOnDelete();
            $table->date('check_in');
            $table->date('check_out');
            $table->integer('nights');
            $table->decimal('cleaning_fee', 10, 2);
            $table->decimal('service_fee', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->string('status')->default('pending'); // completed, pending, cancelled
            $table->timestamps();
            $table->index('check_in');
            $table->index('check_out');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
