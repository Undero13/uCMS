#!/bin/bash

RED='\033[0;34m'

echo "${RED}install frontend dependency"
cd ./client
npm ci
cd ..

echo "${RED}install image"
docker-compose build

echo "${RED}start project"
docker-compose up -d

echo "${RED}install vue cli"
docker exec -t node sh -c "npm install -g @vue/cli"

echo "${RED}data migration"
docker exec -t deno bash -c "denon migration"

echo "${RED}finished install"
docker-compose down