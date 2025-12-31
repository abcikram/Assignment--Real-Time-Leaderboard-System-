import { createClient } from "redis";
import { env } from "./env.config";

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.connect();

redisClient.on("connect", () => {
  console.log("Redis connected");
});
