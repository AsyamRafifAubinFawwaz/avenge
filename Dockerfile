# ==============================================================================
# STAGE 1: Kompilasi Aset Frontend (Bun)
# ==============================================================================
FROM oven/bun:1.1-slim AS frontend-builder
WORKDIR /build

COPY package.json bun.lockb* ./
RUN bun install

COPY . .
RUN bun run build

# ==============================================================================
# STAGE 2: Runtime Aplikasi (PHP CLI)
# ==============================================================================
FROM php:8.3-cli AS runner
WORKDIR /app

# 1. Install dependensi OS (Disederhanakan agar stabil di Debian Bookworm)
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

# 2. Ambil Composer resmi
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Copy file composer untuk caching layer
COPY composer.json composer.lock* ./

# 4. Install dependensi PHP (Bypass memory limit mencegah OOM)
RUN COMPOSER_MEMORY_LIMIT=-1 composer install --optimize-autoloader --no-dev --prefer-dist --no-scripts \
    && rm -rf ~/.composer/cache

# 5. Copy seluruh kode aplikasi Laravel ke dalam container
COPY --chown=www-data:www-data . /app

# 6. Copy hasil kompilasi aset (Vite) dari STAGE 1
COPY --from=frontend-builder --chown=www-data:www-data /build/public/build ./public/build

# 7. Set permission untuk folder storage dan cache
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# BIKIN SYMLINK PAS BUILD (Aman, tidak butuh koneksi DB)
RUN php artisan storage:link

# Tambahkan limit upload PHP CLI
RUN echo "upload_max_filesize = 20M\npost_max_size = 20M" > /usr/local/etc/php/conf.d/uploads.ini

# Definisikan volume untuk penyimpanan yang persisten agar file tidak hilang
VOLUME ["/app/storage", "/app/bootstrap/cache"]

# Buka port 8000
EXPOSE 8000

# 8. Jalankan optimasi Laravel dan jalankan aplikasi saat container start
CMD sh -c "php artisan optimize:clear \
    && php artisan optimize \
    && php artisan serve --host=0.0.0.0 --port=8000"