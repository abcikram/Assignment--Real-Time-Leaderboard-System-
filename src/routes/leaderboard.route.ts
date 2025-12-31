import { Router } from "express";
import {
  getTopPlayers,
  getPlayerRank,
} from "../modules/leaderboard/controller/leaderboard.http.controller";

const router = Router();

router.get("/top", getTopPlayers);
router.get("/rank/:playerId", getPlayerRank);

export default router;
