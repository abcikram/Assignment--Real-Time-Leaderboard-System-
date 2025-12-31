import { Server } from "socket.io";
import { LeaderboardService } from "../service/leaderboard.service";
import { LeaderboardRedisRepository } from "../repository/leaderboard.redis.repository";
import { ScoreUpdateDTO } from "../dto/leaderboard.dto";
import { logger } from "../../../lib/logger";

export function registerLeaderboardSocket(io: Server) {
  const service = new LeaderboardService(new LeaderboardRedisRepository());

  io.on("connection", (socket) => {
    socket.on("score:update", async (data: ScoreUpdateDTO) => {
      logger.info("Received score update:", data);
      const rank = await service.updateScore(
        data.playerId,
        data.score,
        data.region,
        data.gameMode
      );

      socket.emit("rank:update", { rank });

      const topPlayers = await service.getTopPlayers(
        data.region,
        data.gameMode,
        10
      );

      io.emit("leaderboard:update", topPlayers);
    });
  });
}
