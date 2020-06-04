## Start
- docker-compose up --build -d
- docker exec -it deno bash
- deno run --allow-all --unstable generateData.ts

## Stop
  - docker-compose down

## Staff

* Docker
* Webpack 
* MongoDB
* Typescript 
* Vue 3 
* Vue-router
* Vuex
* Jest
* Deno
* Alosaur
* djwt

## Todos
 - Product
 - Blog

## Test
### Backend

- docker exec -it deno bash
- deno test --allow-run --allow-read --allow-write --allow-net --unstable --allow-plugin

### Frontend
- docker exec -it node bash
- npm run test

## License
MIT