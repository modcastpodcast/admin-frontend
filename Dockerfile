FROM node:latest AS builder

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build

FROM nginx:latest AS app

COPY --from=builder /app/build/ /usr/share/nginx/html