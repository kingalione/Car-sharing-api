FROM node:9-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./app
CMD ["npm", "run", "serve"]
