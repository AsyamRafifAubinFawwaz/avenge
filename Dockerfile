FROM php:8.3-cli
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    unzip git curl \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) zip gd pdo pdo_mysql \
    && pecl install redis && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY --from=oven/bun:latest /usr/local/bin/bun /usr/local/bin/bun

COPY composer.json composer.lock* package.json bun.lockb* ./

RUN COMPOSER_MEMORY_LIMIT=-1 composer install --optimize-autoloader --no-dev --prefer-dist --no-scripts \
    && rm -rf ~/.composer/cache

COPY . .

RUN bun install && bun run build

RUN rm -rf node_modules ~/.bun

RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache
RUN php artisan storage:link || true

RUN echo "upload_max_filesize = 20M\npost_max_size = 20M" > /usr/local/etc/php/conf.d/uploads.ini

VOLUME ["/app/storage", "/app/bootstrap/cache"]
EXPOSE 8000

CMD sh -c "php artisan optimize:clear \
    && php artisan optimize \
    && php artisan serve --host=0.0.0.0 --port=8000"