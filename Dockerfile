FROM node:16-alpine as builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine as release

COPY --from=builder /usr/src/app/ .

EXPOSE 3000

CMD [ "yarn", "start" ]