import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import logger from "./utils/logger";

const app = express();

app.use(helmet()); 
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  logger.info("Health check endpoint called");
  res.status(200).json({ status: "OK" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

export { app, server, io };
export default app;
