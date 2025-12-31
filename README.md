# Real-Time Leaderboard System (Backend)

A backend service that tracks player scores in real time and maintains leaderboards using **Node.js, Socket.IO, and Redis**.  
The system supports live score updates, real-time rank notifications, top-N leaderboards, filtering by region/game mode, and automatic daily resets.

---

##  Features

- Real-time score updates using WebSockets (Socket.IO)
- Leaderboard ranking using Redis Sorted Sets
- Fetch top-N players
- Fetch individual player rank
- Filter leaderboards by region and game mode
- Daily leaderboard reset using TTL
- Clean layered architecture (Controller → Service → Repository)
- TypeScript + SOLID principles

---

##  Architecture

Client / Game  
Socket.IO  
Node.js Backend  
Redis (Sorted Set)

- Writes: WebSockets (score:update)
- Reads: HTTP APIs + WebSocket pushes
- Ranking: Redis ZSET
- Reset: Redis TTL (24 hours)

---

## Folder Structure
```
src/
├── server.ts
├── app.ts
│
├── config/
│ ├── env.config.ts
│ ├── redis.config.ts
│ └── socket.config.ts
│
├── modules/
│ └── leaderboard/
│ ├── controller/
│ │ └── leaderboard.http.controller.ts
│ ├── service/
│ │ └── leaderboard.service.ts
│ ├── repository/
│ │ └── leaderboard.redis.repository.ts
│ ├── leaderboard.socket.ts
│ └── leaderboard.constants.ts
│
├── routes/
│ └── leaderboard.routes.ts
│
└── utils/
└── logger.ts
```

## Test 
- socket.test.js: Basic Socket.IO client test to simulate score updates and listen for rank updates.


```
GET /leaderboard/rank/:playerId?region=asia&gameMode=solo
```

## How to Run Locally
```
git clone <your-repo-url>
cd <project-folder>
```

```bash
yarn install
yarn dev
```
```bash
docker compose up -d
```
