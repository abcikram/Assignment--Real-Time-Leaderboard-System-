import { Server } from "socket.io";
import { registerLeaderboardSocket } from "../modules/leaderboard/controller/leaderboard.socket.controller";

export function initSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  registerLeaderboardSocket(io);
}
