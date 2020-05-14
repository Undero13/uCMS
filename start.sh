#!/bin/bash
LC_CTYPE=en_US.utf8

cd client
npm run start > $PWD/logs/frontend.log & cd ..
cd server 
deno install --unstable --allow-read --allow-run -f https://deno.land/x/denon/denon.ts
deno run --allow-net --allow-read --allow-write --config=tsconfig.json index.ts >$PWD/logs/backend.log
