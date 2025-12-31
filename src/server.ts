import dotenv from "dotenv";
import { server } from "./app";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
