#!/bin/bash
LC_CTYPE=en_US.utf8

cd client
npm run start > $PWD/logs/frontend.log & cd ..
cd server 
deno run --allow-net --allow-read --allow-write --config=tsconfig.json index.ts >$PWD/logs/backend.log
