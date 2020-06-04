FROM node:14-alpine

WORKDIR /app-client
ARG SSH_KEY

RUN apk add git openssh-client
COPY ./client/package.json /app-client

RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN npm install

