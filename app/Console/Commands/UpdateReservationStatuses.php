<?php

namespace App\Console\Commands;

use App\Models\Reservation;
use Illuminate\Console\Command;

class UpdateReservationStatuses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-reservation-statuses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'It updates reservation status';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Reservation::all()->each->updateStatus();
        $this->info('Reservation statuses updated successfully.');
        return Command::SUCCESS;
    }
}
