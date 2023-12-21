// import path from "path";
import express, { Request } from "express";
import bodyParser from "body-parser";
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
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.disable("x-powered-by");

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

if (env.NODE_ENV === "development")
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

export default app;
