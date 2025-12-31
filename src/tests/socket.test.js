import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server");

  socket.emit("score:update", {
    playerId: "player1",
    score: 900,
    region: "asia",
    gameMode: "solo",
  });
});

socket.on("rank:update", (data) => {
  console.log("Rank update received:", data);
});
