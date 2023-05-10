FROM node:14-alpine

RUN apk add --no-cache flatc

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN cd src/flatbuffer && flatc --ts -o ./ message.fbs

EXPOSE 41234/udp

CMD ["npm", "start"]