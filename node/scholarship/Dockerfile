FROM node

RUN mkdir /source

WORKDIR /source

COPY dist /source/dist
COPY node_modules /source/node_modules

RUN chmod -R 777 /source/dist/main.js

EXPOSE 3000

CMD ["node","/source/dist/main.js"]
