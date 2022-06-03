FROM backgron/scholarship

CMD ["bash"]

RUN mkdir /source

WORKDIR /source

COPY . /source

RUN npm i

RUN npm run build

COPY nginx.conf /etc/nginx/nginx.conf


RUN chmod -R 777 /source

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

