FROM node:current-bullseye-slim

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY src /app/src

RUN yarn install
RUN yarn build

EXPOSE 80

CMD yarn start:dev
