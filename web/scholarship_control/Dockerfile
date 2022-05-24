FROM nginx

ENV MYPATH /etc/nginx
WORKDIR $MYPATH

COPY nginx.conf $MYPATH/nginx.conf

COPY build/ /usr/share/nginx/html

RUN chmod -R 777 $MYPATH

EXPOSE 80

