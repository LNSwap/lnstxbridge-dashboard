FROM debian:buster-slim

RUN apt-get update
RUN apt-get -y install curl gnupg git
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs

WORKDIR /usr/src/app

COPY . ./
RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]