FROM node:16-alpine

RUN apk update

RUN apk add vim

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

RUN pnpm i

COPY . .

RUN pnpm build

CMD ["node","dist/main.js"]
