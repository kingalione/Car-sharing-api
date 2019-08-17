FROM node:9-slim
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN yarn install
COPY . ./app
CMD ["ts-node", "server.ts"]
