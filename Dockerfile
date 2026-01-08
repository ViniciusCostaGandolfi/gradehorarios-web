# Estágio 1: Build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY patch-ngx-datatable.js ./
RUN npm install

# Copia o código e EXECUTA O BUILD
COPY . .
RUN npm run build -- --configuration=production

# Estágio 2: Produção (Nginx)
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# IMPORTANTE: Verifique o nome da pasta em 'dist/'
COPY --from=build /app/dist/gradehorarios-web/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]