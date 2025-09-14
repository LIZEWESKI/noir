<?php

namespace App\Console\Commands;

use App\Models\Room;
use Illuminate\Console\Command;

class UpdateRoomStatuses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-room-statuses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Room::all()->each->updateStatus();
        $this->info('Room statuses updated successfully.');
        return Command::SUCCESS;
    }
}
