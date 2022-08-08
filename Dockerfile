FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only development
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]