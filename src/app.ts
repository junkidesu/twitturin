import express from "express";
import mongoose from "mongoose";
import env from "./utils/config";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import tweetsRouter from "./routes/tweets";
import { errorHandler } from "./utils/middleware";

console.log("connecting to MongoDB");
mongoose
  .connect(env.MONGODB_URI)
  .then(() => console.log(`connected to MongoDB`))
  .catch((error) =>
    console.log("error connecting to MongoDB:", error.message as string)
  );

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/tweets", tweetsRouter);

app.use(errorHandler);

export default app;
