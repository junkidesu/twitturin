import path from "path";
import express from "express";
import cors from "cors";
import env from "./utils/config";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import tweetsRouter from "./routes/tweets";
import repliesRouter from "./routes/replies";
import { errorHandler, userExtractor } from "./utils/middleware";
import specs from "./swagger/specs";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use(userExtractor);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/tweets", tweetsRouter);
app.use("/api/replies", repliesRouter);

if (env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.use("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });
}

if (env.NODE_ENV === "development")
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

export default app;
