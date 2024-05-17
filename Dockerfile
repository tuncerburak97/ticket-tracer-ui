# Aşama 1: Build aşaması
FROM node:16 AS build

# Çalışma dizinini oluştur ve set et
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# React uygulamasını build et
RUN npm run build

# Aşama 2: Prodüksiyon aşaması
FROM nginx:alpine

# Build edilmiş dosyaları Nginx'in HTML dizinine kopyala
COPY --from=build /app/build /usr/share/nginx/html

# Nginx konfigürasyonunu kopyala
COPY nginx.conf /etc/nginx/nginx.conf

# Nginx portunu expose et
EXPOSE 80

# Nginx'i çalıştır
CMD ["nginx", "-g", "daemon off;"]
