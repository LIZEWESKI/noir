<?php

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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('total_amount', 10, 2); // Allows for large amounts with 2 decimal places
            $table->string('payment_status'); // 'pending', 'completed', 'failed', etc.
            $table->string('payment_method'); // 'paypal', 'visa', 'mastercard', etc.
            $table->string('transaction_id')->nullable(); // PayPal order ID or other transaction reference
            $table->text('notes')->nullable(); // Optional field for additional information
            $table->timestamps();
        });
        
        Schema::create('payment_reservation', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_id')->constrained()->onDelete('cascade');
            $table->foreignId('reservation_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->unique(['payment_id', 'reservation_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_reservation');
    }
};
