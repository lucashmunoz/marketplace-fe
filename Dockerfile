FROM node:21.7.1-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "npm run dev"]