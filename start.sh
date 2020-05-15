#!/bin/bash
LC_CTYPE=en_US.utf8

cd client
nohup npm run start > $PWD/logs/frontend.log & cd ..
cd server 
nohup deno run --allow-net --allow-read --allow-write --config=tsconfig.json index.ts > $PWD/logs/backend.log
