# Stage 1: build assets & dependencies
FROM php:8.2-fpm AS builder

# System deps
RUN apt-get update && apt-get install -y \
    git curl zip unzip \
    libonig-dev libxml2-dev libzip-dev nodejs npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath xml zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install PHP dependencies (optimized, no dev packages)
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Install Node deps & build assets
RUN npm install && npm run build

# Stage 2: production runtime
FROM php:8.2-fpm

# System deps
RUN apt-get update && apt-get install -y \
    libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath xml zip

WORKDIR /var/www/html

# Copy files from builder
COPY --from=builder /var/www/html /var/www/html

# Storage link (ensure images work)
RUN php artisan storage:link || true

# Expose port
EXPOSE 8000

# Production start (no vite, just laravel)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
