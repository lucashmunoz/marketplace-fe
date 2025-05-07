# Etapa 1: Build
FROM node:21.7.1-slim as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: Contenedor liviano con solo lo necesario
FROM node:21.7.1-slim

# Instalar `serve` globalmente para servir contenido estático
RUN npm install -g serve

WORKDIR /app

# Copiar sólo el build
COPY --from=builder /app/dist /app/dist

EXPOSE 5173

# Usar `serve` para servir los archivos estáticos
CMD ["serve", "-s", "dist", "-l", "5173"]
