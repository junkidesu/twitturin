import path from "path";
import express, { Request } from "express";
import cors from "cors";
import env from "./utils/config";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import tweetsRouter from "./routes/tweets";
import repliesRouter from "./routes/replies";
import searchRouter from "./routes/search";
import { errorHandler, userExtractor } from "./utils/middleware";
import specs from "./swagger/specs";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());

morgan.token("body", (req: Request) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (req.baseUrl === "/api/auth" || req.baseUrl === "/api/users") {
      return JSON.stringify({ ...req.body, password: undefined });
    }

    return JSON.stringify(req.body);
  }

  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use(userExtractor);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/tweets", tweetsRouter);
app.use("/api/replies", repliesRouter);
app.use("/api/search", searchRouter);

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
