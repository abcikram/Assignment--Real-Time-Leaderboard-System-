import { createApp } from "./app";
import http from "node:http";
import { env } from "./config/env.config";
import { initSocket } from "./config/socket.config";
import { logger } from "./lib/logger";

async function boostrap() {
  try {
    const app = createApp();
    const server = http.createServer(app);

    const port = Number(env.PORT) || 5000;

    initSocket(server);

    server.listen(port, () => {
      logger.info(`Server is running on port: http://localhost:${port}`);
    });
  } catch (err) {
    logger.error("Failed to start the server", `${(err as Error).message}`);
    process.exit(1);
  }
}

boostrap();
