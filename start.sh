#!/bin/bash
LC_CTYPE=en_US.utf8

cd client
npm run start > ../logs/frontend.log & cd ..
cd server 
deno install --unstable --allow-read --allow-run -f https://deno.land/x/denon/denon.ts
denon index.ts >../logs/backend.log
