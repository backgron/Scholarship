FROM backgron/scholarship

RUN mkdir /source

WORKDIR /source

COPY . /source

RUN npm i

RUN npm run build

RUN chmod -R 777 /source/dist/main.js

EXPOSE 3000

CMD ["node","/source/dist/main.js"]
