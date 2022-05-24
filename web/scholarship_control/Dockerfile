FROM nginx

ENV MYPATH /etc/nginx
WORKDIR $MYPATH

COPY nginx.conf $MYPATH/nginx.conf

COPY build/ /usr/share/nginx/html

RUN chmod -R 777 $MYPATH

ADD run.sh /run.sh

CMD ["/run.sh"]

EXPOSE 80

CMD /bin/bash