Hi DaCodes and DD3. 👨🏻‍💻

While I was reading the task I was thinking about the multiple ways I can solve it and I couldn't stop asking myself what would be the best solution.
So I decide to give my 110% and solve this problem in the different ways I though. All the code in this repository is created by myself.

I hope you get satisfied with my solution(s).


# DOCS
> All the solutions use the same database, so don't matter what solution would you like to check, the database set up is a must.

## Table of Content

- [Requirements](#requirements)
- [Database Initialization](#database-initialization)
- [Solutions](#solutions)
  - [Api Rest](#api-rest)
  - [GRPC](#grpc)
  - [TRPC](#trpc)
  - [WebSocket](#websocket)
  - [Socket.io](#socketio)

## Requirements
- Docker
- Node.JS >= 14.x
- yarn >= 1.22.19

## Database Initialization
As I mention before, all the solutions use the same database:

```
docker compose up
```

This will deploy the database on port **:5342**

## Solutions
### Api Rest
For this solution I use express as node.js framework. In order to run this server in development environment follow this steps:

1.
```
cd api-rest
```
2.
```
yarn install
```
3.
```
yarn dev
```

This project is ready for serve into a server, the steps you need to follow are the next ones:
1. It is necessary to create an env file, see the example in /api-rest/.env.example, if you want to use the default database you can run this command:

```
cd api-rest
```

```
echo "PORT=5000\nDB_USER=\"OpoliNinja\"\nDB_PASS=\"Secret123\"\nDB_NAME=\"wordle\"\nDB_HOST=\"localhost\"" > .env
```
2. Then you can build and serve this service
```
yarn build
```

```
yarn serve
```

### GRPC
🏗 Work in progress 🏗

### TRPC
🏗 Work in progress 🏗

### WebSocket
🏗 Work in progress 🏗

### Socket.io
🏗 Work in progress 🏗
