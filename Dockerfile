FROM php:8.3-cli
WORKDIR /app

# 1. Install dependensi OS untuk PHP
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

# 2. Suntikkan Composer dan Bun dari image resminya masing-masing
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY --from=oven/bun:latest /usr/local/bin/bun /usr/local/bin/bun

# 3. Copy file konfigurasi dependensi terlebih dahulu (Untuk caching Docker)
COPY composer.json composer.lock* package.json bun.lockb* ./

# 4. Install dependensi PHP (WAJIB dilakukan sebelum JS agar folder vendor/ dan artisan tersedia)
RUN COMPOSER_MEMORY_LIMIT=-1 composer install --optimize-autoloader --no-dev --prefer-dist --no-scripts \
    && rm -rf ~/.composer/cache

# 5. Copy seluruh sisa kode aplikasi
COPY . .

# 6. Install dependensi Frontend & Lakukan Build JS
# (Karena PHP dan vendor/ sudah tersedia di tahap ini, plugin Wayfinder akan berhasil dieksekusi)
RUN bun install && bun run build

# 7. Bersihkan folder node_modules agar ukuran image final tidak membengkak
RUN rm -rf node_modules ~/.bun

# 8. Set permission folder krusial
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# 9. Bikin Symlink (Aman karena database tidak diakses di sini)
RUN php artisan storage:link || true

# 10. Tambahkan limit upload PHP CLI
RUN echo "upload_max_filesize = 20M\npost_max_size = 20M" > /usr/local/etc/php/conf.d/uploads.ini

VOLUME ["/app/storage", "/app/bootstrap/cache"]
EXPOSE 8000

# 11. Jalankan aplikasi
CMD sh -c "php artisan optimize:clear \
    && php artisan optimize \
    && php artisan serve --host=0.0.0.0 --port=8000"