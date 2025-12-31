import { Router } from "express";
import leaderboardRoutes from "./leaderboard.route";

export const apiRouter = Router();

apiRouter.use("/leaderboard", leaderboardRoutes);

