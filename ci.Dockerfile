FROM node:20.17.0-alpine

RUN apk add --no-cache bash
RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml /tmp/app/
RUN cd /tmp/app && pnpm install

COPY . /usr/src/app
RUN cp -a /tmp/app/node_modules /usr/src/app

WORKDIR /usr/src/app
RUN cp .env.test .env

CMD ["pnpm", "ci:test"]
