# car-sharing-api

## Start api with docker container

```
docker run -it -p 3000:3000 car-sharing-api
```

Test with:
localhost:3000/cars

## Build docker container from project

```
docker build -t car-sharing-api .
```

# Manual way

## Project setup

```
yarn global add ts-node
yarn global add typescript
yarn install
```

### Compiles and starts server

```
ts-node server.ts
```

Copyright 2019: Ali Karadag
