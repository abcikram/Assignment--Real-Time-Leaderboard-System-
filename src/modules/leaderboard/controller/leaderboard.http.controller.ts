import { Request, Response } from "express";
import { LeaderboardService } from "../service/leaderboard.service";
import { LeaderboardRedisRepository } from "../repository/leaderboard.redis.repository";
import { BadRequestError, NotFoundError } from "../../../lib/errors";

const service = new LeaderboardService(new LeaderboardRedisRepository());

export async function getTopPlayers(
  req: Request,
  res: Response,
  next: Function
) {
  try {
    const { region, gameMode } = req.query;
    const limit = Number(req.query.limit ?? 10);

    if (!region || !gameMode) {
      throw new BadRequestError("region and gameMode are required");
    }

    if (isNaN(limit) || limit <= 0) {
      throw new BadRequestError("limit must be a positive number");
    }

    const data = await service.getTopPlayers(
      region.toString(),
      gameMode.toString(),
      limit
    );

    res
      .status(200)
      .json({ message: "Top players retrieved successfully", data });
  } catch (error) {
    next(error);
  }
}

export async function getPlayerRank(
  req: Request,
  res: Response,
  next: Function
) {
  try {
    const { playerId } = req.params;
    const { region, gameMode } = req.query;

    if (!playerId || !region || !gameMode) {
      throw new BadRequestError("playerId, region and gameMode are required");
    }

    const rank = await service.getPlayerRank(
      playerId,
      region.toString(),
      gameMode.toString()
    );

    if (rank === null) {
      throw new NotFoundError("Player not found in the leaderboard");
    }

    res
      .status(200)
      .json({ message: "Player rank retrieved successfully", rank });
  } catch (error) {
    next(error);
  }
}
