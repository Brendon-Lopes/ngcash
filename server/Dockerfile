FROM node:18-alpine

WORKDIR /server

RUN mkdir -p node_modules && chmod -R 777 node_modules

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm install -g prisma

RUN prisma generate

EXPOSE 3001

CMD [ "npm", "run", "dev" ]
