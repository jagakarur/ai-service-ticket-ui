FROM node:14
# Create app directory

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /usr/src/app/client

RUN npm install

RUN npm run build

WORKDIR /usr/src/app

EXPOSE 8080

CMD [ "npm", "run", "pm2" ]

