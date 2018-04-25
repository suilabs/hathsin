FROM node:carbon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY src /usr/src/app/src
COPY package-lock.json /usr/src/app
COPY .babelrc /usr/src/app
COPY config.json /usr/src/app

ENV NODE_ENV=production

RUN npm install
RUN npm run build:server

ENV VIRTUAL_HOST=hathsin.suilabs.com
ENV LETSENCRYPT_HOST=hathsin.suilabs.com
ENV LETSENCRYPT_EMAIL=borja.arias.upc@gmail.com

EXPOSE 4000

CMD [ "npm", "start" ]
