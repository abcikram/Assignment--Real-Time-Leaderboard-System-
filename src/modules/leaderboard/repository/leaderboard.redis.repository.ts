import { redisClient } from "../../../config/redis.config";

export class LeaderboardRedisRepository {
  async incrementScore(key: string, playerId: string, score: number) {
    await redisClient.zIncrBy(key, score, playerId);
  }

  async getRank(key: string, playerId: string) {
    return redisClient.zRevRank(key, playerId);
  }

  async getTopPlayers(key: string, limit: number) {
    return redisClient.zRange(key, 0, limit - 1, {
      REV: true,
    });
  }

  async setTTL(key: string, ttl: number) {
    await redisClient.expire(key, ttl);
  }
}
