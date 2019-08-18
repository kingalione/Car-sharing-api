FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN yarn install
RUN yarn global add typescript
COPY . ./
RUN tsc server.ts
CMD ["node", "server.js"]
