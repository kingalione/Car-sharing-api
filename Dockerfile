FROM node:9-slim
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . ./app
CMD ["npm", "run", "serve"]
