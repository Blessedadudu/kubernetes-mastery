FROM --platform=linux/amd64 node:22-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "app.js"]