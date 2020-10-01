@echo off

echo install frontend dependency
cd ./client
call npm ci
cd ..

echo install image
call docker-compose build

echo start project
call docker-compose up -d

echo install vue cli
call docker exec -t node sh -c "npm install -g @vue/cli"

echo data migration
call docker exec -t deno bash -c "denon migration"

echo finished install
call docker-compose down