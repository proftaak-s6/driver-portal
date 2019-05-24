# Stage 1: Build
FROM node:10.15.3-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:production

# Stage 2: Serve
FROM nginx:1.15.9-alpine

COPY --from=0 /usr/src/app/dist/overheidsportaal /usr/share/nginx/html