import app from "./app";
import env from "./utils/config";
import { connectDb } from "./utils/mongo";

const PORT = env.PORT || 3001;

const start = async () => {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();
