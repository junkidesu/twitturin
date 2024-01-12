import app from "./app";
import env from "./utils/config";
import { connectDb } from "./utils/mongo";
import logger from "./utils/logger";

const PORT = env.PORT || 3001;

const start = async () => {
  await connectDb();

  app.listen(PORT, () => {
    logger.log(`Server running on port ${PORT}`);
  });
};

void start();
