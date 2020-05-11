#!/bin/bash

cd client
nohup npm run start >../logs/frontend.out & cd ..
cd server 
/home/${USER}/.deno/bin/deno install --unstable --allow-read --allow-run -f https://deno.land/x/denon/denon.ts
nohup denon index.ts >../logs/backend.out
