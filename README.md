### Noir Hotel Booking System

A modern, elegant hotel booking system built with Laravel, Inertia.js, React, and Tailwind CSS. This application provides a seamless experience for users to browse rooms, make reservations, and complete payments.

## 🌟 Features

- **User Authentication**: Secure login, registration, and profile management
- **Room Browsing**: View available rooms with detailed information and images
- **Reservation System**: Book rooms with date selection and guest information
- **Payment Processing**: Secure payment via PayPal and credit/debit cards
- **Reservation Management**: View, modify, and cancel reservations
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Real-time Notifications**: Mailtrap for user actions
- **Admin Dashboard**: Manage rooms, reservations, and users (admin only)


## 🛠️ Technologies

- **Backend**:

- [Laravel](https://laravel.com/) - PHP framework for the backend
- MySQL - Database management



- **Frontend**:

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Inertia.js](https://inertiajs.com/) - The modern monolith, connecting Laravel with React
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable UI components

- **Design**: 
- [Designer](https://www.behance.net/yassinemagri) - Designed by Yassine Magri (Thanks bro)

- **Payment Processing**:

- PayPal integration

- **Other Tools**:

- [date-fns](https://date-fns.org/) - Date manipulation library
- [Lucide React](https://lucide.dev/) - Icon library
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications





## 📋 Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js and npm
- MySQL
- PayPal Developer Account (for payment processing)


## 🚀 Installation

1. **Clone the repository**


```shellscript
git clone https://github.com/LIZEWESKI/noir.git
cd noir-hotel-booking
```

2. **Install PHP dependencies**


```shellscript
composer install
```

3. **Install JavaScript dependencies**


```shellscript
npm install
```

4. **Create environment file**


```shellscript
cp .env.example .env
```

5. **Generate application key**


```shellscript
php artisan key:generate
```

6. **Configure your database in the .env file (or use sqlite instead)**


```plaintext
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=noir_hotel
DB_USERNAME=root
DB_PASSWORD=
```

7. **Configure PayPal credentials in the .env file**


```plaintext
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox  # Change to 'live' for production
```

8. **Run database migrations and seeders**


```shellscript
php artisan migrate --seed
```

9. **Build assets**


```shellscript
npm run dev
```

10. **Start the development server**


```shellscript
php artisan serve
```

Or you can run both at the same time using 

```shellscript
composer dev
```

The application will be available at `http://127.0.0.1:8000`.

## 🏗️ Project Structure

```plaintext
noir-hotel-booking/
├── app/                  # Laravel application code
│   ├── Http/
│   │   ├── Controllers/  # Controllers for handling requests
│   │   └── Middleware/   # Request middleware
│   └── Models/           # Eloquent models
├── database/             # Database migrations and seeders
├── public/               # Publicly accessible files
├── resources/            # Frontend resources
│   ├── js/               # React components and utilities
│   │   ├── Components/   # Reusable UI components
│   │   ├── Layouts/      # Page layouts
│   │   └── Pages/        # Inertia page components
│   └── css/              # CSS files
├── routes/               # Application routes
└── storage/              # Application storage
```

## 🔧 Configuration

### Environment Variables

Key environment variables you may want to configure:

- `APP_NAME`: Application name
- `APP_ENV`: Application environment (local, production)
- `APP_URL`: Application URL
- `DB_*`: Database configuration
- `MAIL_*`: Mail configuration for sending emails
- `PAYPAL_*`: PayPal API credentials


### Customization

- **Theme**: Modify the Tailwind configuration in `tailwind.config.js`
- **Components**: Customize UI components in the `resources/js/Components` directory
- **Routes**: Adjust application routes in the `routes` directory


## 🧪 Testing

Run the test suite with:

```shellscript
php artisan test
```

For JavaScript tests:

```shellscript
npm test
```

## 🔄 Deployment

### Production Build

Before deploying to production, compile and minify the assets:

```shellscript
npm run build
```

### Server Requirements

- PHP 8.1+
- Composer
- Node.js and npm (for building assets)
- MySQL or compatible database
- Web server (Apache, Nginx)


## 📝 License

This project is licensed under the MIT License 

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature`)
5. Open a Pull Request


## 📞 Support

If you encounter any problems or have questions, please open an issue in the GitHub repository or me.

---

Made with ❤️ by Lizeweski