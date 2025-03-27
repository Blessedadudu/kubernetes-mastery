# FROM --platform=linux/amd64 node:22-alpine
FROM node:18-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 8080
CMD ["node", "server.js"]