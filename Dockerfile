FROM node:21.7.1-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 80

CMD ["sh", "-c", "npm run dev"]