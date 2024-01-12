import mongoose from "mongoose";
import env from "./config";

export const connectDb = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

export const disconnectDb = async () => {
  await mongoose.connection.close();
};
