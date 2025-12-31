import { LeaderboardRedisRepository } from "../repository/leaderboard.redis.repository";
import { LEADERBOARD_TTL } from "../leaderboard.constants";

export class LeaderboardService {
  constructor(private repo: LeaderboardRedisRepository) {}

  private buildKey(region: string, gameMode: string) {
    const date = new Date().toISOString().split("T")[0];
    return `leaderboard:${gameMode}:${region}:${date}`;
  }

  async updateScore(
    playerId: string,
    score: number,
    region: string,
    gameMode: string
  ) {
    const key = this.buildKey(region, gameMode);

    await this.repo.incrementScore(key, playerId, score);
    await this.repo.setTTL(key, LEADERBOARD_TTL);

    const redisRank = await this.repo.getRank(key, playerId);
    return redisRank !== null ? redisRank + 1 : null;
  }

  async getTopPlayers(region: string, gameMode: string, limit: number) {
    const key = this.buildKey(region, gameMode);
    return this.repo.getTopPlayers(key, limit);
  }

  async getPlayerRank(playerId: string, region: string, gameMode: string) {
    const key = this.buildKey(region, gameMode);
    const rank = await this.repo.getRank(key, playerId);

    return rank !== null ? rank + 1 : null;
  }
}
