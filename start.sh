#!/bin/bash

cd client
nohup npm run start >../logs/frontend.out & cd ..
cd server 
nohup /home/${USER}/.deno/bin/deno run -c ./tsconfig.json --allow-net index.ts >../logs/backend.out
