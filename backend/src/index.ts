import app from "./app";
import env from "./utils/config";
import mongoose from "mongoose";

const PORT = env.PORT || 3001;

const connectDb = async () => {
  try {
    console.log("connecting to MongoDB");

    await mongoose.connect(env.MONGODB_URI);

    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error connecting to MongoDB", error);
  }
};

const start = async () => {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();
