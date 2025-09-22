# Official PHP image with required extensions
FROM php:8.2-fpm

# System dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath xml zip

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node.js & npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Working directory
WORKDIR /var/www/html

# Project files
COPY . .

# PHP dependencies // This stage failed and its related to stage 3 
RUN composer install --optimize-autoloader


# Node dependencies & build assets
RUN npm install
RUN npm run build

# Port for Laravel app
EXPOSE 8000

# Start Laravel server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
