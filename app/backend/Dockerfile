# FROM node:16-alpine
# WORKDIR /app-backend
#  ...
FROM node:16-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]