<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Booking Confirmation</title>
  <style>
    body {
      background-color: #0d1117;
      color: #e6edf3;
      font-family: 'Segoe UI', sans-serif;
      padding: 40px 20px;
    }
    .card {
      background-color: #161b22;
      border-radius: 12px;
      padding: 30px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 0 10px rgba(255,255,255,0.05);
    }
    .card-header {
      border-bottom: 1px solid #30363d;
      margin-bottom: 20px;
    }
    .card-header h1 {
      font-size: 24px;
      margin: 0 0 5px;
      color: #58a6ff;
    }
    .card-header p {
      margin: 0;
      color: #8b949e;
    }
    .reservation {
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 1px solid #30363d;
    }
    .section-title {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .section-desc {
      margin-bottom: 2px;
    }
    .small-text {
      font-size: 12px;
      color: #8b949e;
    }
    .summary {
      background-color: #21262d;
      padding: 15px;
      border-radius: 8px;
      margin-top: 10px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
    }
    .button {
      display: inline-block;
      margin: 5px 10px;
      padding: 10px 18px;
      background-color: transparent;
      border: 1px solid #58a6ff;
      border-radius: 6px;
      color: #58a6ff;
      font-size: 14px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <h1>Booking Confirmation</h1>
      <p>Booking ID: {{ $order_id }}</p>
    </div>

    @foreach ($reservations as $reservation)
      <div class="reservation">
        <div>
          <p class="section-title">Check-in</p>
          <p class="section-desc">{{ \Carbon\Carbon::parse($reservation->check_in)->format('F j, Y') }}</p>
          <p class="small-text">From 3:00 PM</p>
        </div>
        <div style="margin-top: 10px;">
          <p class="section-title">Check-out</p>
          <p class="section-desc">{{ \Carbon\Carbon::parse($reservation->check_out)->format('F j, Y') }}</p>
          <p class="small-text">Until 11:00 AM</p>
        </div>
        <div style="margin-top: 10px;">
          <p class="section-title">Accommodation</p>
          <p class="section-desc">{{ $reservation->room->name }}</p>
          <p class="small-text">
            {{ $reservation->room->bed }} • 
            {{ $reservation->room->guest }} {{ $reservation->room->guests === 1 ? 'Guest' : 'Guests' }} • 
            {{ $reservation->room->size }}
          </p>
        </div>
      </div>
    @endforeach

    <div class="summary">
      <span>Total Amount Paid</span>
      <span>${{ number_format($total_amount, 2) }}</span>
    </div>
  </div>
</body>
</html>
