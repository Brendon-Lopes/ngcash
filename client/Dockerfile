FROM node:18-alpine

WORKDIR /client

RUN mkdir -p node_modules && chmod -R 777 node_modules

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]
