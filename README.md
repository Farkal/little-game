# Little Game

*Warning: This is an experimental domain driven application with TypeScript (I think Rust would be better for the API part) some components isolation could be better*
- Domain Driven Architecture
- TypeScript

## Backend
- NestJs
- Mercurius (Graphql)
- TypeOrm (Postgresql)
- Auth (JWT)

## Frontend
- Vite
- Vue 3
- Tailwind CSS
- urql (Graphql)

## Quick Start
```bash
# open a terminal
docker-compose up -d # Launch database with pg-admin
cd api
npm install
npm run start:prod
# open another terminal
cd spa
npm install
npm run start
```
[Open http://localhost:3000](http://localhost:3000)
