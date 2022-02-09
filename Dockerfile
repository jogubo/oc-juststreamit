FROM nginx:latest AS juststreamit-front

WORKDIR /usr/share/nginx/html

ADD . ./

EXPOSE 80
