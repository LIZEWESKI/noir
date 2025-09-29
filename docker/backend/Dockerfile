# Base PHP image
FROM php:8.2-fpm AS base

RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath xml zip ext-gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Node.js 
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

COPY . .

RUN composer install --optimize-autoloader

RUN npm install

# Production build
FROM base AS production
RUN npm run build
CMD ["php-fpm"]

# Development
FROM base AS development
EXPOSE 8000 5173

CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=8000 & npm run dev"]
