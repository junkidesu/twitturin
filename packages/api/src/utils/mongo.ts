import mongoose from "mongoose";
import env from "./config";
import logger from "./logger";

export const connectDb = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.log("connected to MongoDB");
  } catch (error) {
    logger.error(error);
  }
};

export const disconnectDb = async () => {
  await mongoose.connection.close();
};
