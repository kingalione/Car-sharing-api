FROM node:9-slim
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN yarn install
RUN yarn global add ts-node
RUN yarn global add typescript
COPY . ./
CMD ["ts-node", "server.ts"]
