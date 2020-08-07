FROM node:latest AS builder

ARG git_sha=none
ENV REACT_APP_GIT_SHA=$git_sha

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build

FROM nginx:latest AS app

COPY --from=builder /app/build/ /usr/share/nginx/html