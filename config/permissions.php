<?php 

return [
    'admin' => ['export_analytics','export_rooms', 'export_reservations', 'export_guests','export_payments'],
    'manager' => ['export_analytics','export_rooms', 'export_reservations', 'export_guests'],
    'receptionist' => ['export_reservations', 'export_guests'],
    'accountant' => ['export_payments'],
    'housekeeping' => ['export_rooms'],
];