FROM nginx:latest AS app

COPY ./build /usr/share/nginx/html