# Nookweb LP — multi-stage: build Vite + serve with Nginx
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Vite embute env no build: sem isto, o seletor de idioma some em produção (Navbar).
# Sobrescreva no build: docker build --build-arg VITE_ENABLE_LANGUAGE_SELECTOR=false .
ARG VITE_ENABLE_LANGUAGE_SELECTOR=true
ENV VITE_ENABLE_LANGUAGE_SELECTOR=$VITE_ENABLE_LANGUAGE_SELECTOR

COPY package.json package-lock.json* ./
RUN npm ci || npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
